import { BigNumber } from 'bn.js';

export function createIdentity(): {
    privateKey: string,
    publicKey: string,
    address: string
};

export type publicKey = {
    compress(publicKey: string): string;
    decompress(publicKey: string): string;
    toAddress(publicKey: string): string;
};

export function publicKeyByPrivateKey(privateKey: string): string;

export type Signature = {
    v: string,
    r: string,
    s: string
};

export type Encrypted = {
    iv: string,
    ephemPublicKey: string,
    ciphertext: string,
    mac: string
};

export type RawTx = {
    from: string,
    to: string,
    value: number | string | BigNumber,
    gasLimit: number,
    gasPrice: number,
    code?: string
};

export function sign(privateKey: string, message: string): string;
export function recover(sig: string, message: string): string;
export function recoverPublicKey(sig: string, message: string): string;

export type vrs = {
    fromString(hexString): Signature;
    toString(sig: Signature): string;
};

export function encryptWithPublicKey(publicKey: string, message: string): Promise<Encrypted>;
export function decryptWithPrivateKey(privateKey: string, encrypted: Encrypted): Promise<string>;

export type cipher = {
    stringify(encrypted: Encrypted): string;
    parse(encrypted: string): Encrypted;
};

export function signTransaction(
    rawTx: RawTx,
    privateKey: string
): string;

export function txDataByCompiled(
    abi: any,
    bytecode: string,
    args?: Array<string | number | BigNumber>
): string;

export function calculateContractAddress(
    creatorAddress: string,
    nonce: number
): string;

export type TypedValue = {
    value: string | Number | BigNumber,
    type: 'string' | 'uint256' | 'int256' | 'bool' | 'bytes' | 'bytes32' | 'address'
};

export type hash = {
    keccak256(params: TypedValue[]): string;
};

export type util = {
    removeTrailing0x(str: string): string;
    addTrailing0x(str: string): string;
};

export type hex = {
    compress(hex: string, base64?: boolean): string;
    decompress(str: string, base64?: boolean): string;
};


export function publicKeyToAddress(publicKey: string): string;

declare const _default: {
    createIdentity: () => {
        privateKey: string,
        publicKey: string,
        address: string
    },
    publicKey: {
        compress(publicKey: string): string;
        decompress(publicKey: string): string;
        toAddress(publicKey: string): string;
    },
    decryptWithPrivateKey: (privateKey: string, encrypted: Encrypted) => Promise<string>,
    encryptWithPublicKey: (publicKey: string, message: string)=> Promise<Encrypted>,
    cipher: {
        stringify(encrypted: Encrypted): string;
        parse(encrypted: string): Encrypted;
    },
    publicKeyByPrivateKey: (privateKey: string)=> string,
    recover: (sig: string, message: string) => string,
    recoverPublicKey: (sig: string, message: string) => string,
    sign: (privateKey: string, message: string) => string,
    signTransaction: (rawTx: RawTx, privateKey: string) => string,
    txDataByCompiled: (
        abi: any,
        bytecode: string,
        args?: Array<string | number | BigNumber>
    ) =>  string,
    calculateContractAddress: (creatorAddress: string, nonce: number) => string,
    hash: (params: TypedValue[]) => string,
    hex: {
        compress(hex: string, base64?: boolean): string;
        decompress(str: string, base64?: boolean): string;
    },
    vrs: {
        fromString(hexString): Signature;
        toString(sig: Signature): string;
    },
    util: {
        removeTrailing0x(str: string): string;
        addTrailing0x(str: string): string;
    }
};
export default _default;
