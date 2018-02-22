'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.solidityHash = solidityHash;
exports.signHash = signHash;

var _util = require('./util');

function solidityHash(str) {
    return _util.web3.utils.soliditySha3(str);
}

function signHash(str) {
    return _util.web3.eth.accounts.hashMessage(str);
}