/**
 * at this tests, we run the code which is used in the tutorials
 * to ensure they work as expected
 */
const assert = require('assert');
const EthCrypto = require('../../dist/lib/index');

describe('encrypted-message.md', () => {
    it('run', async () => {
        const alice = EthCrypto.createIdentity();
        const bob = EthCrypto.createIdentity();

        const secretMessage = 'My name is Satoshi Buterin';
        const signature = EthCrypto.sign(
            alice.privateKey,
            EthCrypto.hash.keccak256(secretMessage)
        );

        const payload = {
            message: secretMessage,
            signature
        };
        const encrypted = await EthCrypto.encryptWithPublicKey(
            bob.publicKey,
            JSON.stringify(payload)
        );
        // console.log('encrypted:');
        // console.dir(encrypted);

        // decrypt
        const decrypted = await EthCrypto.decryptWithPrivateKey(
            bob.privateKey,
            encrypted
        );
        const decryptedPayload = JSON.parse(decrypted);

        // check signature
        const senderAddress = EthCrypto.recover(
            decryptedPayload.signature,
            EthCrypto.hash.keccak256(payload.message)
        );

        assert.equal(senderAddress, alice.address);
        assert.equal(decryptedPayload.message, secretMessage);

        // answer
        const answerMessage = 'Roger dad';
        const answerSignature = EthCrypto.sign(
            bob.privateKey,
            EthCrypto.hash.keccak256(answerMessage)
        );
        const answerPayload = {
            message: answerMessage,
            signature: answerSignature
        };

        const alicePublicKey = EthCrypto.recoverPublicKey(
            decryptedPayload.signature,
            EthCrypto.hash.keccak256(payload.message)
        );

        assert.equal(alicePublicKey, alice.publicKey);

        const encryptedAnswer = await EthCrypto.encryptWithPublicKey(
            alicePublicKey,
            JSON.stringify(answerPayload)
        );
        assert.ok(encryptedAnswer);
    });
});
