"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateContractAddress = calculateContractAddress;
var _util = require("@ethereumjs/util");
var _util2 = require("./util");
function calculateContractAddress(creatorAddress, nonce) {
  var addressBuffer = (0, _util.generateAddress)((0, _util.hexToBytes)((0, _util2.addLeading0x)(creatorAddress)), (0, _util.hexToBytes)((0, _util.intToHex)(nonce)));
  var address = (0, _util.bytesToHex)(addressBuffer);
  return (0, _util.toChecksumAddress)((0, _util2.addLeading0x)(address));
}