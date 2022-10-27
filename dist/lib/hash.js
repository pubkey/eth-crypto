"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIGN_PREFIX = void 0;
exports.keccak256 = keccak256;
var _ethers = require("ethers");
function keccak256(params) {
  var types = [];
  var values = [];
  if (!Array.isArray(params)) {
    types.push('string');
    values.push(params);
  } else {
    params.forEach(function (p) {
      types.push(p.type);
      values.push(p.value);
    });
  }
  return _ethers.utils.solidityKeccak256(types, values);
}
var SIGN_PREFIX = '\x19Ethereum Signed Message:\n32';
exports.SIGN_PREFIX = SIGN_PREFIX;