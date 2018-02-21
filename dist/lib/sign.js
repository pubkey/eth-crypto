'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = sign;

var _util = require('./util');

/**
 * signs the given message
 * @param  {string} privateKey
 * @param  {string} message
 * @return {{v: string, r: string, s: string}} signature
 */
function sign(privateKey, message) {
    var account = _util.web3.eth.accounts.privateKeyToAccount(privateKey);
    var sig = account.sign(message);
    var ret = {
        v: sig.v,
        r: sig.r,
        s: sig.s
    };
    return ret;
}