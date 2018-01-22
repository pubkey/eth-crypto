
export function publicKeyToAddress(publicKey: string): string;
export function createPrivateKey(): string;
export function publicKeyFromPrivateKey(privateKey: string): string;

export function hash(message: string): string;
export function signHash(
    privateKey: string,
    hash: string
): string;
export function verifyHashSignature(
    publicKey: string,
    hash: string,
    signature: string
): string;

export function encryptWithPublicKey(
    publicKey: string,
    message: string
): string;

export function decryptWithPrivateKey(
    privateKey: string,
    encrypted: string
): string;

declare const _default: {
    publicKeyToAddress,
    createPrivateKey,
    publicKeyFromPrivateKey,
    hash,
    signHash,
    verifyHashSignature,
    encryptWithPublicKey,
    decryptWithPrivateKey
};
export default _default;
