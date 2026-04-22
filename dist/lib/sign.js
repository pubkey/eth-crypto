"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sign = sign;
var _secp256k = require("ethereum-cryptography/secp256k1");
var _util = require("./util");
/**
 * signs the given message
 * @param  {string} privateKey
 * @param  {string} hash
 * @return {string} hexString
 */
function sign(privateKey, hash) {
  hash = (0, _util.addLeading0x)(hash);
  if (hash.length !== 66) throw new Error('EthCrypto.sign(): Can only sign hashes, given: ' + hash);
  var sig = _secp256k.secp256k1.sign(new Uint8Array(Buffer.from((0, _util.removeLeading0x)(hash), 'hex')), new Uint8Array(Buffer.from((0, _util.removeLeading0x)(privateKey), 'hex')));
  var recoveryId = sig.recovery === 1 ? '1c' : '1b';
  var newSignature = '0x' + Buffer.from(sig.toCompactRawBytes()).toString('hex') + recoveryId;
  return newSignature;
}