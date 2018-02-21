'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = recover;

var _util = require('./util');

/**
 * returns the adress with which the messageHash was signed
 * @param  {{v: string, r: string, s: string}} signature
 * @param  {string} message
 * @return {string} address
 */
function recover(signature, message) {
    var address = _util.web3.eth.accounts.recover(message, signature.v, signature.r, signature.s);
    return address;
}