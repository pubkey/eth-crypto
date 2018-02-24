'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = sign;

var _account = require('eth-lib/lib/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * signs the given message
 * @param  {string} privateKey
 * @param  {string} hash
 * @return {{v: string, r: string, s: string}} signature
 */
function sign(privateKey, hash) {
    var signature = _account2['default'].sign(hash, privateKey);
    var vrs = _account2['default'].decodeSignature(signature);
    var ret = {
        v: vrs[0],
        r: vrs[1],
        s: vrs[2]
    };
    return ret;
}