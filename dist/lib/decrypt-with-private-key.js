'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = decryptWithPrivateKey;

var _eccrypto = require('eccrypto');

var _cipher = require('./cipher');

var _util = require('./util');

function decryptWithPrivateKey(privateKey, encrypted) {

    encrypted = (0, _cipher.parse)(encrypted);

    // remove trailing '0x' from privateKey
    var twoStripped = (0, _util.removeTrailing0x)(privateKey);

    var encryptedBuffer = {
        iv: new Buffer(encrypted.iv, 'hex'),
        ephemPublicKey: new Buffer(encrypted.ephemPublicKey, 'hex'),
        ciphertext: new Buffer(encrypted.ciphertext, 'hex'),
        mac: new Buffer(encrypted.mac, 'hex')
    };

    return (0, _eccrypto.decrypt)(new Buffer(twoStripped, 'hex'), encryptedBuffer).then(function (decryptedBuffer) {
        return decryptedBuffer.toString();
    });
}