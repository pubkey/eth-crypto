import * as secp256k1 from 'secp256k1';

import * as vrs from './vrs';
import * as util from './util';

/**
 * returns the publicKey for the privateKEy with which the messageHash was signed
 * @param  {string} signature
 * @param  {string} hash
 * @return {string} publicKey
 */
export default function recoverPublicKey(signature, hash) {
    var vals = vrs.fromString(signature);

    var sigOnly = signature.substring(0, signature.length - 1);
    sigOnly = util.removeTrailing0x(sigOnly);

    var recoveryNumber = vals.v === '0x1c' ? 1 : 0;

    var pubKey = secp256k1.recover(new Buffer(util.removeTrailing0x(hash), 'hex'), new Buffer(sigOnly, 'hex'), recoveryNumber, false).toString('hex');

    // remove trailing '04'
    pubKey = pubKey.slice(2);

    return pubKey;
}