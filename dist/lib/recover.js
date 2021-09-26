"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = recover;

var _recoverPublicKey = _interopRequireDefault(require("./recover-public-key"));

var _publicKey = require("./public-key");

/**
 * returns the adress with which the messageHash was signed
 * @param  {string} sigString
 * @param  {string} hash
 * @return {string} address
 */
function recover(sigString, hash) {
  var pubkey = (0, _recoverPublicKey["default"])(sigString, hash);
  var address = (0, _publicKey.toAddress)(pubkey);
  return address;
}