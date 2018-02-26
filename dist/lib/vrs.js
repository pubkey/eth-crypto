'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fromString = fromString;
exports.toString = toString;

var _account = require('eth-lib/lib/account');

var _account2 = _interopRequireDefault(_account);

var _bytes = require('eth-lib/lib/bytes');

var _bytes2 = _interopRequireDefault(_bytes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * split signature-hex into parts
 * @param  {string} hexString
 * @return {{v: string, r: string, s: string}}
 */
function fromString(hexString) {
    var arr = _account2['default'].decodeSignature(hexString);
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
    return _account2['default'].encodeSignature(partsArray);
}