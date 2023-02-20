"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateContractAddress = calculateContractAddress;
var _ethereumjsUtil = require("ethereumjs-util");
var _util = require("./util");
function calculateContractAddress(creatorAddress, nonce) {
  var addressBuffer = (0, _ethereumjsUtil.generateAddress)((0, _ethereumjsUtil.toBuffer)((0, _util.addLeading0x)(creatorAddress)), (0, _ethereumjsUtil.toBuffer)(nonce));
  var address = addressBuffer.toString('hex');
  return (0, _ethereumjsUtil.toChecksumAddress)((0, _util.addLeading0x)(address));
}