import {
    privateToPublic,
    hexToBytes,
    bytesToHex
} from '@ethereumjs/util';
import {
    addLeading0x,
    removeLeading0x
} from './util';

/**
 * Generate publicKey from the privateKey.
 * This creates the uncompressed publicKey,
 * where 04 has stripped from left
 * @returns {string}
 */
export function publicKeyByPrivateKey(privateKey) {
    privateKey = addLeading0x(privateKey);
    const publicKeyBuffer = privateToPublic(hexToBytes(privateKey));
    const ret = removeLeading0x(bytesToHex(publicKeyBuffer));
    return ret;
}
