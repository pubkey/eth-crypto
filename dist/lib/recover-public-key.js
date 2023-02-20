"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recoverPublicKey = recoverPublicKey;
var _secp256k = require("secp256k1");
var _util = require("./util");
/**
 * returns the publicKey for the privateKey with which the messageHash was signed
 * @param  {string} signature
 * @param  {string} hash
 * @return {string} publicKey
 */
function recoverPublicKey(signature, hash) {
  signature = (0, _util.removeLeading0x)(signature);

  // split into v-value and sig
  var sigOnly = signature.substring(0, signature.length - 2); // all but last 2 chars
  var vValue = signature.slice(-2); // last 2 chars

  var recoveryNumber = vValue === '1c' ? 1 : 0;
  var pubKey = (0, _util.uint8ArrayToHex)((0, _secp256k.ecdsaRecover)((0, _util.hexToUnit8Array)(sigOnly), recoveryNumber, (0, _util.hexToUnit8Array)((0, _util.removeLeading0x)(hash)), false));

  // remove trailing '04'
  pubKey = pubKey.slice(2);
  return pubKey;
}