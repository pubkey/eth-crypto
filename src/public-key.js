import { secp256k1 } from '@noble/curves/secp256k1';
import {
    pubToAddress,
    toChecksumAddress,
    toBuffer
} from 'ethereumjs-util';
import {
    hexToUnit8Array,
    addLeading0x
} from './util';

export function compress(startsWith04) {
    // add trailing 04 if not done before
    const testBuffer = Buffer.from(startsWith04, 'hex');
    if (testBuffer.length === 64) startsWith04 = '04' + startsWith04;
    const pub = secp256k1.ProjectivePoint.fromHex(hexToUnit8Array(startsWith04));
    return pub.toHex(true);
}

export function decompress(startsWith02Or03) {
    // if already decompressed an not has trailing 04
    const testBuffer = Buffer.from(startsWith02Or03, 'hex');
    if (testBuffer.length === 64) startsWith02Or03 = '04' + startsWith02Or03;
    const pub = secp256k1.ProjectivePoint.fromHex(hexToUnit8Array(startsWith02Or03));
    return pub.toHex(false);
}

/**
 * generates the ethereum-adress of the publicKey
 * We create the checksum-adress which is case-sensitive
 * @returns {string} address
 */
export function toAddress(publicKey) {

    // normalize key
    publicKey = decompress(publicKey);

    const addressBuffer = pubToAddress(toBuffer(addLeading0x(publicKey)));
    const checkSumAdress = toChecksumAddress(addLeading0x(addressBuffer.toString('hex')));
    return checkSumAdress;
}
