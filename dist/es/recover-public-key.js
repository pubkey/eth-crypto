import { ecdsaRecover } from 'secp256k1';
import { removeLeading0x, hexToUnit8Array, uint8ArrayToHex } from './util';

/**
 * returns the publicKey for the privateKey with which the messageHash was signed
 * @param  {string} signature
 * @param  {string} hash
 * @return {string} publicKey
 */
export function recoverPublicKey(signature, hash) {
  signature = removeLeading0x(signature);

  // split into v-value and sig
  var sigOnly = signature.substring(0, signature.length - 2); // all but last 2 chars
  var vValue = signature.slice(-2); // last 2 chars

  var recoveryNumber = vValue === '1c' ? 1 : 0;
  var pubKey = uint8ArrayToHex(ecdsaRecover(hexToUnit8Array(sigOnly), recoveryNumber, hexToUnit8Array(removeLeading0x(hash)), false));

  // remove trailing '04'
  pubKey = pubKey.slice(2);
  return pubKey;
}