import BigNumber = require('bn.js');

type createIdentityType = (entropy?: Buffer) => {
    privateKey: string,
    publicKey: string,
    address: string
}
export const createIdentity: createIdentityType;

type publicKeyType = {
    compress(publicKey: string): string;
    decompress(publicKey: string): string;
    toAddress(publicKey: string): string;
}
export const publicKey: publicKeyType;

type publicKeyByPrivateKeyType = (privateKey: string) => string;
export const publicKeyByPrivateKey: publicKeyByPrivateKeyType;

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
    from: string;
    to: string;
    value: number | string | BigNumber;
    gasLimit: number;
    gasPrice: number;
    nonce: number;
    code?: string;
};

type signType = (privateKey: string, message: string) => string;
export const sign: signType;

type recoverType = (sig: string, message: string) => string;
export const recover: recoverType;

type recoverPublicKeyType = (sig: string, message: string) => string;
export const recoverPublicKey: recoverPublicKeyType;

type vrsType = {
    fromString(hexString: string): Signature;
    toString(sig: Signature): string;
};
export const vrs: vrsType;

type encryptWithPublicKeyType = (publicKey: string, message: string) => Promise<Encrypted>;
export const encryptWithPublicKey: encryptWithPublicKeyType;

type decryptWithPrivateKeyType = (privateKey: string, encrypted: Encrypted) => Promise<string>;
export const decryptWithPrivateKey: decryptWithPrivateKeyType;

type cipherType = {
    stringify(encrypted: Encrypted): string;
    parse(encrypted: string): Encrypted;
};
export const cipher: cipherType;

type signTransactionType = (
    rawTx: RawTx,
    privateKey: string
) => string;
export const signTransaction: signTransactionType;

type txDataByCompiledType = (
    abi: any,
    bytecode: string,
    args?: Array<string | number | BigNumber>
) => string;
export const txDataByCompiled: txDataByCompiledType;

type calculateContractAddressType = (
    creatorAddress: string,
    nonce: number
) => string;
export const calculateContractAddress: calculateContractAddressType;

export type TypedValue = {
    value: string | Number | BigNumber,
    type: 'string' | 'uint256' | 'int256' | 'bool' | 'bytes' | 'bytes32' | 'address'
};

type hashType = {
    keccak256(params: string | TypedValue[]): string;
};
export const hash: hashType;

type utilType = {
    removeTrailing0x(str: string): string;
    addTrailing0x(str: string): string;
};
export const util: utilType;

type hexType = {
    compress(hex: string, base64?: boolean): string;
    decompress(str: string, base64?: boolean): string;
};
export const hex: hexType;

declare const _default: {
    createIdentity: createIdentityType,
    publicKey: publicKeyType,
    encryptWithPublicKey: encryptWithPublicKeyType,
    decryptWithPrivateKey: decryptWithPrivateKeyType,
    cipher: cipherType,
    signTransaction: signTransactionType,
    txDataByCompiled: txDataByCompiledType,
    publicKeyByPrivateKey: publicKeyByPrivateKeyType,
    recover: recoverType,
    recoverPublicKey: recoverPublicKeyType,
    sign: signType,
    calculateContractAddress: calculateContractAddressType,
    hash: hashType,
    hex: hexType,
    vrs: vrsType,
    util: utilType
};
export default _default;
