/**
 * Log Info Script
 * 
 * This script logs relevant environment information.
 */

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Main function
 */
function main() {
  try {
    console.log('Logging environment information...\n');

    // Log relevant environment variables
    console.log('🔹 Environment Variables:');
    console.log('FACILITIES_SPACE_ID:', process.env.FACILITIES_SPACE_ID);
    console.log('LICENSES_SPACE_ID:', process.env.LICENSES_SPACE_ID);
    console.log('DATE_SPACE_ID:', process.env.DATE_SPACE_ID);
    console.log('LOCATION_SPACE_ID:', process.env.LOCATION_SPACE_ID);
    
    console.log('\n🔹 Blockchain Configuration:');
    console.log('WALLET_ADDRESS:', process.env.WALLET_ADDRESS);
    console.log('RPC_URL:', process.env.RPC_URL);
    console.log('CHAIN_ID:', process.env.CHAIN_ID);

    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Execute the script
main();
