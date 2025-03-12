/**
 * Setup Ontology Command
 *
 * This file provides a CLI command to set up the ontology for the childcare data.
 */
/**
 * Setup Ontology Command
 *
 * Provides a CLI command to set up the ontology for the childcare spaces.
 */
export declare class SetupOntologyCommand {
    /**
     * Execute the command
     *
     * @param options The command options
     * @returns A promise that resolves when the command is complete
     */
    static execute(options: {
        facilitySpace?: string;
        licenseSpace?: string;
        dateSpace?: string;
        locationSpace?: string;
        facilityOnly?: boolean;
        licenseOnly?: boolean;
        dateOnly?: boolean;
        locationOnly?: boolean;
    }): Promise<void>;
}
/**
 * Main function
 *
 * This function is called when the command is executed from the CLI.
 */
export declare function main(): Promise<void>;
