"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compress = compress;
exports.decompress = decompress;
exports.toAddress = toAddress;
var _secp256k = require("secp256k1");
var _ethereumjsUtil = require("ethereumjs-util");
var _util = require("./util");
function compress(startsWith04) {
  // add trailing 04 if not done before
  var testBuffer = Buffer.from(startsWith04, 'hex');
  if (testBuffer.length === 64) startsWith04 = '04' + startsWith04;
  return (0, _util.uint8ArrayToHex)((0, _secp256k.publicKeyConvert)((0, _util.hexToUnit8Array)(startsWith04), true));
}
function decompress(startsWith02Or03) {
  // if already decompressed an not has trailing 04
  var testBuffer = Buffer.from(startsWith02Or03, 'hex');
  if (testBuffer.length === 64) startsWith02Or03 = '04' + startsWith02Or03;
  var decompressed = (0, _util.uint8ArrayToHex)((0, _secp256k.publicKeyConvert)((0, _util.hexToUnit8Array)(startsWith02Or03), false));

  // remove trailing 04
  decompressed = decompressed.substring(2);
  return decompressed;
}

/**
 * generates the ethereum-adress of the publicKey
 * We create the checksum-adress which is case-sensitive
 * @returns {string} address
 */
function toAddress(publicKey) {
  // normalize key
  publicKey = decompress(publicKey);
  var addressBuffer = (0, _ethereumjsUtil.pubToAddress)((0, _ethereumjsUtil.toBuffer)((0, _util.addLeading0x)(publicKey)));
  var checkSumAdress = (0, _ethereumjsUtil.toChecksumAddress)((0, _util.addLeading0x)(addressBuffer.toString('hex')));
  return checkSumAdress;
}