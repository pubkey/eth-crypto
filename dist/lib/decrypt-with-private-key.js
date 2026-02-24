"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decryptWithPrivateKey = decryptWithPrivateKey;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _secp256k = require("ethereum-cryptography/secp256k1");
var _aes = require("ethereum-cryptography/aes");
var _sha = require("@noble/hashes/sha2.js");
var _hmac = require("@noble/hashes/hmac.js");
var _utils = require("@noble/hashes/utils.js");
var _cipher = require("./cipher");
var _util = require("./util");
function equalBytes(a, b) {
  if (a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
function decryptWithPrivateKey(_x, _x2) {
  return _decryptWithPrivateKey.apply(this, arguments);
}
function _decryptWithPrivateKey() {
  _decryptWithPrivateKey = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(privateKey, encrypted) {
    var twoStripped, privKeyBytes, ephemPubKey, iv, ciphertext, storedMac, sharedSecret, hash, encKey, macKey, dataToMac, computedMac, decrypted;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          encrypted = (0, _cipher.parse)(encrypted);

          // remove trailing '0x' from privateKey
          twoStripped = (0, _util.removeLeading0x)(privateKey); // strict Uint8Array wrappers required by @noble libraries
          privKeyBytes = new Uint8Array(Buffer.from(twoStripped, 'hex'));
          ephemPubKey = new Uint8Array(Buffer.from(encrypted.ephemPublicKey, 'hex'));
          iv = new Uint8Array(Buffer.from(encrypted.iv, 'hex'));
          ciphertext = new Uint8Array(Buffer.from(encrypted.ciphertext, 'hex'));
          storedMac = new Uint8Array(Buffer.from(encrypted.mac, 'hex')); // ECDH: shared secret = x-coordinate of privKey * ephemPubKey
          sharedSecret = _secp256k.secp256k1.getSharedSecret(privKeyBytes, ephemPubKey, true).slice(1); // 32 bytes
          // KDF: SHA-512 of shared secret
          hash = (0, _sha.sha512)(sharedSecret);
          encKey = hash.slice(0, 32);
          macKey = hash.slice(32); // verify MAC in constant time
          dataToMac = (0, _utils.concatBytes)(iv, ephemPubKey, ciphertext);
          computedMac = (0, _hmac.hmac)(_sha.sha256, macKey, dataToMac);
          if (equalBytes(storedMac, computedMac)) {
            _context.next = 1;
            break;
          }
          throw new Error('Bad MAC');
        case 1:
          _context.next = 2;
          return (0, _aes.decrypt)(ciphertext, encKey, iv, 'aes-256-cbc');
        case 2:
          decrypted = _context.sent;
          return _context.abrupt("return", Buffer.from(decrypted).toString());
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _decryptWithPrivateKey.apply(this, arguments);
}