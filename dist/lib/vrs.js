'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fromString = fromString;
exports.toString = toString;

var _account = require('eth-lib/lib/account');

/**
 * split signature-hex into parts
 * @param  {string} hexString
 * @return {{v: string, r: string, s: string}}
 */
function fromString(hexString) {
    var arr = (0, _account.decodeSignature)(hexString);
    return {
        v: arr[0],
        r: arr[1],
        s: arr[2]
    };
}

/**
 * merge signature-parts to one string
 * @param  {{v: string, r: string, s: string}} sig
 * @return {string} hexString
 */
function toString(sig) {
    var partsArray = [sig.v, sig.r, sig.s];
    return (0, _account.encodeSignature)(partsArray);
}