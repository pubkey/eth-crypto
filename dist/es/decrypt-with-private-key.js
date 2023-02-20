import { decrypt } from 'eccrypto';
import { parse } from './cipher';
import { removeLeading0x } from './util';
export function decryptWithPrivateKey(privateKey, encrypted) {
  encrypted = parse(encrypted);

  // remove trailing '0x' from privateKey
  var twoStripped = removeLeading0x(privateKey);
  var encryptedBuffer = {
    iv: Buffer.from(encrypted.iv, 'hex'),
    ephemPublicKey: Buffer.from(encrypted.ephemPublicKey, 'hex'),
    ciphertext: Buffer.from(encrypted.ciphertext, 'hex'),
    mac: Buffer.from(encrypted.mac, 'hex')
  };
  return decrypt(Buffer.from(twoStripped, 'hex'), encryptedBuffer).then(function (decryptedBuffer) {
    return decryptedBuffer.toString();
  });
}