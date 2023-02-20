"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sign = sign;
var _secp256k = require("secp256k1");
var _util = require("./util");
/**
 * signs the given message
 * we do not use sign from eth-lib because the pure secp256k1-version is 90% faster
 * @param  {string} privateKey
 * @param  {string} hash
 * @return {string} hexString
 */
function sign(privateKey, hash) {
  hash = (0, _util.addLeading0x)(hash);
  if (hash.length !== 66) throw new Error('EthCrypto.sign(): Can only sign hashes, given: ' + hash);
  var sigObj = (0, _secp256k.ecdsaSign)(new Uint8Array(Buffer.from((0, _util.removeLeading0x)(hash), 'hex')), new Uint8Array(Buffer.from((0, _util.removeLeading0x)(privateKey), 'hex')));
  var recoveryId = sigObj.recid === 1 ? '1c' : '1b';
  var newSignature = '0x' + Buffer.from(sigObj.signature).toString('hex') + recoveryId;
  return newSignature;
}