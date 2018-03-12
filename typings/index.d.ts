import { BigNumber } from 'bn.js';
import Web3 from 'web3';

export function createIdentity(): {
    privateKey: string,
    publicKey: string,
    address: string
};

export function publicKeyByPrivateKey(privateKey: string): string;
export function addressByPublicKey(publicKey: string): string;

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
export function recover(sig: string, message: string);
export function recoverPublicKey(sig: string, message: string);

export type vrs = {
    fromString(hexString): Signature;
    toString(sig: Signature): string;
};

export function encryptWithPublicKey(publicKey: string, message: string): Promise<Encrypted>;
export function decryptWithPrivateKey(privateKey: string, encrypted: Encrypted): Promise<string>;

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
    prefixedHash(msg: string): string;
    SIGN_PREFIX: string;
};

export type util = {
    web3: Web3;
    removeTrailing0x(str: string): string;
    addTrailing0x(str: string): string;
};

export type hex = {
    compress(hex: string, base64?: boolean): string;
    decompress(str: string, base64?: boolean): string;
};


export function publicKeyToAddress(publicKey: string): string;

declare const _default: {
    addressByPublicKey,
    createIdentity,
    decryptWithPrivateKey,
    encryptWithPublicKey,
    publicKeyByPrivateKey,
    recover,
    recoverPublicKey,
    sign,
    signTransaction,
    txDataByCompiled,
    calculateContractAddress,
    hash,
    hex,
    vrs,
    util
};
export default _default;
