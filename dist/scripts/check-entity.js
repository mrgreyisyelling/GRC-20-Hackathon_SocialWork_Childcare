/**
 * Check Entity Script
 *
 * This script checks if an entity exists on the GRC-20 network.
 *
 * Usage:
 *   node src/scripts/check-entity.js --space-id <id> --entity-id <id>
 */
import { SpaceIds } from 'config/constants.js';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
/**
 * List of valid spaces
 */
const VALID_SPACES = {
    FACILITY: SpaceIds.FACILITY,
    LICENSE: SpaceIds.LICENSE,
    DATE: SpaceIds.DATE,
    LOCATION: SpaceIds.LOCATION,
};
/**
 * Check if an entity exists on the GRC-20 network
 *
 * @param {string} spaceId The space ID
 * @param {string} entityId The entity ID
 * @returns {Promise<boolean>} A promise that resolves to true if the entity exists, false otherwise
 */
async function checkEntity(spaceId, entityId) {
    try {
        const url = `https://geogenesis-git-feat-testnet-geo-browser.vercel.app/space/${spaceId}/${entityId}`;
        console.log(`Checking entity at ${url}...`);
        const response = await fetch(url);
        console.log(`Response status: ${response.status}`);
        if (response.status === 200) {
            const text = await response.text();
            if (text.includes('not found') || text.includes('error')) {
                console.log(`Entity does not exist at ${url} (response contains error message)`);
                return false;
            }
            else {
                console.log(`✅ Entity exists at ${url}`);
                return true;
            }
        }
        else {
            console.log(`❌ Entity does not exist at ${url} (status: ${response.status})`);
            return false;
        }
    }
    catch (error) {
        console.error('⚠️ Error checking entity:', error);
        return false;
    }
}
/**
 * Main function
 */
async function main() {
    try {
        // Parse command line arguments
        const args = process.argv.slice(2);
        let spaceId = SpaceIds.FACILITY; // Default space
        let entityId = 'facility-record-123456'; // Default entity ID
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (arg === '--space-id' && i + 1 < args.length) {
                spaceId = args[++i];
                // Validate space ID
                if (!Object.values(VALID_SPACES).includes(spaceId)) {
                    throw new Error(`Invalid space ID: ${spaceId}. Choose from: ${Object.keys(VALID_SPACES).join(', ')}`);
                }
            }
            else if (arg === '--entity-id' && i + 1 < args.length) {
                entityId = args[++i];
            }
        }
        if (!spaceId) {
            throw new Error('Space ID is required. Provide it with --space-id.');
        }
        if (!entityId) {
            throw new Error('Entity ID is required. Provide it with --entity-id.');
        }
        /**
         * List of valid spaces
         */
        /**
         * Fix: Explicitly cast key lookup as keyof typeof VALID_SPACES
         */
        console.log(`🔍 Checking entity in space: ${Object.keys(VALID_SPACES).find(key => VALID_SPACES[key] === spaceId)}`);
        console.log(`🔍 Entity ID: ${entityId}`);
        // Check if the entity exists
        const exists = await checkEntity(spaceId, entityId);
        if (exists) {
            console.log('✅ Entity exists on the GRC-20 network.');
        }
        else {
            console.log('❌ Entity does not exist on the GRC-20 network.');
            console.log('🔹 Possible reasons:');
            console.log('  1. The data has not been indexed yet.');
            console.log('  2. The TransactionService is not publishing correctly.');
            console.log('  3. The provided space ID or entity ID is incorrect.');
        }
        console.log('✅ Done!');
    }
    catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}
// Execute the script
main().catch(console.error);
//# sourceMappingURL=check-entity.js.map