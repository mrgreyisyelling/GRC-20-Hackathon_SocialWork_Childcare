/**
 * Create Space Command
 *
 * This file provides a CLI command to create a new GRC-20 space.
 */
/**
 * Create Space Command
 *
 * Provides a CLI command to create a new GRC-20 space.
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
