import { decodeSignature, toChecksum } from 'eth-lib/lib/account';
import Bytes from 'eth-lib/lib/bytes';
import * as vrs from './vrs';

import elliptic from 'elliptic';
var secp256k1 = new elliptic.ec('secp256k1');

/**
 * returns the publicKey for the privateKEy with which the messageHash was signed
 * @param  {string} signature
 * @param  {string} hash
 * @return {string} publicKey
 */
export default function recoverPublicKey(signature, hash) {
    // parse signature
    var vals = vrs.fromString(signature);
    var vrsOfSig = {
        v: Bytes.toNumber(vals.v),
        r: vals.r.slice(2),
        s: vals.s.slice(2)
    };

    // because odd vals mean v=0... sadly that means v=0 means v=1... I hate that
    var ecPublicKey = secp256k1.recoverPubKey(new Buffer(hash.slice(2), 'hex'), vrsOfSig, vrsOfSig.v < 2 ? vrsOfSig.v : 1 - vrsOfSig.v % 2);

    var publicKey = ecPublicKey.encode('hex', false).slice(2);
    return publicKey;
}