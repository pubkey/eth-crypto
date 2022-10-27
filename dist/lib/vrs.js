"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromString = fromString;
exports.toString = toString;
var _ethers = require("ethers");
/**
 * split signature-hex into parts
 * @param  {string} hexString
 * @return {{v: string, r: string, s: string}}
 */
function fromString(hexString) {
  var arr = _ethers.utils.splitSignature(hexString);
  return {
    // convert "v" to hex
    v: "0x".concat(arr.v.toString(16)),
    r: arr.r,
    s: arr.s
  };
}

/**
 * merge signature-parts to one string
 * @param  {{v: string, r: string, s: string}} sig
 * @return {string} hexString
 */
function toString(sig) {
  return _ethers.utils.joinSignature(sig);
}