"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicKeyByPrivateKey = publicKeyByPrivateKey;
var _util = require("@ethereumjs/util");
var _util2 = require("./util");
/**
 * Generate publicKey from the privateKey.
 * This creates the uncompressed publicKey,
 * where 04 has stripped from left
 * @returns {string}
 */
function publicKeyByPrivateKey(privateKey) {
  privateKey = (0, _util2.addLeading0x)(privateKey);
  var publicKeyBuffer = (0, _util.privateToPublic)((0, _util.hexToBytes)(privateKey));
  var ret = (0, _util2.removeLeading0x)((0, _util.bytesToHex)(publicKeyBuffer));
  return ret;
}