import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { Wallet } from 'ethers';

dotenv.config();

if (!process.env.RPC_URL) {
  console.error("No RPC URL configured. Set RPC_URL in .env file.");
  process.exit(1);
}

if (!process.env.PRIVATE_KEY) {
  console.error("No wallet configured. Set PRIVATE_KEY in .env file.");
  process.exit(1);
}

if (!process.env.WALLET_ADDRESS) {
  console.error("No wallet address configured. Set WALLET_ADDRESS in .env file.");
  process.exit(1);
}

const wallet = new Wallet(process.env.PRIVATE_KEY);

export const account = {
  address: process.env.WALLET_ADDRESS,
  async sendTransaction(tx: { to: string; value: bigint; data: string; maxFeePerGas?: bigint; maxPriorityFeePerGas?: bigint; gasLimit?: bigint }) {
    try {
      // Use fixed gas values for testing
      const gasLimit = '0x7A120'; // 500,000
      const gasPrice = '0x2540BE400'; // 10 gwei
      
      console.log('\n[Transaction] Using fixed gas values:', {
        gasLimit,
        gasPrice
      });

      // Get nonce
      console.log('\n[Transaction] Getting nonce...');
      const nonceCmd = `curl -s -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["${process.env.WALLET_ADDRESS}","latest"],"id":1}' "${process.env.RPC_URL}"`;
      const nonceResponse = execSync(nonceCmd).toString();
      const nonce = JSON.parse(nonceResponse).result;
      console.log('Nonce:', nonce);

      // Create raw transaction
      const rawTx = {
        to: tx.to,
        data: tx.data,
        gasLimit,
        gasPrice,
        nonce,
        chainId: 19411, // GRC-20 testnet chain ID
        value: '0x0'
      };

      // Sign transaction
      console.log('\n[Transaction] Signing transaction...');
      const signedTx = await wallet.signTransaction(rawTx);
      console.log('Signed transaction:', signedTx);

      // Send transaction
      console.log('\n[Transaction] Sending transaction...');
      const sendTxCmd = `curl -s -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["${signedTx}"],"id":1}' "${process.env.RPC_URL}"`;
      const sendTxResponse = execSync(sendTxCmd).toString();
      console.log('\n[Transaction] Raw response:', sendTxResponse);
      const txResult = JSON.parse(sendTxResponse);
      
      if (txResult.error) {
        throw new Error(`Transaction failed: ${JSON.stringify(txResult.error)}`);
      }
      
      const txHash = txResult.result;
      console.log('\n✅ [Transaction] Submitted:', { txHash });

      // Wait for confirmation
      console.log('\n[Transaction] Waiting for confirmation...');
      let confirmed = false;
      let attempts = 0;
      const maxAttempts = 30;
      
      while (!confirmed && attempts < maxAttempts) {
        const receiptCmd = `curl -s -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["${txHash}"],"id":1}' "${process.env.RPC_URL}"`;
        const receiptResponse = execSync(receiptCmd).toString();
        const receipt = JSON.parse(receiptResponse).result;
        
        if (receipt) {
          console.log('\n✅ [Transaction] Confirmed:', receipt);
          confirmed = true;
        } else {
          attempts++;
          console.log(`\n[Transaction] Waiting... (attempt ${attempts}/${maxAttempts})`);
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        }
      }

      if (!confirmed) {
        throw new Error('Transaction confirmation timeout');
      }

      return txHash;
    } catch (error) {
      console.error('\n[Transaction] Error:', error);
      throw error;
    }
  }
};

// Execute if running directly
if (import.meta.url === new URL(import.meta.url).href) {
  console.log('Wallet configured successfully');
  console.log('Address:', account.address);
  
  try {
    // Get balance
    const balanceCmd = `curl -s -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["${account.address}","latest"],"id":1}' "${process.env.RPC_URL}"`;
    const balanceResponse = execSync(balanceCmd).toString();
    const balance = BigInt(JSON.parse(balanceResponse).result);
    console.log('Balance:', balance.toString());
    process.exit(0);
  } catch (error: unknown) {
    console.error('Failed to get balance:', error);
    process.exit(1);
  }
}
