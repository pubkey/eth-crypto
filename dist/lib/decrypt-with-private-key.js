"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decryptWithPrivateKey = decryptWithPrivateKey;
var _eccrypto = require("eccrypto");
var _cipher = require("./cipher");
var _util = require("./util");
function decryptWithPrivateKey(privateKey, encrypted) {
  encrypted = (0, _cipher.parse)(encrypted);

  // remove trailing '0x' from privateKey
  var twoStripped = (0, _util.removeLeading0x)(privateKey);
  var encryptedBuffer = {
    iv: Buffer.from(encrypted.iv, 'hex'),
    ephemPublicKey: Buffer.from(encrypted.ephemPublicKey, 'hex'),
    ciphertext: Buffer.from(encrypted.ciphertext, 'hex'),
    mac: Buffer.from(encrypted.mac, 'hex')
  };
  return (0, _eccrypto.decrypt)(Buffer.from(twoStripped, 'hex'), encryptedBuffer).then(function (decryptedBuffer) {
    return decryptedBuffer.toString();
  });
}