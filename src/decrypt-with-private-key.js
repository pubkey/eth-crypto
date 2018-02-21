import eccrypto from 'eccrypto';

export default async function decryptWithPrivateKey(privateKey, encrypted) {

    // remove trailing '0x' from privateKey
    const twoStripped = privateKey.replace(/^.{2}/g, '');

    const encryptedBuffer = {
        iv: new Buffer(encrypted.iv, 'hex'),
        ephemPublicKey: new Buffer(encrypted.ephemPublicKey, 'hex'),
        ciphertext: new Buffer(encrypted.ciphertext, 'hex'),
        mac: new Buffer(encrypted.mac, 'hex')
    };

    const decryptedBuffer = await eccrypto.decrypt(
        new Buffer(twoStripped, 'hex'),
        encryptedBuffer
    );
    return decryptedBuffer.toString();
}
