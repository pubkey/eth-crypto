/**
 * at this tests, we run the code which is used in the tutorials
 * to ensure they work as expected
 */
const ganache = require('ganache-cli');
const Web3 = require('web3');
const AsyncTestUtil = require('async-test-util');
const assert = require('assert');
const EthCrypto = require('../../dist/lib/index');

describe('encrypted-data.md', () => {
    it('run', async () => {
        const senderIdentity = EthCrypto.createIdentity();
        const receiverIdentity = EthCrypto.createIdentity();

        const secretMessage = 'My name is satoshi buterin';
        const messageHash = EthCrypto.hash.keccak256(secretMessage);

        const signature = EthCrypto.sign(
            senderIdentity.privateKey,
            messageHash
        );

        const payload = {
            message: secretMessage,
            signature
        };
        const encrypted = await EthCrypto.encryptWithPublicKey(
            receiverIdentity.publicKey,
            JSON.stringify(payload)
        );

        // decrypt
        const decrypted = await EthCrypto.decryptWithPrivateKey(
            receiverIdentity.privateKey,
            encrypted
        );
        const decryptedPayload = JSON.parse(decrypted);

        // check signature
        const signer = EthCrypto.recover(
            decryptedPayload.signature,
            EthCrypto.hash.keccak256(payload.message)
        );
        if (signer !== senderIdentity.address)
            throw new Error('signature not valid');

    });
});
