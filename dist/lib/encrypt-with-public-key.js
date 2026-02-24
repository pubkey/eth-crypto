"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encryptWithPublicKey = encryptWithPublicKey;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _secp256k = require("ethereum-cryptography/secp256k1");
var _aes = require("ethereum-cryptography/aes");
var _sha = require("@noble/hashes/sha2.js");
var _hmac = require("@noble/hashes/hmac.js");
var _utils = require("@noble/hashes/utils.js");
var _publicKey = require("./public-key");
function encryptWithPublicKey(_x, _x2, _x3) {
  return _encryptWithPublicKey.apply(this, arguments);
}
function _encryptWithPublicKey() {
  _encryptWithPublicKey = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(publicKey, message, opts) {
    var pubKeyBytes, ephemPrivKey, ephemPubKey, sharedSecret, hash, encKey, macKey, iv, msgBytes, ciphertext, dataToMac, mac, _t, _t2;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // ensure its an uncompressed publicKey
          publicKey = (0, _publicKey.decompress)(publicKey);

          // re-add the compression-flag and convert to Uint8Array (noble requires strict Uint8Array)
          pubKeyBytes = new Uint8Array(Buffer.from('04' + publicKey, 'hex'));
          opts = opts || {};

          // generate ephemeral key pair
          ephemPrivKey = opts.ephemPrivateKey ? new Uint8Array(Buffer.from(opts.ephemPrivateKey)) : (0, _utils.randomBytes)(32);
          while (!_secp256k.secp256k1.utils.isValidPrivateKey(ephemPrivKey)) {
            ephemPrivKey = (0, _utils.randomBytes)(32);
          }
          ephemPubKey = _secp256k.secp256k1.getPublicKey(ephemPrivKey, false); // 65-byte uncompressed
          // ECDH: shared secret = x-coordinate of ephemPrivKey * recipientPubKey
          sharedSecret = _secp256k.secp256k1.getSharedSecret(ephemPrivKey, pubKeyBytes, true).slice(1); // 32 bytes
          // KDF: SHA-512 of shared secret
          hash = (0, _sha.sha512)(sharedSecret);
          encKey = hash.slice(0, 32);
          macKey = hash.slice(32);
          iv = opts.iv ? new Uint8Array(Buffer.from(opts.iv)) : (0, _utils.randomBytes)(16);
          msgBytes = new Uint8Array(Buffer.from(message)); // aesEncrypt uses WebCrypto and returns a Promise
          _t = Uint8Array;
          _context.next = 1;
          return (0, _aes.encrypt)(msgBytes, encKey, iv, 'aes-256-cbc');
        case 1:
          _t2 = _context.sent;
          ciphertext = new _t(_t2);
          // MAC = HMAC-SHA256(macKey, IV || ephemPubKey || ciphertext)
          dataToMac = (0, _utils.concatBytes)(iv, ephemPubKey, ciphertext);
          mac = (0, _hmac.hmac)(_sha.sha256, macKey, dataToMac);
          return _context.abrupt("return", {
            iv: Buffer.from(iv).toString('hex'),
            ephemPublicKey: Buffer.from(ephemPubKey).toString('hex'),
            ciphertext: Buffer.from(ciphertext).toString('hex'),
            mac: Buffer.from(mac).toString('hex')
          });
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _encryptWithPublicKey.apply(this, arguments);
}