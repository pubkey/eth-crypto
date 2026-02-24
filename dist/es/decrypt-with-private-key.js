import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { decrypt as aesDecrypt } from 'ethereum-cryptography/aes';
import { sha512 } from '@noble/hashes/sha2.js';
import { hmac } from '@noble/hashes/hmac.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { concatBytes } from '@noble/hashes/utils.js';
import { parse } from './cipher';
import { removeLeading0x } from './util';
function equalBytes(a, b) {
  if (a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
export function decryptWithPrivateKey(_x, _x2) {
  return _decryptWithPrivateKey.apply(this, arguments);
}
function _decryptWithPrivateKey() {
  _decryptWithPrivateKey = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(privateKey, encrypted) {
    var twoStripped, privKeyBytes, ephemPubKey, iv, ciphertext, storedMac, sharedSecret, hash, encKey, macKey, dataToMac, computedMac, decrypted;
    return _regeneratorRuntime.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          encrypted = parse(encrypted);

          // remove trailing '0x' from privateKey
          twoStripped = removeLeading0x(privateKey); // strict Uint8Array wrappers required by @noble libraries
          privKeyBytes = new Uint8Array(Buffer.from(twoStripped, 'hex'));
          ephemPubKey = new Uint8Array(Buffer.from(encrypted.ephemPublicKey, 'hex'));
          iv = new Uint8Array(Buffer.from(encrypted.iv, 'hex'));
          ciphertext = new Uint8Array(Buffer.from(encrypted.ciphertext, 'hex'));
          storedMac = new Uint8Array(Buffer.from(encrypted.mac, 'hex')); // ECDH: shared secret = x-coordinate of privKey * ephemPubKey
          sharedSecret = secp256k1.getSharedSecret(privKeyBytes, ephemPubKey, true).slice(1); // 32 bytes
          // KDF: SHA-512 of shared secret
          hash = sha512(sharedSecret);
          encKey = hash.slice(0, 32);
          macKey = hash.slice(32); // verify MAC in constant time
          dataToMac = concatBytes(iv, ephemPubKey, ciphertext);
          computedMac = hmac(sha256, macKey, dataToMac);
          if (equalBytes(storedMac, computedMac)) {
            _context.next = 1;
            break;
          }
          throw new Error('Bad MAC');
        case 1:
          _context.next = 2;
          return aesDecrypt(ciphertext, encKey, iv, 'aes-256-cbc');
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