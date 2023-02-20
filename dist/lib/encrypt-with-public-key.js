"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encryptWithPublicKey = encryptWithPublicKey;
var _eccrypto = require("eccrypto");
var _publicKey = require("./public-key");
function encryptWithPublicKey(publicKey, message, opts) {
  // ensure its an uncompressed publicKey
  publicKey = (0, _publicKey.decompress)(publicKey);

  // re-add the compression-flag
  var pubString = '04' + publicKey;
  return (0, _eccrypto.encrypt)(Buffer.from(pubString, 'hex'), Buffer.from(message), opts ? opts : {}).then(function (encryptedBuffers) {
    var encrypted = {
      iv: encryptedBuffers.iv.toString('hex'),
      ephemPublicKey: encryptedBuffers.ephemPublicKey.toString('hex'),
      ciphertext: encryptedBuffers.ciphertext.toString('hex'),
      mac: encryptedBuffers.mac.toString('hex')
    };
    return encrypted;
  });
}