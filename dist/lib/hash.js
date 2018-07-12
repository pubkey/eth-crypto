'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SIGN_PREFIX = undefined;
exports.keccak256 = keccak256;

var _solidity = require('ethers/utils/solidity.js');

function keccak256(params) {
    var types = [];
    var values = [];
    if (!Array.isArray(params)) {
        types.push('string');
        values.push(params);
    } else {
        params.forEach(function (p) {
            types.push(p.type);
            values.push(p.value);
        });
    }
    return (0, _solidity.keccak256)(types, values);
}

var SIGN_PREFIX = exports.SIGN_PREFIX = '\x19Ethereum Signed Message:\n32';