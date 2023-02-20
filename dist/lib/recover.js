"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recover = recover;
var _recoverPublicKey = require("./recover-public-key");
var _publicKey = require("./public-key");
/**
 * returns the adress with which the messageHash was signed
 * @param  {string} sigString
 * @param  {string} hash
 * @return {string} address
 */
function recover(sigString, hash) {
  var pubkey = (0, _recoverPublicKey.recoverPublicKey)(sigString, hash);
  var address = (0, _publicKey.toAddress)(pubkey);
  return address;
}