import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { encrypt as aesEncrypt } from 'ethereum-cryptography/aes';
import { sha512 } from '@noble/hashes/sha2.js';
import { hmac } from '@noble/hashes/hmac.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { randomBytes, concatBytes } from '@noble/hashes/utils.js';
import { decompress } from './public-key';
export function encryptWithPublicKey(_x, _x2, _x3) {
  return _encryptWithPublicKey.apply(this, arguments);
}
function _encryptWithPublicKey() {
  _encryptWithPublicKey = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(publicKey, message, opts) {
    var pubKeyBytes, ephemPrivKey, ephemPubKey, sharedSecret, hash, encKey, macKey, iv, msgBytes, ciphertext, dataToMac, mac, _t, _t2;
    return _regeneratorRuntime.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // ensure its an uncompressed publicKey
          publicKey = decompress(publicKey);

          // re-add the compression-flag and convert to Uint8Array (noble requires strict Uint8Array)
          pubKeyBytes = new Uint8Array(Buffer.from('04' + publicKey, 'hex'));
          opts = opts || {};

          // generate ephemeral key pair
          ephemPrivKey = opts.ephemPrivateKey ? new Uint8Array(Buffer.from(opts.ephemPrivateKey)) : randomBytes(32);
          while (!secp256k1.utils.isValidPrivateKey(ephemPrivKey)) {
            ephemPrivKey = randomBytes(32);
          }
          ephemPubKey = secp256k1.getPublicKey(ephemPrivKey, false); // 65-byte uncompressed
          // ECDH: shared secret = x-coordinate of ephemPrivKey * recipientPubKey
          sharedSecret = secp256k1.getSharedSecret(ephemPrivKey, pubKeyBytes, true).slice(1); // 32 bytes
          // KDF: SHA-512 of shared secret
          hash = sha512(sharedSecret);
          encKey = hash.slice(0, 32);
          macKey = hash.slice(32);
          iv = opts.iv ? new Uint8Array(Buffer.from(opts.iv)) : randomBytes(16);
          msgBytes = new Uint8Array(Buffer.from(message)); // aesEncrypt uses WebCrypto and returns a Promise
          _t = Uint8Array;
          _context.next = 1;
          return aesEncrypt(msgBytes, encKey, iv, 'aes-256-cbc');
        case 1:
          _t2 = _context.sent;
          ciphertext = new _t(_t2);
          // MAC = HMAC-SHA256(macKey, IV || ephemPubKey || ciphertext)
          dataToMac = concatBytes(iv, ephemPubKey, ciphertext);
          mac = hmac(sha256, macKey, dataToMac);
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