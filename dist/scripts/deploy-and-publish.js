/**
 * Deploy and Publish Script
 *
 * This script deploys spaces for Facilities, Licenses, Locations, and Dates
 * It ensures spaces exist, sets up the ontology, and publishes the data.
 *
 * Usage:
 *   npx ts-node src/scripts/deploy-and-publish.ts
 */
import { TransactionService } from '../services/transaction-service.js';
import { OntologyService } from '../services/ontology-service.js';
import { SpaceIds } from '../config/constants.js';
import dotenv from 'dotenv';
import { account } from '../utils/wallet.js';
import { execSync } from 'child_process';
// Load environment variables
dotenv.config();
/**
 * Main function
 */
async function main() {
    try {
        console.log('Starting deployment and publishing process...');
        console.log('Wallet configured successfully');
        console.log(`Address: ${account.address}`);
        // Debug logs for space IDs
        console.log('Debug: SpaceIds.FACILITY =', SpaceIds.FACILITY);
        console.log('Debug: SpaceIds.LICENSE =', SpaceIds.LICENSE);
        console.log('Debug: SpaceIds.LOCATION =', SpaceIds.LOCATION);
        console.log('Debug: SpaceIds.DATE =', SpaceIds.DATE);
        console.log('Debug: process.env.FACILITIES_SPACE_ID =', process.env.FACILITIES_SPACE_ID);
        console.log('Debug: process.env.LICENSES_SPACE_ID =', process.env.LICENSES_SPACE_ID);
        console.log('Debug: process.env.LOCATIONS_SPACE_ID =', process.env.LOCATIONS_SPACE_ID);
        console.log('Debug: process.env.DATES_SPACE_ID =', process.env.DATES_SPACE_ID);
        // Step 1: Ensure spaces exist
        console.log('\n=== STEP 1: ENSURING SPACES EXIST ===');
        // Check if Facilities space exists
        const facilitiesSpaceId = process.env.FACILITIES_SPACE_ID || SpaceIds.FACILITY;
        console.log(`Checking if Facilities space exists (${facilitiesSpaceId})...`);
        const facilitiesSpaceExists = await TransactionService.spaceExists(facilitiesSpaceId);
        let actualFacilitiesSpaceId = facilitiesSpaceId;
        if (!facilitiesSpaceExists) {
            console.log('Facilities space does not exist. Creating it...');
            actualFacilitiesSpaceId = await TransactionService.createSpace('Facilities Space');
            console.log(`Facilities space created with ID: ${actualFacilitiesSpaceId}`);
        }
        else {
            console.log('Facilities space exists.');
        }
        // Check if Licenses space exists
        const licensesSpaceId = process.env.LICENSES_SPACE_ID || SpaceIds.LICENSE;
        console.log(`Checking if Licenses space exists (${licensesSpaceId})...`);
        const licensesSpaceExists = await TransactionService.spaceExists(licensesSpaceId);
        let actualLicensesSpaceId = licensesSpaceId;
        if (!licensesSpaceExists) {
            console.log('Licenses space does not exist. Creating it...');
            actualLicensesSpaceId = await TransactionService.createSpace('Licenses Space');
            console.log(`Licenses space created with ID: ${actualLicensesSpaceId}`);
        }
        else {
            console.log('Licenses space exists.');
        }
        // Check if Locations space exists
        const locationsSpaceId = process.env.LOCATIONS_SPACE_ID || SpaceIds.LOCATION;
        console.log(`Checking if Locations space exists (${locationsSpaceId})...`);
        const locationsSpaceExists = await TransactionService.spaceExists(locationsSpaceId);
        let actualLocationsSpaceId = locationsSpaceId;
        if (!locationsSpaceExists) {
            console.log('Locations space does not exist. Creating it...');
            actualLocationsSpaceId = await TransactionService.createSpace('Locations Space');
            console.log(`Locations space created with ID: ${actualLocationsSpaceId}`);
        }
        else {
            console.log('Locations space exists.');
        }
        // Check if Dates space exists
        const datesSpaceId = process.env.DATES_SPACE_ID || SpaceIds.DATE;
        console.log(`Checking if Dates space exists (${datesSpaceId})...`);
        const datesSpaceExists = await TransactionService.spaceExists(datesSpaceId);
        let actualDatesSpaceId = datesSpaceId;
        if (!datesSpaceExists) {
            console.log('Dates space does not exist. Creating it...');
            actualDatesSpaceId = await TransactionService.createSpace('Dates Space');
            console.log(`Dates space created with ID: ${actualDatesSpaceId}`);
        }
        else {
            console.log('Dates space exists.');
        }
        // Step 2: Set up ontology
        console.log('\n=== STEP 2: SETTING UP ONTOLOGY ===');
        console.log('Setting up ontology for Facilities space...');
        await OntologyService.setupFacilityOntology(actualFacilitiesSpaceId);
        console.log('Setting up ontology for Licenses space...');
        await OntologyService.setupLicenseOntology(actualLicensesSpaceId);
        console.log('Setting up ontology for Locations space...');
        await OntologyService.setupLocationOntology(actualLocationsSpaceId);
        console.log('Setting up ontology for Dates space...');
        await OntologyService.setupDateOntology(actualDatesSpaceId);
        // Step 3: Publish facilities
        console.log('\n=== STEP 3: PUBLISHING FACILITIES ===');
        console.log('Running publish-facilities script...');
        execSync(`npx ts-node src/scripts/publish-facilities.ts --space-id ${actualFacilitiesSpaceId}`, { stdio: 'inherit' });
        // Step 4: Publish licenses
        console.log('\n=== STEP 4: PUBLISHING LICENSES ===');
        console.log('Running publish-licenses script...');
        execSync(`npx ts-node src/scripts/publish-licenses.ts --space-id ${actualLicensesSpaceId}`, { stdio: 'inherit' });
        // Step 5: Publish locations
        console.log('\n=== STEP 5: PUBLISHING LOCATIONS ===');
        console.log('Running publish-locations script...');
        execSync(`npx ts-node src/scripts/publish-locations.ts --space-id ${actualLocationsSpaceId}`, { stdio: 'inherit' });
        // Step 6: Publish dates
        console.log('\n=== STEP 6: PUBLISHING DATES ===');
        console.log('Running publish-dates script...');
        execSync(`npx ts-node src/scripts/publish-dates.ts --space-id ${actualDatesSpaceId}`, { stdio: 'inherit' });
        console.log('\n=== DEPLOYMENT AND PUBLISHING COMPLETE ===');
        console.log(`Facilities space ID: ${actualFacilitiesSpaceId}`);
        console.log(`Licenses space ID: ${actualLicensesSpaceId}`);
        console.log(`Locations space ID: ${actualLocationsSpaceId}`);
        console.log(`Dates space ID: ${actualDatesSpaceId}`);
        console.log('Done!');
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}
// Execute the script
if (import.meta.url === new URL(import.meta.url).href) {
    main().catch(console.error);
}
//# sourceMappingURL=deploy-and-publish.js.map