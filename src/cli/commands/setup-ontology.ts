/**
 * Setup Ontology Command
 * 
 * This file provides a CLI command to set up the ontology for the childcare data.
 */

import { OntologyService } from '../../../../Knowledge_graph_Work/GRC-20_System/GRC20-Hackathon-main/src/services/ontology-service.js';
import { SpaceIds } from '../../config/constants.js';

/**
 * Setup Ontology Command
 * 
 * Provides a CLI command to set up the ontology for the childcare spaces.
 */
export class SetupOntologyCommand {
  /**
   * Execute the command
   * 
   * @param options The command options
   * @returns A promise that resolves when the command is complete
   */
  static async execute(options: {
    facilitySpace?: string;
    licenseSpace?: string;
    dateSpace?: string;
    locationSpace?: string;
    facilityOnly?: boolean;
    licenseOnly?: boolean;
    dateOnly?: boolean;
    locationOnly?: boolean;
  }): Promise<void> {
    const facilitySpaceId = options.facilitySpace || SpaceIds.FACILITY;
    const licenseSpaceId = options.licenseSpace || SpaceIds.LICENSE;
    const dateSpaceId = options.dateSpace || SpaceIds.DATE;
    const locationSpaceId = options.locationSpace || SpaceIds.LOCATION;

    console.log('Setting up ontology...');

    if (options.facilityOnly) {
      await OntologyService.setupFacilityOntology(facilitySpaceId);
    } else if (options.licenseOnly) {
      await OntologyService.setupLicenseOntology(licenseSpaceId);
    } else if (options.dateOnly) {
      await OntologyService.setupDateOntology(dateSpaceId);
    } else if (options.locationOnly) {
      await OntologyService.setupLocationOntology(locationSpaceId);
    } else {
      // If no specific option is chosen, set up all spaces
      await OntologyService.setupOntologies(facilitySpaceId, licenseSpaceId, dateSpaceId, locationSpaceId);
    }

    console.log('Ontology setup complete!');
  }
}

/**
 * Main function
 * 
 * This function is called when the command is executed from the CLI.
 */
export async function main(): Promise<void> {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const options: {
    facilitySpace?: string;
    licenseSpace?: string;
    dateSpace?: string;
    locationSpace?: string;
    facilityOnly?: boolean;
    licenseOnly?: boolean;
    dateOnly?: boolean;
    locationOnly?: boolean;
  } = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--facility-space' && i + 1 < args.length) {
      options.facilitySpace = args[++i];
    } else if (arg === '--license-space' && i + 1 < args.length) {
      options.licenseSpace = args[++i];
    } else if (arg === '--date-space' && i + 1 < args.length) {
      options.dateSpace = args[++i];
    } else if (arg === '--location-space' && i + 1 < args.length) {
      options.locationSpace = args[++i];
    } else if (arg === '--facility-only') {
      options.facilityOnly = true;
    } else if (arg === '--license-only') {
      options.licenseOnly = true;
    } else if (arg === '--date-only') {
      options.dateOnly = true;
    } else if (arg === '--location-only') {
      options.locationOnly = true;
    } else if (arg === '--help') {
      console.log(`
Usage: setup-ontology [options]

Options:
  --facility-space <id>  The facility space ID
  --license-space <id>   The license space ID
  --date-space <id>      The date space ID
  --location-space <id>  The location space ID
  --facility-only        Only set up the facility ontology
  --license-only         Only set up the license ontology
  --date-only            Only set up the date ontology
  --location-only        Only set up the location ontology
  --help                 Show this help message
      `);
      return;
    }
  }

  await SetupOntologyCommand.execute(options);
}

// Execute the command if this file is run directly
if (require.main === module) {
  main().catch(console.error);
}
