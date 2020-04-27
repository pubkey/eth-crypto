import { decrypt } from 'eccrypto';
import { parse } from './cipher';
import { removeTrailing0x } from './util';

export default function decryptWithPrivateKey(privateKey, encrypted) {

    encrypted = parse(encrypted);

    // remove trailing '0x' from privateKey
    var twoStripped = removeTrailing0x(privateKey);

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