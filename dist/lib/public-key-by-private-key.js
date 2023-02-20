"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicKeyByPrivateKey = publicKeyByPrivateKey;
var _ethereumjsUtil = require("ethereumjs-util");
var _util = require("./util");
/**
 * Generate publicKey from the privateKey.
 * This creates the uncompressed publicKey,
 * where 04 has stripped from left
 * @returns {string}
 */
function publicKeyByPrivateKey(privateKey) {
  privateKey = (0, _util.addLeading0x)(privateKey);
  var publicKeyBuffer = (0, _ethereumjsUtil.privateToPublic)((0, _ethereumjsUtil.toBuffer)(privateKey));
  return publicKeyBuffer.toString('hex');
}