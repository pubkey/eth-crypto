import {
    decrypt
} from 'eccrypto';
import {
    parse
} from './cipher';
import {
    removeTrailing0x
} from './util';

export default async function decryptWithPrivateKey(privateKey, encrypted) {

    encrypted = parse(encrypted);

    // remove trailing '0x' from privateKey
    const twoStripped = removeTrailing0x(privateKey);

    const encryptedBuffer = {
        iv: new Buffer(encrypted.iv, 'hex'),
        ephemPublicKey: new Buffer(encrypted.ephemPublicKey, 'hex'),
        ciphertext: new Buffer(encrypted.ciphertext, 'hex'),
        mac: new Buffer(encrypted.mac, 'hex')
    };


    return decrypt(
        new Buffer(twoStripped, 'hex'),
        encryptedBuffer
    ).then(decryptedBuffer => decryptedBuffer.toString());
}
