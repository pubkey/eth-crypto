import {
    recover
} from 'secp256k1';

import * as vrs from './vrs';
import {
    removeTrailing0x
} from './util';


/**
 * returns the publicKey for the privateKey with which the messageHash was signed
 * @param  {string} signature
 * @param  {string} hash
 * @return {string} publicKey
 */
export default function recoverPublicKey(signature, hash) {
    const vals = vrs.fromString(signature);


    let sigOnly = signature.substring(0, signature.length - 1);
    sigOnly = removeTrailing0x(sigOnly);

    const recoveryNumber = vals.v === '0x1c' ? 1 : 0;

    let pubKey = recover(
        new Buffer(removeTrailing0x(hash), 'hex'),
        new Buffer(sigOnly, 'hex'),
        recoveryNumber,
        false
    ).toString('hex');

    // remove trailing '04'
    pubKey = pubKey.slice(2);

    return pubKey;
}
