/**
 * Setup Ontology Command
 *
 * This file provides a CLI command to set up the ontology for the GRC-20 spaces.
 */
/**
 * Setup Ontology Command
 *
 * Provides a CLI command to set up the ontology for the GRC-20 spaces.
 */
export declare class SetupOntologyCommand {
    /**
     * Execute the command
     *
     * @param options The command options
     * @returns A promise that resolves when the command is complete
     */
    static execute(options: {
        deedSpace?: string;
        permitSpace?: string;
        deedOnly?: boolean;
        permitOnly?: boolean;
    }): Promise<void>;
}
/**
 * Main function
 *
 * This function is called when the command is executed from the CLI.
 */
export declare function main(): Promise<void>;
