/**
 * Wallet Utility
 *
 * This file provides utilities for working with Ethereum wallets and sending transactions.
 */
/**
 * Account
 *
 * Provides utilities for working with the configured wallet.
 */
export declare const account: {
    address: string;
    /**
     * Send a transaction
     *
     * @param tx The transaction to send
     * @returns The transaction hash
     */
    sendTransaction(tx: {
        to: string;
        value: bigint;
        data: string;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        gasLimit?: bigint;
    }): Promise<string>;
    /**
     * Get the balance of the wallet
     *
     * @returns The balance in wei
     */
    getBalance(): Promise<bigint>;
};
