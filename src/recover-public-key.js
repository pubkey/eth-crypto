import {
    ecdsaRecover
} from 'secp256k1';
import {
    removeTrailing0x,
    hexToUnit8Array,
    uint8ArrayToHex
} from './util';


/**
 * returns the publicKey for the privateKey with which the messageHash was signed
 * @param  {string} signature
 * @param  {string} hash
 * @return {string} publicKey
 */
export default function recoverPublicKey(signature, hash) {
    signature = removeTrailing0x(signature);

    // split into v-value and sig
    const sigOnly = signature.substring(0, signature.length - 2); // all but last 2 chars
    const vValue = signature.slice(-2); // last 2 chars

    const recoveryNumber = vValue === '1c' ? 1 : 0;

    let pubKey = uint8ArrayToHex(ecdsaRecover(
        hexToUnit8Array(sigOnly),
        recoveryNumber,
        hexToUnit8Array(removeTrailing0x(hash)),
        false
    ));

    // remove trailing '04'
    pubKey = pubKey.slice(2);

    return pubKey;
}
