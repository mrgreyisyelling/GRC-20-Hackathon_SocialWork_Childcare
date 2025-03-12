/**
 * Create Space Command
 *
 * This file provides a CLI command to create new GRC-20 spaces for childcare data.
 */
/**
 * Create Space Command
 *
 * Provides a CLI command to create new GRC-20 spaces.
 */
export declare class CreateSpaceCommand {
    /**
     * Execute the command
     *
     * @param options The command options
     * @returns A promise that resolves to the space ID
     */
    static execute(options: {
        name: string;
        description?: string;
    }): Promise<string>;
}
/**
 * Main function
 *
 * This function is called when the command is executed from the CLI.
 */
export declare function main(): Promise<void>;
