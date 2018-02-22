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

export function sign(privateKey: string, message: string): Signature;
export function recover(sig: Signature, message: string);

export function encryptWithPublicKey(publicKey: string, message: string): Promise<Encrypted>;
export function decryptWithPrivateKey(privateKey: string, encrypted: Encrypted): Promise<string>;

export type hash = {
    solidityHash(msg: string): string;
    signHash(msg: string): string;
};

export type util = {
    web3: Web3
};


export function publicKeyToAddress(publicKey: string): string;



declare const _default: {
    addressByPublicKey,
    createIdentity,
    decryptWithPrivateKey,
    encryptWithPublicKey,
    publicKeyByPrivateKey,
    recover,
    sign,
    hash,
    util
};
export default _default;
