'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = sign;

var _secp256k = require('secp256k1');

var _util = require('./util');

/**
 * signs the given message
 * we do not use sign from eth-lib because the pure secp256k1-version is 90% faster
 * @param  {string} privateKey
 * @param  {string} hash
 * @return {string} hexString
 */
function sign(privateKey, hash) {
    hash = (0, _util.addTrailing0x)(hash);
    if (hash.length !== 66) throw new Error('EthCrypto.sign(): Can only sign hashes, given: ' + hash);

    var sigObj = (0, _secp256k.sign)(new Buffer((0, _util.removeTrailing0x)(hash), 'hex'), new Buffer((0, _util.removeTrailing0x)(privateKey), 'hex'));

    var recoveryId = sigObj.recovery === 1 ? '1c' : '1b';

    var newSignature = '0x' + sigObj.signature.toString('hex') + recoveryId;
    return newSignature;
}