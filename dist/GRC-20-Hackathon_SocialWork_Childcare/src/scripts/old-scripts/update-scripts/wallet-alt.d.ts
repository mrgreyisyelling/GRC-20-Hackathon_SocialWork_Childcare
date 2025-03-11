export declare const account: {
    address: string;
    sendTransaction(tx: {
        to: string;
        value: bigint;
        data: string;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        gasLimit?: bigint;
    }): Promise<any>;
};
