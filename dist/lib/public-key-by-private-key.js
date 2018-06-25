'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = publicKeyOfPrivateKey;

var _ethereumjsUtil = require('ethereumjs-util');

var _util = require('./util');

/**
 * Generate publicKey from the privateKey.
 * This creates the uncompressed publicKey,
 * where 04 has stripped from left
 * @returns {string}
 */
function publicKeyOfPrivateKey(privateKey) {
    privateKey = (0, _util.addTrailing0x)(privateKey);
    var publicKeyBuffer = (0, _ethereumjsUtil.privateToPublic)(privateKey);
    return publicKeyBuffer.toString('hex');
}