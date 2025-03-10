/**
 * Check and Update Script
 * 
 * This script checks if the spaces exist and prints out the space IDs.
 * It can also update the spaces if requested.
 * 
 * Usage:
 *   node src/scripts/check-and-update.js [--update]
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

/**
 * List of spaces to check and update
 */
const spaces = {
  FACILITY: process.env.FACILITY_SPACE_ID,
  LICENSE: process.env.LICENSE_SPACE_ID,
  DATE: process.env.DATE_SPACE_ID,
  LOCATION: process.env.LOCATION_SPACE_ID,
};

/**
 * Check if a space exists
 * 
 * @param {string} spaceId The space ID to check
 * @returns {Promise<boolean>} A promise that resolves to true if the space exists, false otherwise
 */
async function spaceExists(spaceId) {
  try {
    console.log(`Checking if space ${spaceId} exists...`);

    const tempJsonPath = path.resolve(process.cwd(), 'temp-request.json');
    const requestBody = { cid: 'ipfs://QmTest123', network: "TESTNET" };
    fs.writeFileSync(tempJsonPath, JSON.stringify(requestBody));

    const cmd = `curl -s -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d @${tempJsonPath} "https://api-testnet.grc-20.thegraph.com/space/${spaceId}/edit/calldata"`;

    try {
      const response = execSync(cmd).toString();
      fs.unlinkSync(tempJsonPath);

      const responseObj = JSON.parse(response);
      if (responseObj.error) {
        console.log(`Space does not exist: ${responseObj.reason}`);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error:', error.message);
      return false;
    }
  } catch (error) {
    console.error(`Error checking space existence:`, error);
    return false;
  }
}

/**
 * Update a space with a simple test entity
 * 
 * @param {string} spaceId The space ID to update
 * @returns {Promise<string>} A promise that resolves to the transaction hash
 */
async function updateSpace(spaceId, entityType) {
  try {
    console.log(`Updating space ${spaceId}...`);

    const walletAddress = process.env.WALLET_ADDRESS;
    const privateKey = process.env.PRIVATE_KEY;
    const rpcUrl = process.env.RPC_URL;

    if (!walletAddress || !privateKey || !rpcUrl) {
      throw new Error('WALLET_ADDRESS, PRIVATE_KEY, and RPC_URL must be set in .env file');
    }

    console.log('Using wallet:', walletAddress);
    console.log('RPC URL:', rpcUrl);

    const timestamp = new Date().toISOString();
    const entityId = `${entityType.toLowerCase()}-record-${Date.now()}`;

    // Create a test update entity based on type
    const testEntity = {
      name: `${entityType} Test Update ${timestamp}`,
      ops: [
        {
          type: 'CREATE_ENTITY',
          id: entityId,
          name: `${entityType} Record ${timestamp}`,
          types: [entityType],
          triples: [{ subject: entityId, predicate: 'created at', object: timestamp }]
        }
      ],
      author: walletAddress
    };

    // Write entity update to temp file
    const editPath = path.resolve(process.cwd(), 'temp-edit.json');
    fs.writeFileSync(editPath, JSON.stringify(testEntity, null, 2));

    // Publish to IPFS
    const ipfsCmd = `curl -s -X POST -F "file=@${editPath}" "https://api.thegraph.com/ipfs/api/v0/add?stream-channels=true&progress=false"`;
    let ipfsResponse;
    try {
      ipfsResponse = execSync(ipfsCmd).toString();
    } catch (error) {
      fs.unlinkSync(editPath);
      throw new Error(`Failed to publish to IPFS: ${error.message}`);
    }

    fs.unlinkSync(editPath);
    const { Hash } = JSON.parse(ipfsResponse);
    const cid = `ipfs://${Hash}`;
    console.log('\n✅ [IPFS] Published edit:', { cid });

    // Get calldata
    const tempJsonPath = path.resolve(process.cwd(), 'temp-request.json');
    fs.writeFileSync(tempJsonPath, JSON.stringify({ cid: cid, network: "TESTNET" }));

    const calldataCmd = `curl -s -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d @${tempJsonPath} "https://api-testnet.grc-20.thegraph.com/space/${spaceId}/edit/calldata"`;
    let calldataResponse;
    try {
      calldataResponse = execSync(calldataCmd).toString();
    } catch (error) {
      fs.unlinkSync(tempJsonPath);
      throw new Error(`Failed to get calldata: ${error.message}`);
    }

    fs.unlinkSync(tempJsonPath);
    const response = JSON.parse(calldataResponse);
    if (response.error) throw new Error(`API error: ${JSON.stringify(response.error)}`);

    const { to, data } = response;
    if (!to || !data) throw new Error(`Invalid response format: ${JSON.stringify(response)}`);

    // Submit transaction using ethers.js
    const { Wallet } = await import('ethers');
    const wallet = new Wallet(privateKey);
    const gasLimit = '0xC65D40';
    const gasPrice = '0x3B9ACA00';

    const rawTx = { to, data, gasLimit, gasPrice, nonce: 0, chainId: 19411, value: '0x0' };
    const signedTx = await wallet.signTransaction(rawTx);

    const sendTxCmd = `curl -s -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["${signedTx}"],"id":1}' "${rpcUrl}"`;
    const sendTxResponse = execSync(sendTxCmd).toString();
    const txResult = JSON.parse(sendTxResponse);

    if (txResult.error) throw new Error(`Transaction failed: ${JSON.stringify(txResult.error)}`);

    console.log('\n✅ [Transaction] Submitted:', { txHash: txResult.result });
    return txResult.result;
  } catch (error) {
    console.error('Error updating space:', error);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Checking spaces...');

    for (const [name, spaceId] of Object.entries(spaces)) {
      console.log(`${name}_SPACE_ID:`, spaceId);

      if (spaceId) {
        const exists = await spaceExists(spaceId);
        console.log(`${name} space exists: ${exists}`);

        // Update if requested
        if (process.argv.includes('--update') && exists) {
          console.log(`\nUpdating ${name} space...`);
          const txHash = await updateSpace(spaceId, name);
          console.log(`${name} space updated with transaction hash: ${txHash}`);
        }
      } else {
        console.log(`${name}_SPACE_ID not set in .env file`);
      }
    }

    console.log('\n✅ Done!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Execute the script
main().catch(console.error);
