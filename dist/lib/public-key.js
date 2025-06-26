"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compress = compress;
exports.decompress = decompress;
exports.toAddress = toAddress;
var _secp256k = require("secp256k1");
var _util = require("@ethereumjs/util");
var _util2 = require("./util");
function compress(startsWith04) {
  // add trailing 04 if not done before
  var testBuffer = Buffer.from(startsWith04, 'hex');
  if (testBuffer.length === 64) startsWith04 = '04' + startsWith04;
  return (0, _util2.uint8ArrayToHex)((0, _secp256k.publicKeyConvert)((0, _util2.hexToUnit8Array)(startsWith04), true));
}
function decompress(startsWith02Or03) {
  // if already decompressed an not has trailing 04
  var testBuffer = Buffer.from(startsWith02Or03, 'hex');
  if (testBuffer.length === 64) startsWith02Or03 = '04' + startsWith02Or03;
  var decompressed = (0, _util2.uint8ArrayToHex)((0, _secp256k.publicKeyConvert)((0, _util2.hexToUnit8Array)(startsWith02Or03), false));

  // remove trailing 04
  decompressed = decompressed.substring(2);
  return decompressed;
}

/**
 * generates the ethereum-address of the publicKey
 * We create the checksum-address which is case-sensitive
 * @returns {string} address
 */
function toAddress(publicKey) {
  // normalize key
  publicKey = decompress(publicKey);
  publicKey = (0, _util2.addLeading0x)(publicKey);
  var addressBuffer = (0, _util.pubToAddress)((0, _util.hexToBytes)(publicKey));
  var address = (0, _util.bytesToHex)(addressBuffer);
  var checkSumAdress = (0, _util.toChecksumAddress)((0, _util2.addLeading0x)(address));
  return checkSumAdress;
}