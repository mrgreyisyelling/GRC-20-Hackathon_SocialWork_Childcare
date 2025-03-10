/**
 * Generate Browser Links Script
 * 
 * This script generates browser links for the entities in the triples data.
 * 
 * Usage:
 *   node src/scripts/generate-browser-links.js [--output <path>]
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

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
 * Generate browser links for entities
 * 
 * @param {string} spaceId The space ID
 * @param {Array} entities The array of entities
 * @param {string} type The entity type (Deed or Permit)
 * @param {string} otherSpaceId The ID of the other space (for cross-space links)
 * @returns {Array} The array of entity links
 */
function generateEntityLinks(spaceId, entities, type, otherSpaceId) {
  const links = [];
  
  entities.forEach(entity => {
    const entityId = entity.entityId;
    
    // Extract a name from the triples
    let name = `${type} ${entityId}`;
    let identifier = '';
    
    // Find the identifier property (instrument number for deeds, record number for permits)
    for (const triple of entity.triples) {
      const attributeId = triple.attributeId || triple.attribute;
      const value = triple.value.value;
      
      if (attributeId === 'LuBWqZAu6pz54eiJS5mLv8') {
        identifier = value;
        name = `${type} ${value}`;
        break;
      }
    }
    
    // Generate browser link for primary space
    const primaryBrowserLink = `${TESTNET_BROWSER_URL}/${spaceId}/${entityId}`;
    
    links.push({
      entityId,
      name,
      identifier,
      type,
      spaceId,
      // spaceName: spaceId === process.env.DEEDS_SPACE_ID ? 'Deeds Space' : 'Permits Space',
      browserLink: primaryBrowserLink
    });
    
    // Generate browser link for other space (cross-space link)
    const otherBrowserLink = `${TESTNET_BROWSER_URL}/${otherSpaceId}/${entityId}`;
    
    links.push({
      entityId,
      name,
      identifier,
      type,
      spaceId: otherSpaceId,
      // spaceName: otherSpaceId === process.env.DEEDS_SPACE_ID ? 'Deeds Space' : 'Permits Space',
      browserLink: otherBrowserLink
    });
  });
  
  return links;
}

/**
 * Write entity links to CSV
 * 
 * @param {Array} entityLinks The array of entity links
 * @param {string} outputPath The output file path
 */
function writeEntityLinksToCsv(entityLinks, outputPath) {
  // Create CSV header
  const csvHeader = 'Entity ID,Name,Identifier,Type,Space,Space Name,Browser Link\n';
  
  // Create CSV rows
  const csvRows = entityLinks.map(link => 
    `${link.entityId},"${link.name.replace(/"/g, '""')}","${link.identifier.replace(/"/g, '""')}","${link.type}","${link.spaceId}","${link.spaceName}",${link.browserLink}`
  ).join('\n');
  
  // Write CSV to file
  fs.writeFileSync(outputPath, csvHeader + csvRows);
  
  console.log(`Wrote ${entityLinks.length} entity links to ${outputPath}`);
}

/**
 * Main function
 */
async function main() {
  try {
    // Parse command line arguments
    const args = process.argv.slice(2);
    let outputPath = path.resolve(process.cwd(), 'data/entity-links.csv');
    
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      
      if (arg === '--output' && i + 1 < args.length) {
        outputPath = path.resolve(process.cwd(), args[++i]);
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
    
    // Read triples data from files
    const facilityTriples = readJson(path.resolve(process.cwd(), 'data/facility-triples.json'));
    const licenseTriples = readJson(path.resolve(process.cwd(), 'data/license-triples.json'));
    const dateTriples = readJson(path.resolve(process.cwd(), 'data/date-triples.json'));
    const locationTriples = readJson(path.resolve(process.cwd(), 'data/location-triples.json'));
    
    console.log(`Read ${facilityTriples.length} facility entities`);
    console.log(`Read ${licenseTriples.length} license entities`);
    console.log(`Read ${dateTriples.length} date entities`);
    console.log(`Read ${locationTriples.length} location entities`);
    
    // Generate entity links for each space
    const facilityLinks = generateEntityLinks(facilitySpaceId, facilityTriples, 'Facility',facilitySpaceId);
    const licenseLinks = generateEntityLinks(licenseSpaceId, licenseTriples, 'License',licenseSpaceId);
    const dateLinks = generateEntityLinks(dateSpaceId, dateTriples, 'Date',dateSpaceId);
    const locationLinks = generateEntityLinks(locationSpaceId, locationTriples, 'Location',locationSpaceId);

    // Combine all entity links
    const allLinks = [...facilityLinks, ...licenseLinks, ...dateLinks, ...locationLinks];
    
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write entity links to CSV
    writeEntityLinksToCsv(allLinks, outputPath);
    
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Execute the script
main().catch(console.error);
