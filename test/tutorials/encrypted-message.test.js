/**
 * at this tests, we run the code which is used in the tutorials
 * to ensure they work as expected
 */
const ganache = require('ganache-cli');
const Web3 = require('web3');
const AsyncTestUtil = require('async-test-util');
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
            signature,
            sender: alice.publicKey
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
        const senderAddress = EthCrypto.addressByPublicKey(decryptedPayload.sender);
        // console.log('decryptedPayload:');
        // console.dir(decryptedPayload);

        // check signature
        const signer = EthCrypto.recover(
            decryptedPayload.signature,
            EthCrypto.hash.keccak256(payload.message)
        );
        if (signer !== senderAddress)
            throw new Error('signature not valid');

        /*        console.log(
                    'Got message from ' +
                    senderAddress +
                    ': "' +
                    decryptedPayload.message + '"'
                );
        */
        assert.equal(decryptedPayload.message, secretMessage);


        // answer
        const answerMessage = 'Roger dad';
        const answerSignature = EthCrypto.sign(
            bob.privateKey,
            EthCrypto.hash.keccak256(answerMessage)
        );
        const answerPayload = {
            message: answerMessage,
            signature: answerSignature,
            sender: bob.publicKey
        };
        const encryptedAnswer = await EthCrypto.encryptWithPublicKey(
            decryptedPayload.sender,
            JSON.stringify(answerPayload)
        );
        assert.ok(encryptedAnswer);
    });
});
