import { compress, decompress } from './public-key';
export function stringify(cipher) {
  if (typeof cipher === 'string') return cipher;

  // use compressed key because it's smaller
  var compressedKey = compress(cipher.ephemPublicKey);
  var ret = Buffer.concat([Buffer.from(cipher.iv, 'hex'),
  // 16bit
  Buffer.from(compressedKey, 'hex'),
  // 33bit
  Buffer.from(cipher.mac, 'hex'),
  // 32bit
  Buffer.from(cipher.ciphertext, 'hex') // var bit
  ]);

  return ret.toString('hex');
}
export function parse(str) {
  if (typeof str !== 'string') return str;
  var buf = Buffer.from(str, 'hex');
  var ret = {
    iv: buf.toString('hex', 0, 16),
    ephemPublicKey: buf.toString('hex', 16, 49),
    mac: buf.toString('hex', 49, 81),
    ciphertext: buf.toString('hex', 81, buf.length)
  };

  // decompress publicKey
  ret.ephemPublicKey = '04' + decompress(ret.ephemPublicKey);
  return ret;
}