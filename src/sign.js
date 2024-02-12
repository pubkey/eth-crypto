import { secp256k1 } from '@noble/curves/secp256k1';
import {
    addLeading0x,
    removeLeading0x
} from './util';

/**
 * signs the given message
 * we do not use sign from eth-lib because the pure secp256k1-version is 90% faster
 * @param  {string} privateKey
 * @param  {string} hash
 * @return {string} hexString
 */
export function sign(privateKey, hash) {
    hash = addLeading0x(hash);
    if (hash.length !== 66)
        throw new Error('EthCrypto.sign(): Can only sign hashes, given: ' + hash);

    const sigObj = secp256k1.sign(
        new Uint8Array(Buffer.from(removeLeading0x(hash), 'hex')),
        new Uint8Array(Buffer.from(removeLeading0x(privateKey), 'hex'))
    )
    const recoveryId = sigObj.recovery === 1 ? '1c' : '1b';
    const newSignature = '0x' + sigObj.toCompactHex() + recoveryId;
    return newSignature;
}
