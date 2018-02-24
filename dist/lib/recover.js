'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = recover;

var _account = require('eth-lib/lib/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * returns the adress with which the messageHash was signed
 * @param  {{v: string, r: string, s: string}} signature
 * @param  {string} hash
 * @return {string} address
 */
function recover(signature, hash) {
    var sig = _account2['default'].encodeSignature([signature.v, signature.r, signature.s]);
    return _account2['default'].recover(hash, sig);
}