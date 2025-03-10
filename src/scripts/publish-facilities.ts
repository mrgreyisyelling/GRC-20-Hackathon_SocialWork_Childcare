import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { TransactionService } from '../services/transaction-service.js';
import { SpaceIds } from '../config/constants.js';
import dotenv from 'dotenv';

// Import entity processing functions
import { processFacility } from '../processors/facility.js';
import { processLocation } from '../processors/location.js';
import { processOwner } from '../processors/owner.js';
import { processLicense } from '../processors/license.js';
import { processSchoolDistrict } from '../processors/school-district.js';
import { processSchedule } from '../processors/schedule.js';
import { processScheduleEntry } from '../processors/schedule-entry.js';
import { processDayOfWeek } from '../processors/day-of-week.js';
import { processTime } from '../processors/time.js';
import { processStatus } from '../processors/status.js';

// Load environment variables
dotenv.config();

// Define FacilityData Interface
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
  const results = await db.all(`SELECT * FROM childcare_facilities`);
  await db.close();  // Close connection after reading
  return results;
}

/**
 * Processes a specific entity type from a facility row.
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
 */
function generateOpsList(facilities: FacilityData[], selectedTypes: string[]): EntityOp[] {
  return facilities.flatMap(data =>
    selectedTypes.flatMap(entityType => processEntitiesByType(data, entityType))
  );
}

/**
 * Publishes all collected operations in batches.
 */
async function publishOpsInBatches(spaceId: string, allOps: EntityOp[], batchSize: number = 10): Promise<void> {
  console.log(`Total operations to publish: ${allOps.length}`);

  if (allOps.length === 0) {
    console.log("No operations to publish. Exiting.");
    return;
  }

  // Use TransactionService to split into batches
  const batches = TransactionService.splitIntoBatches(allOps, batchSize);

  console.log(`Divided into ${batches.length} batches.`);

  // Submit operations using TransactionService
  await TransactionService.submitOperationBatches(spaceId, batches);

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
    await publishOpsInBatches(SpaceIds.FACILITIES, allOps, batchSize);

    console.log("Processing and publishing complete.");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}