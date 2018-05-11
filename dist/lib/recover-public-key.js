'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = recoverPublicKey;

var _secp256k = require('secp256k1');

var _util = require('./util');

/**
 * returns the publicKey for the privateKey with which the messageHash was signed
 * @param  {string} signature
 * @param  {string} hash
 * @return {string} publicKey
 */
function recoverPublicKey(signature, hash) {
    signature = (0, _util.removeTrailing0x)(signature);

    // split into v-value and sig
    var sigOnly = signature.substring(0, signature.length - 2); // all but last 2 chars
    var vValue = signature.slice(-2); // last 2 chars

    var recoveryNumber = vValue === '1c' ? 1 : 0;

    var pubKey = (0, _secp256k.recover)(new Buffer((0, _util.removeTrailing0x)(hash), 'hex'), new Buffer(sigOnly, 'hex'), recoveryNumber, false).toString('hex');

    // remove trailing '04'
    pubKey = pubKey.slice(2);

    return pubKey;
}