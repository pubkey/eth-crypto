import { encrypt } from 'eccrypto';
import { decompress } from './public-key';
export function encryptWithPublicKey(publicKey, message, opts) {
  // ensure its an uncompressed publicKey
  publicKey = decompress(publicKey);

  // re-add the compression-flag
  var pubString = '04' + publicKey;
  return encrypt(Buffer.from(pubString, 'hex'), Buffer.from(message), opts ? opts : {}).then(function (encryptedBuffers) {
    var encrypted = {
      iv: encryptedBuffers.iv.toString('hex'),
      ephemPublicKey: encryptedBuffers.ephemPublicKey.toString('hex'),
      ciphertext: encryptedBuffers.ciphertext.toString('hex'),
      mac: encryptedBuffers.mac.toString('hex')
    };
    return encrypted;
  });
}