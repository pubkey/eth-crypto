import {
    secp256k1
} from 'ethereum-cryptography/secp256k1';
import {
    encrypt as aesEncrypt
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
    randomBytes,
    concatBytes
} from '@noble/hashes/utils.js';
import {
    decompress
} from './public-key';

export async function encryptWithPublicKey(publicKey, message, opts) {

    // ensure its an uncompressed publicKey
    publicKey = decompress(publicKey);

    // re-add the compression-flag and convert to Uint8Array (noble requires strict Uint8Array)
    const pubKeyBytes = new Uint8Array(Buffer.from('04' + publicKey, 'hex'));

    opts = opts || {};

    // generate ephemeral key pair
    let ephemPrivKey = opts.ephemPrivateKey ?
        new Uint8Array(Buffer.from(opts.ephemPrivateKey)) :
        randomBytes(32);
    while (!secp256k1.utils.isValidPrivateKey(ephemPrivKey)) {
        ephemPrivKey = randomBytes(32);
    }

    const ephemPubKey = secp256k1.getPublicKey(ephemPrivKey, false); // 65-byte uncompressed

    // ECDH: shared secret = x-coordinate of ephemPrivKey * recipientPubKey
    const sharedSecret = secp256k1.getSharedSecret(ephemPrivKey, pubKeyBytes, true).slice(1); // 32 bytes

    // KDF: SHA-512 of shared secret
    const hash = sha512(sharedSecret);
    const encKey = hash.slice(0, 32);
    const macKey = hash.slice(32);

    const iv = opts.iv ?
        new Uint8Array(Buffer.from(opts.iv)) :
        randomBytes(16);

    const msgBytes = new Uint8Array(Buffer.from(message));

    // aesEncrypt uses WebCrypto and returns a Promise
    const ciphertext = new Uint8Array(await aesEncrypt(msgBytes, encKey, iv, 'aes-256-cbc'));

    // MAC = HMAC-SHA256(macKey, IV || ephemPubKey || ciphertext)
    const dataToMac = concatBytes(iv, ephemPubKey, ciphertext);
    const mac = hmac(sha256, macKey, dataToMac);

    return {
        iv: Buffer.from(iv).toString('hex'),
        ephemPublicKey: Buffer.from(ephemPubKey).toString('hex'),
        ciphertext: Buffer.from(ciphertext).toString('hex'),
        mac: Buffer.from(mac).toString('hex')
    };
}
