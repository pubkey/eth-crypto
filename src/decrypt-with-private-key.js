import {
    secp256k1
} from 'ethereum-cryptography/secp256k1';
import {
    decrypt as aesDecrypt
} from 'ethereum-cryptography/aes';
import {
    sha512
} from '@noble/hashes/sha2.js';
import {
    hmac
} from '@noble/hashes/hmac.js';
import {
    sha256
} from '@noble/hashes/sha2.js';
import {
    concatBytes
} from '@noble/hashes/utils.js';
import {
    parse
} from './cipher';
import {
    removeLeading0x
} from './util';

function equalBytes(a, b) {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
    return diff === 0;
}

export async function decryptWithPrivateKey(privateKey, encrypted) {

    encrypted = parse(encrypted);

    // remove trailing '0x' from privateKey
    const twoStripped = removeLeading0x(privateKey);

    // strict Uint8Array wrappers required by @noble libraries
    const privKeyBytes = new Uint8Array(Buffer.from(twoStripped, 'hex'));
    const ephemPubKey = new Uint8Array(Buffer.from(encrypted.ephemPublicKey, 'hex'));
    const iv = new Uint8Array(Buffer.from(encrypted.iv, 'hex'));
    const ciphertext = new Uint8Array(Buffer.from(encrypted.ciphertext, 'hex'));
    const storedMac = new Uint8Array(Buffer.from(encrypted.mac, 'hex'));

    // ECDH: shared secret = x-coordinate of privKey * ephemPubKey
    const sharedSecret = secp256k1.getSharedSecret(privKeyBytes, ephemPubKey, true).slice(1); // 32 bytes

    // KDF: SHA-512 of shared secret
    const hash = sha512(sharedSecret);
    const encKey = hash.slice(0, 32);
    const macKey = hash.slice(32);

    // verify MAC in constant time
    const dataToMac = concatBytes(iv, ephemPubKey, ciphertext);
    const computedMac = hmac(sha256, macKey, dataToMac);

    if (!equalBytes(storedMac, computedMac)) {
        throw new Error('Bad MAC');
    }

    // aesDecrypt uses WebCrypto and returns a Promise
    const decrypted = await aesDecrypt(ciphertext, encKey, iv, 'aes-256-cbc');
    return Buffer.from(decrypted).toString();
}
