import eccrypto from 'eccrypto';
import {
    decompress
} from './public-key';

export default async function encryptWithPublicKey(publicKey, message) {

    // ensure its an uncompressed publicKey
    publicKey = decompress(publicKey);

    // re-add the compression-flag
    const pubString = '04' + publicKey;

    const encryptedBuffers = await eccrypto.encrypt(
        new Buffer(pubString, 'hex'),
        Buffer(message)
    );

    const encrypted = {
        iv: encryptedBuffers.iv.toString('hex'),
        ephemPublicKey: encryptedBuffers.ephemPublicKey.toString('hex'),
        ciphertext: encryptedBuffers.ciphertext.toString('hex'),
        mac: encryptedBuffers.mac.toString('hex')
    };
    return encrypted;
}
