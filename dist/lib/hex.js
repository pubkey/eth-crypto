"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compress = compress;
exports.decompress = decompress;
var _util = require("./util");
/**
 * compress/decompress hex-strings to utf16 or base64
 * thx @juvian
 * @link https://stackoverflow.com/a/40471908/3443137
 */

function compress(hex) {
  var base64 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  hex = (0, _util.removeLeading0x)(hex);

  // if base64:true, we use our own function because it results in a smaller output
  if (base64 === true) return Buffer.from(hex, 'hex').toString('base64');
  var string = '';
  while (hex.length % 4 != 0) {
    // we need it to be multiple of 4
    hex = '0' + hex;
  }
  for (var i = 0; i < hex.length; i += 4) {
    // get char from ascii code which goes from 0 to 65536
    string += String.fromCharCode(parseInt(hex.substring(i, i + 4), 16));
  }
  return string;
}
function decompress(compressedString) {
  var base64 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // if base64:true, we use our own function because it results in a smaller output
  if (base64 === true) {
    var ret = Buffer.from(compressedString, 'base64').toString('hex');
    return (0, _util.addLeading0x)(ret);
  }
  var hex = '';
  for (var i = 0; i < compressedString.length; i++) {
    // get character ascii code and convert to hexa string, adding necessary 0s
    hex += ((i == 0 ? '' : '000') + compressedString.charCodeAt(i).toString(16)).slice(-4);
  }
  hex = hex.toLowerCase();
  return (0, _util.addLeading0x)(hex);
}