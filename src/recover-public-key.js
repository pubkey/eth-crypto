import {
    secp256k1
} from 'ethereum-cryptography/secp256k1';
import {
    removeLeading0x,
    hexToUnit8Array,
    uint8ArrayToHex
} from './util';


/**
 * returns the publicKey for the privateKey with which the messageHash was signed
 * @param  {string} signature
 * @param  {string} hash
 * @return {string} publicKey
 */
export function recoverPublicKey(signature, hash) {
    signature = removeLeading0x(signature);

    // split into v-value and sig
    const sigOnly = signature.substring(0, signature.length - 2); // all but last 2 chars
    const vValue = signature.slice(-2); // last 2 chars

    const recoveryNumber = vValue === '1c' ? 1 : 0;

    const point = secp256k1.Signature
        .fromCompact(hexToUnit8Array(sigOnly))
        .addRecoveryBit(recoveryNumber)
        .recoverPublicKey(hexToUnit8Array(removeLeading0x(hash)));

    let pubKey = uint8ArrayToHex(point.toRawBytes(false));

    // remove trailing '04'
    pubKey = pubKey.slice(2);

    return pubKey;
}
