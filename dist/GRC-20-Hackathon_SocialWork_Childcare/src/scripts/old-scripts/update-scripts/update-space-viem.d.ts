/**
 * Update Space Viem Script
 *
 * This script updates an existing space using the viem library.
 *
 * Usage:
 *   npx ts-node src/scripts/update-space-viem.ts [deeds|permits]
 */
import 'dotenv/config';
import { type Op } from "@graphprotocol/grc-20";
interface PublishOptions {
    spaceId: string;
    editName?: string;
    author?: string;
    ops?: Op[];
}
/**
 * Publish operations to a space
 *
 * @param options The publish options
 * @returns A promise that resolves to the transaction hash
 */
export declare function publish(options: PublishOptions): Promise<`0x${string}`>;
export {};
