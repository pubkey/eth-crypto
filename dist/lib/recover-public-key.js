'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = recoverPublicKey;

var _account = require('eth-lib/lib/account');

var _bytes = require('eth-lib/lib/bytes');

var _bytes2 = _interopRequireDefault(_bytes);

var _vrs = require('./vrs');

var vrs = _interopRequireWildcard(_vrs);

var _elliptic = require('elliptic');

var _elliptic2 = _interopRequireDefault(_elliptic);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var secp256k1 = new _elliptic2['default'].ec('secp256k1');

/**
 * returns the publicKey for the privateKEy with which the messageHash was signed
 * @param  {string} signature
 * @param  {string} hash
 * @return {string} publicKey
 */
function recoverPublicKey(signature, hash) {
    // parse signature
    var vals = vrs.fromString(signature);
    var vrsOfSig = {
        v: _bytes2['default'].toNumber(vals.v),
        r: vals.r.slice(2),
        s: vals.s.slice(2)
    };

    // because odd vals mean v=0... sadly that means v=0 means v=1... I hate that
    var ecPublicKey = secp256k1.recoverPubKey(new Buffer(hash.slice(2), 'hex'), vrsOfSig, vrsOfSig.v < 2 ? vrsOfSig.v : 1 - vrsOfSig.v % 2);

    var publicKey = ecPublicKey.encode('hex', false).slice(2);
    return publicKey;
}