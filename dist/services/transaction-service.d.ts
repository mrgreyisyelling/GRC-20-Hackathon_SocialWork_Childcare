/**
 * Transaction Service
 *
 * This service handles blockchain transactions for the GRC-20 space.
 */
import { EntityOp } from '../core/graph.js';
/**
 * Transaction Service
 *
 * Provides services for submitting transactions to the GRC-20 spaces.
 */
export declare class TransactionService {
    /**
     * Create a new GRC-20 space
     *
     * @param name The name of the space
     * @returns A promise that resolves to the space ID
     */
    static createSpace(name: string): Promise<string>;
    /**
     * Submit operations to a GRC-20 space
     *
     * @param spaceId The space ID
     * @param ops The operations to submit
     * @returns The transaction hash
     */
    static submitOperations(spaceId: string, ops: EntityOp[]): Promise<string>;
    /**
     * Submit a batch of operations to a GRC-20 space
     *
     * @param spaceId The space ID
     * @param opsBatches The batches of operations to submit
     * @param batchSize The maximum number of operations per batch
     * @returns The transaction hashes
     */
    static submitOperationBatches(spaceId: string, opsBatches: EntityOp[][], batchSize?: number): Promise<string[]>;
    /**
     * Split operations into batches
     *
     * @param ops The operations to split
     * @param batchSize The maximum number of operations per batch
     * @returns The batches of operations
     */
    static splitIntoBatches(ops: EntityOp[], batchSize?: number): EntityOp[][];
    /**
     * Check if a space exists
     *
     * @param spaceId The space ID to check
     * @returns A promise that resolves to true if the space exists, false otherwise
     */
    static spaceExists(spaceId: string): Promise<boolean>;
    /**
     * Update the .env file with a new variable
     *
     * @param key The environment variable key
     * @param value The environment variable value
     */
    private static updateEnvFile;
}
