import { publicKeyConvert } from 'secp256k1';
import { pubToAddress, toChecksumAddress, toBuffer } from 'ethereumjs-util';
import { hexToUnit8Array, uint8ArrayToHex, addLeading0x } from './util';
export function compress(startsWith04) {
  // add trailing 04 if not done before
  var testBuffer = Buffer.from(startsWith04, 'hex');
  if (testBuffer.length === 64) startsWith04 = '04' + startsWith04;
  return uint8ArrayToHex(publicKeyConvert(hexToUnit8Array(startsWith04), true));
}
export function decompress(startsWith02Or03) {
  // if already decompressed an not has trailing 04
  var testBuffer = Buffer.from(startsWith02Or03, 'hex');
  if (testBuffer.length === 64) startsWith02Or03 = '04' + startsWith02Or03;
  var decompressed = uint8ArrayToHex(publicKeyConvert(hexToUnit8Array(startsWith02Or03), false));

  // remove trailing 04
  decompressed = decompressed.substring(2);
  return decompressed;
}

/**
 * generates the ethereum-adress of the publicKey
 * We create the checksum-adress which is case-sensitive
 * @returns {string} address
 */
export function toAddress(publicKey) {
  // normalize key
  publicKey = decompress(publicKey);
  var addressBuffer = pubToAddress(toBuffer(addLeading0x(publicKey)));
  var checkSumAdress = toChecksumAddress(addLeading0x(addressBuffer.toString('hex')));
  return checkSumAdress;
}