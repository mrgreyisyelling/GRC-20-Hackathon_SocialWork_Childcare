/**
 * Create Space Command
 * 
 * This file provides a CLI command to create new GRC-20 spaces for childcare data.
 */

import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { Wallet } from 'ethers';
import { account } from '../../../../Knowledge_graph_Work/GRC-20_System/GRC20-Hackathon-main/src/utils/wallet.js';

dotenv.config();

// Check for required environment variables
if (!process.env.RPC_URL) {
  console.error("No RPC URL configured. Set RPC_URL in .env file.");
  process.exit(1);
}

/**
 * Create Space Command
 * 
 * Provides a CLI command to create new GRC-20 spaces.
 */
export class CreateSpaceCommand {
  /**
   * Execute the command
   * 
   * @param options The command options
   * @returns A promise that resolves to the space ID
   */
  static async execute(options: { name: string; description?: string }): Promise<string> {
    console.log(`Creating space "${options.name}"...`);

    try {
      // Create space transaction data
      const txHash = await account.sendTransaction({
        to: "0x0000000000000000000000000000000000000000", // Zero address for space creation
        value: 0n,
        data: "0x", // Empty data for space creation
      });

      console.log(`Space creation transaction submitted: ${txHash}`);

      // The space ID is derived from the transaction hash
      const spaceId = `0x${txHash.slice(2, 42)}`;
      console.log(`Space created with ID: ${spaceId}`);

      // Update .env file with the new space ID
      if (options.name.toLowerCase().includes("facility")) {
        updateEnvFile("FACILITY_SPACE_ID", spaceId);
      } else if (options.name.toLowerCase().includes("license")) {
        updateEnvFile("LICENSE_SPACE_ID", spaceId);
      } else if (options.name.toLowerCase().includes("date")) {
        updateEnvFile("DATE_SPACE_ID", spaceId);
      } else if (options.name.toLowerCase().includes("location")) {
        updateEnvFile("LOCATION_SPACE_ID", spaceId);
      } else {
        console.log(`Space ID: ${spaceId}`);
        console.log(`Add this space ID to your .env file manually.`);
      }

      return spaceId;
    } catch (error) {
      console.error('Failed to create space:', error);
      throw error;
    }
  }
}

/**
 * Update the .env file with a new variable
 * 
 * @param key The environment variable key
 * @param value The environment variable value
 */
function updateEnvFile(key: string, value: string): void {
  try {
    const fs = require('fs');
    const path = require('path');
    const envPath = path.resolve(process.cwd(), '.env');

    let envContent = '';

    // Read existing .env file if it exists
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Check if the key already exists
    const regex = new RegExp(`^${key}=.*`, 'm');

    if (regex.test(envContent)) {
      // Replace existing key
      envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
      // Add new key
      envContent += `\n${key}=${value}`;
    }

    // Write to .env file
    fs.writeFileSync(envPath, envContent.trim());
    console.log(`Updated ${key} in .env file`);
  } catch (error) {
    console.error(`Failed to update .env file:`, error);
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
  const options: { name: string; description?: string } = { name: 'New Childcare Space' };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--name' && i + 1 < args.length) {
      options.name = args[++i];
    } else if (arg === '--description' && i + 1 < args.length) {
      options.description = args[++i];
    } else if (arg === '--help') {
      console.log(`
Usage: create-space [options]

Options:
  --name <name>             The name of the space (default: "New Childcare Space")
  --description <desc>      The description of the space
  --help                    Show this help message
      `);
      return;
    }
  }

  try {
    const spaceId = await CreateSpaceCommand.execute(options);
    console.log(`Space created successfully with ID: ${spaceId}`);
  } catch (error) {
    console.error('Failed to create space:', error);
    process.exit(1);
  }
}

// Execute the command if this file is run directly
if (import.meta.url === new URL(import.meta.url).href) {
  main().catch(console.error);
}
