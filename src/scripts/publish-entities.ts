import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { TransactionService } from 'services/transaction-service.js';
import { EntityOp } from 'core/graph.js';
import { SpaceIds } from 'config/constants.js';
import dotenv from 'dotenv';

// Import entity processing functions
import { processFacility } from 'processors/facility.js';
import { processLocation } from 'processors/location.js';
import { processOwner } from 'processors/owner.js';
import { processLicense } from 'processors/license.js';
import { processSchoolDistrict } from 'processors/school-district.js';
import { processSchedule } from 'processors/schedule.js';
import { processScheduleEntry } from 'processors/schedule-entry.js';
import { processDayOfWeek } from 'processors/day-of-week.js';
import { processTime } from 'processors/time.js';
import { processStatus } from 'processors/status.js';




// Load environment variables
dotenv.config();


interface FacilityData {
  facility_name: string;
  facility_status: string;
  facility_type: string;
  accepts_subsidies: string;
  city: string;
  state: string;
  zip_code: string;
  alternative_zip: string;
  address: string;
  alternative_address: string;
  license_number: string;
  license_type: string;
  date_originally_licensed: string;
  license_issue_date: string;
  license_expiry_date: string;
  school_district: string;
  alternative_contact_number: string;
}

// Open SQLite connection
async function openDatabase() {
  return open({
    filename: path.resolve(process.cwd(), 'childcare.db'),
    driver: sqlite3.Database
  });
}

// Read facilities data from SQLite
async function getFacilities(): Promise<FacilityData[]> {
  const db = await openDatabase();
  return db.all(`SELECT * FROM childcare_facilities`);
}

/**
 * Processes a specific entity type from a facility row.
 * 
 * @param data - The facility row data.
 * @param entityType - The entity type to process.
 * @returns An array of entity operations.
 */
function processEntitiesByType(data: FacilityData, entityType: string): EntityOp[] {
  switch (entityType) {
    case "Facility":
      return processFacility(data);
    case "Location":
      return processLocation(data);
    case "Owner":
      return processOwner(data);
    case "License":
      return processLicense(data);
    case "SchoolDistrict":
      return processSchoolDistrict(data);
    case "Schedule":
      return processSchedule(data);
    case "ScheduleEntry":
      return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        .flatMap(day => processScheduleEntry(data, day));
    case "DayOfWeek":
      return processDayOfWeek(data);
    case "Time":
      return processTime(data);
    case "Status":
      return processStatus(data);
    default:
      console.warn(`Unknown entity type: ${entityType}`);
      return [];
  }
}


/**
 * Generates a list of operations for selected entity types.
 * 
 * @param facilities - Array of facility data rows.
 * @param selectedTypes - Array of entity types to process.
 * @returns A single aggregated list of entity operations.
 */
function generateOpsList(facilities: FacilityData[], selectedTypes: string[]): EntityOp[] {
  const allOps = facilities.flatMap(data =>
    selectedTypes.flatMap(entityType => processEntitiesByType(data, entityType))
  );

  return deduplicateOps(allOps);
}

function deduplicateOps(ops: EntityOp[]): EntityOp[] {
  const entitySet = new Map<string, EntityOp>();
  const attributeSet = new Set<string>();
  const relationSet = new Map<string, EntityOp>();

  const deduplicatedOps: EntityOp[] = [];

  for (const op of ops) {
    if (op.type === "CREATE_ENTITY") {
      if (!entitySet.has(op.id)) {
        entitySet.set(op.id, op);
        deduplicatedOps.push(op);
      }
    } else if (op.type === "SET_PROPERTY") {
      const key = `${op.entityId}-${op.propertyId}`;
      if (!attributeSet.has(key)) {
        attributeSet.add(key);
        deduplicatedOps.push(op);
      }
    } else if (op.type === "CREATE_RELATION") {
      if (!relationSet.has(op.id)) {
        relationSet.set(op.id, op);
        deduplicatedOps.push(op);
      }
    } else {
      deduplicatedOps.push(op);
    }
  }

  return deduplicatedOps;
}



/**
 * Publishes all collected operations in batches.
 * 
 * @param spaceId - The GRC-20 space ID.
 * @param allOps - The full list of entity operations.
 * @param batchSize - Number of operations per batch.
 */
async function publishOpsInBatches(spaceId: string, allOps: EntityOp[], batchSize: number = 10): Promise<void> {
  console.log(`Total operations to publish: ${allOps.length}`);

  const batches: EntityOp[][] = [];
  for (let i = 0; i < allOps.length; i += batchSize) {
    batches.push(allOps.slice(i, i + batchSize));
  }

  console.log(`Divided into ${batches.length} batches.`);

  for (let i = 0; i < batches.length; i++) {
    console.log(`Publishing batch ${i + 1}/${batches.length}...`);
    await TransactionService.submitOperations(spaceId, batches[i]);
  }

  console.log("Publishing complete.");
}

/**
 * Main function: Generates and publishes operations based on user selection.
 */
async function main(): Promise<void> {
  try {
    const facilities = await getFacilities();
    console.log(`Retrieved ${facilities.length} facilities.`);

    // Define available entity types
    const allEntityTypes = [
      "Facility", "Location", "Owner", "License", "SchoolDistrict", 
      "Schedule", "ScheduleEntry", "DayOfWeek", "Time", "Status"
    ];

    // Get user-defined entity types to process
    const args = process.argv.slice(2);
    const selectedTypes = args.includes("--all")
      ? allEntityTypes
      : args.filter(arg => allEntityTypes.includes(arg));

    // Get batch size if specified
    const batchSizeIndex = args.indexOf("--batch-size");
    const batchSize = batchSizeIndex !== -1 && args.length > batchSizeIndex + 1
      ? parseInt(args[batchSizeIndex + 1], 10)
      : 10;

    if (selectedTypes.length === 0) {
      console.error("Error: No valid entity types specified.");
      process.exit(1);
    }

    console.log(`Processing entities: ${selectedTypes.join(", ")}`);
    
    // Step 1: Generate operations list
    const allOps = generateOpsList(facilities, selectedTypes);

    if (allOps.length === 0) {
      console.log("No operations generated. Exiting.");
      return;
    }

    // Step 2: Publish operations in batches
    await publishOpsInBatches(SpaceIds.FACILITY, allOps, batchSize);

    console.log("Processing and publishing complete.");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}