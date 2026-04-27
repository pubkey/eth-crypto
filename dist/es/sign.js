import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { addLeading0x, removeLeading0x } from './util';

/**
 * signs the given message
 * @param  {string} privateKey
 * @param  {string} hash
 * @return {string} hexString
 */
export function sign(privateKey, hash) {
  hash = addLeading0x(hash);
  if (hash.length !== 66) throw new Error('EthCrypto.sign(): Can only sign hashes, given: ' + hash);
  var sig = secp256k1.sign(new Uint8Array(Buffer.from(removeLeading0x(hash), 'hex')), new Uint8Array(Buffer.from(removeLeading0x(privateKey), 'hex')));
  var recoveryId = sig.recovery === 1 ? '1c' : '1b';
  var newSignature = '0x' + Buffer.from(sig.toCompactRawBytes()).toString('hex') + recoveryId;
  return newSignature;
}