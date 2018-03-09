'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = recoverPublicKey;

var _secp256k = require('secp256k1');

var secp256k1 = _interopRequireWildcard(_secp256k);

var _vrs = require('./vrs');

var vrs = _interopRequireWildcard(_vrs);

var _util = require('./util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

/**
 * returns the publicKey for the privateKEy with which the messageHash was signed
 * @param  {string} signature
 * @param  {string} hash
 * @return {string} publicKey
 */
function recoverPublicKey(signature, hash) {
    var vals = vrs.fromString(signature);

    var sigOnly = signature.substring(0, signature.length - 1);
    sigOnly = util.removeTrailing0x(sigOnly);

    var recoveryNumber = vals.v === '0x1c' ? 1 : 0;

    var pubKey = secp256k1.recover(new Buffer(util.removeTrailing0x(hash), 'hex'), new Buffer(sigOnly, 'hex'), recoveryNumber, false).toString('hex');

    // remove trailing '04'
    pubKey = pubKey.slice(2);

    return pubKey;
}