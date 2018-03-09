'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = sign;

var _secp256k = require('secp256k1');

var secp256k1 = _interopRequireWildcard(_secp256k);

var _util = require('./util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

/**
 * signs the given message
 * we do not use sign from eth-lib because the pure secp256k1-version is 90% faster
 * @param  {string} privateKey
 * @param  {string} hash
 * @return {string} hexString
 */
function sign(privateKey, hash) {
    hash = util.addTrailing0x(hash);
    if (hash.length !== 66) throw new Error('EthCrypto.sign(): Can only sign hashes, given: ' + hash);

    var sigObj = secp256k1.sign(new Buffer(util.removeTrailing0x(hash), 'hex'), new Buffer(util.removeTrailing0x(privateKey), 'hex'));

    var recoveryId = sigObj.recovery === 1 ? '1c' : '1b';

    var newSignature = '0x' + sigObj.signature.toString('hex') + recoveryId;
    return newSignature;
}