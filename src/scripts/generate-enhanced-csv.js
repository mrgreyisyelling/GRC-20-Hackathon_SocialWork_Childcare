/**
 * Generate Enhanced CSV Script
 * 
 * This script reads the original CSV files (Facility.csv, License.csv, Date.csv, and Location.csv),
 * matches them with entity IDs, and adds links to the GRC-20 browser.
 * 
 * Usage:
 *   node src/scripts/generate-enhanced-csv.js [--output <path>]
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { parse as parseCsv } from 'csv-parse/sync';
import { stringify as stringifyCsv } from 'csv-stringify/sync';

// Load environment variables
dotenv.config();

// Define the testnet browser URL
const TESTNET_BROWSER_URL = 'https://geogenesis-git-feat-testnet-geo-browser.vercel.app/space';

/**
 * Read JSON file and return object
 * 
 * @param {string} filePath The path to the JSON file
 * @returns {object} The parsed JSON object
 */
function readJson(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
}

/**
 * Read CSV file and return array of objects
 * 
 * @param {string} filePath The path to the CSV file
 * @returns {Array} The parsed CSV data
 */
function readCsv(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return parseCsv(fileContent, {
    columns: true,
    skip_empty_lines: true
  });
}
/**
 * Generate enhanced CSV for facilities
 * 
 * @param {Array} facilityData The original facility CSV data
 * @param {Array} facilityTriples The facility triples data
 * @param {string} spaceId The space ID
 * @returns {Array} The enhanced facility data
 */
function generateEnhancedFacilityData(facilityData, facilityTriples, spaceId) {
  // Create a map of facility names to entity IDs
  const facilityToEntityMap = new Map();
  
  console.log('Mapping facility names to entity IDs...');
  for (const entity of facilityTriples) {
    let facilityName = '';

    // Find the facility name in the triples
    for (const triple of entity.triples) {
      const attributeId = triple.attributeId || triple.attribute;
      const value = triple.value.value;
      
      if (attributeId === 'FacilityNameAttributeId') {
        facilityName = value;
        console.log(`Found facility name "${facilityName}" for entity ${entity.entityId}`);
        break;
      }
    }
    
    if (facilityName) {
      facilityToEntityMap.set(facilityName, entity.entityId);
      console.log(`Mapped facility name "${facilityName}" to entity ID ${entity.entityId}`);
    }
  }
  
  console.log('Facility to entity map:', Object.fromEntries(facilityToEntityMap));

  // Add entity ID and link to each facility
  console.log('Adding entity IDs and browser links to facilities...');
  return facilityData.map(facility => {
    const facilityName = facility['Facility Name'];
    console.log(`Looking up entity ID for facility name "${facilityName}"`);

    const entityId = facilityToEntityMap.get(facilityName) || '';
    const browserLink = entityId ? `${TESTNET_BROWSER_URL}/${spaceId}/${entityId}` : '';

    console.log(`Facility name "${facilityName}" -> Entity ID ${entityId}`);

    return {
      ...facility,
      'Entity ID': entityId,
      'Browser Link': browserLink
    };
  });
}

/**
 * Generate enhanced CSV for licenses
 * 
 * @param {Array} licenseData The original license CSV data
 * @param {Array} licenseTriples The license triples data
 * @param {string} spaceId The space ID
 * @returns {Array} The enhanced license data
 */
function generateEnhancedLicenseData(licenseData, licenseTriples, spaceId) {
  // Create a map of license numbers to entity IDs
  const licenseToEntityMap = new Map();
  
  console.log('Mapping license numbers to entity IDs...');
  for (const entity of licenseTriples) {
    let licenseNumber = '';

    // Find the license number in the triples
    for (const triple of entity.triples) {
      const attributeId = triple.attributeId || triple.attribute;
      const value = triple.value.value;
      
      if (attributeId === 'LicenseNumberAttributeId') {
        licenseNumber = value;
        console.log(`Found license number ${licenseNumber} for entity ${entity.entityId}`);
        break;
      }
    }
    
    if (licenseNumber) {
      licenseToEntityMap.set(licenseNumber, entity.entityId);
      console.log(`Mapped license number ${licenseNumber} to entity ID ${entity.entityId}`);
    }
  }
  
  console.log('License to entity map:', Object.fromEntries(licenseToEntityMap));

  // Add entity ID and link to each license
  console.log('Adding entity IDs and browser links to licenses...');
  return licenseData.map(license => {
    const licenseNumber = license['License Number'];
    console.log(`Looking up entity ID for license number ${licenseNumber}`);

    const entityId = licenseToEntityMap.get(licenseNumber) || '';
    const browserLink = entityId ? `${TESTNET_BROWSER_URL}/${spaceId}/${entityId}` : '';

    console.log(`License number ${licenseNumber} -> Entity ID ${entityId}`);

    return {
      ...license,
      'Entity ID': entityId,
      'Browser Link': browserLink
    };
  });
}

/**
 * Generate enhanced CSV for dates
 * 
 * @param {Array} dateData The original date CSV data
 * @param {Array} dateTriples The date triples data
 * @param {string} spaceId The space ID
 * @returns {Array} The enhanced date data
 */
function generateEnhancedDateData(dateData, dateTriples, spaceId) {
  // Create a map of date values to entity IDs
  const dateToEntityMap = new Map();
  
  console.log('Mapping dates to entity IDs...');
  for (const entity of dateTriples) {
    let dateValue = '';

    // Find the date value in the triples
    for (const triple of entity.triples) {
      const attributeId = triple.attributeId || triple.attribute;
      const value = triple.value.value;
      
      if (attributeId === 'DateValueAttributeId') {
        dateValue = value;
        console.log(`Found date value ${dateValue} for entity ${entity.entityId}`);
        break;
      }
    }
    
    if (dateValue) {
      dateToEntityMap.set(dateValue, entity.entityId);
      console.log(`Mapped date value ${dateValue} to entity ID ${entity.entityId}`);
    }
  }
  
  console.log('Date to entity map:', Object.fromEntries(dateToEntityMap));

  // Add entity ID and link to each date
  console.log('Adding entity IDs and browser links to dates...');
  return dateData.map(date => {
    const dateValue = date['Date Value'];
    console.log(`Looking up entity ID for date value ${dateValue}`);

    const entityId = dateToEntityMap.get(dateValue) || '';
    const browserLink = entityId ? `${TESTNET_BROWSER_URL}/${spaceId}/${entityId}` : '';

    console.log(`Date value ${dateValue} -> Entity ID ${entityId}`);

    return {
      ...date,
      'Entity ID': entityId,
      'Browser Link': browserLink
    };
  });
}

/**
 * Generate enhanced CSV for locations
 * 
 * @param {Array} locationData The original location CSV data
 * @param {Array} locationTriples The location triples data
 * @param {string} spaceId The space ID
 * @returns {Array} The enhanced location data
 */
function generateEnhancedLocationData(locationData, locationTriples, spaceId) {
  // Create a map of location names to entity IDs
  const locationToEntityMap = new Map();
  
  console.log('Mapping locations to entity IDs...');
  for (const entity of locationTriples) {
    let locationName = '';

    // Find the location name in the triples
    for (const triple of entity.triples) {
      const attributeId = triple.attributeId || triple.attribute;
      const value = triple.value.value;
      
      if (attributeId === 'LocationNameAttributeId') {
        locationName = value;
        console.log(`Found location name "${locationName}" for entity ${entity.entityId}`);
        break;
      }
    }
    
    if (locationName) {
      locationToEntityMap.set(locationName, entity.entityId);
      console.log(`Mapped location name "${locationName}" to entity ID ${entity.entityId}`);
    }
  }
  
  console.log('Location to entity map:', Object.fromEntries(locationToEntityMap));

  // Add entity ID and link to each location
  console.log('Adding entity IDs and browser links to locations...');
  return locationData.map(location => {
    const locationName = location['Location Name'];
    console.log(`Looking up entity ID for location name "${locationName}"`);

    const entityId = locationToEntityMap.get(locationName) || '';
    const browserLink = entityId ? `${TESTNET_BROWSER_URL}/${spaceId}/${entityId}` : '';

    console.log(`Location name "${locationName}" -> Entity ID ${entityId}`);

    return {
      ...location,
      'Entity ID': entityId,
      'Browser Link': browserLink
    };
  });
}

/**
 * Write data to CSV file
 * 
 * @param {Array} data The data to write
 * @param {string} outputPath The output file path
 */
function writeToCsv(data, outputPath) {
  const csvContent = stringifyCsv(data, { header: true });
  fs.writeFileSync(outputPath, csvContent);
  console.log(`Wrote ${data.length} rows to ${outputPath}`);
}

/**
 * Main function
 */
async function main() {
  try {
    // Parse command line arguments
    const args = process.argv.slice(2);
    let outputDir = path.resolve(process.cwd(), 'data/enhanced');
    
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      
      if (arg === '--output' && i + 1 < args.length) {
        outputDir = path.resolve(process.cwd(), args[++i]);
      }
    }
    
    // Get space IDs from environment
    const facilitySpaceId = process.env.FACILITY_SPACE_ID;
    const licenseSpaceId = process.env.LICENSE_SPACE_ID;
    const dateSpaceId = process.env.DATE_SPACE_ID;
    const locationSpaceId = process.env.LOCATION_SPACE_ID;
    
    if (!facilitySpaceId || !licenseSpaceId || !dateSpaceId || !locationSpaceId) {
      throw new Error('FACILITY_SPACE_ID, LICENSE_SPACE_ID, DATE_SPACE_ID, and LOCATION_SPACE_ID environment variables are required');
    }
    
    console.log('Using space IDs:');
    console.log(`FACILITY_SPACE_ID: ${facilitySpaceId}`);
    console.log(`LICENSE_SPACE_ID: ${licenseSpaceId}`);
    console.log(`DATE_SPACE_ID: ${dateSpaceId}`);
    console.log(`LOCATION_SPACE_ID: ${locationSpaceId}`);
    
    // Read triples data
    const facilityTriples = readJson(path.resolve(process.cwd(), 'data/facility-triples.json'));
    const licenseTriples = readJson(path.resolve(process.cwd(), 'data/license-triples.json'));
    const dateTriples = readJson(path.resolve(process.cwd(), 'data/date-triples.json'));
    const locationTriples = readJson(path.resolve(process.cwd(), 'data/location-triples.json'));
    
    console.log(`Read ${facilityTriples.length} facility entities`);
    console.log(`Read ${licenseTriples.length} license entities`);
    console.log(`Read ${dateTriples.length} date entities`);
    console.log(`Read ${locationTriples.length} location entities`);
    
    // Read original CSV data
    const facilityData = readCsv(path.resolve(process.cwd(), 'data/input/facilities.csv'));
    const licenseData = readCsv(path.resolve(process.cwd(), 'data/input/licenses.csv'));
    const dateData = readCsv(path.resolve(process.cwd(), 'data/input/dates.csv'));
    const locationData = readCsv(path.resolve(process.cwd(), 'data/input/locations.csv'));
    
    console.log(`Read ${facilityData.length} facility records from CSV`);
    console.log(`Read ${licenseData.length} license records from CSV`);
    console.log(`Read ${dateData.length} date records from CSV`);
    console.log(`Read ${locationData.length} location records from CSV`);
    
    // Read mapping files (if applicable)
    const propertyAddresses = readJson(path.resolve(process.cwd(), 'data/mapping/property-addresses.json'));
    console.log(`Read ${Object.keys(propertyAddresses).length} property addresses`);

    // Generate enhanced data
    const enhancedFacilityData = generateEnhancedFacilityData(facilityData, facilityTriples, facilitySpaceId);
    const enhancedLicenseData = generateEnhancedLicenseData(licenseData, licenseTriples, licenseSpaceId);
    const enhancedDateData = generateEnhancedDateData(dateData, dateTriples, dateSpaceId);
    const enhancedLocationData = generateEnhancedLocationData(locationData, locationTriples, locationSpaceId);

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write enhanced data to CSV
    writeToCsv(enhancedFacilityData, path.join(outputDir, 'enhanced-facilities.csv'));
    writeToCsv(enhancedLicenseData, path.join(outputDir, 'enhanced-licenses.csv'));
    writeToCsv(enhancedDateData, path.join(outputDir, 'enhanced-dates.csv'));
    writeToCsv(enhancedLocationData, path.join(outputDir, 'enhanced-locations.csv'));
    
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Execute the script
main().catch(console.error);
