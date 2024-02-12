import { secp256k1 } from '@noble/curves/secp256k1';
import {
    removeLeading0x,
    hexToUnit8Array,
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
    const sig = secp256k1.Signature.fromCompact(hexToUnit8Array(sigOnly)).addRecoveryBit(recoveryNumber);
    let pubKey = sig.recoverPublicKey(hexToUnit8Array(removeLeading0x(hash))).toHex(false);
    // remove trailing '04'
    pubKey = pubKey.slice(2);
    return pubKey;
}
