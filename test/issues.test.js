// const AsyncTestUtil = require('async-test-util');
const assert = require('assert');
const EthCrypto = require('../dist/lib/index');

describe('issues.test.js', () => {
    it('#3 Error in recover', async () => {
        const payload = {
            data: 'something',
            val: 5,
            other: 'something else'
        };
        const msgHash = EthCrypto.hash.keccak256(JSON.stringify(payload));
        const ident = EthCrypto.createIdentity();

        const sig = EthCrypto.sign(
            ident.privateKey, // privateKey
            msgHash // hash of message
        );
        assert.ok(sig);
        assert.ok(sig.startsWith('0x'));

        const recAddress = EthCrypto.recover(
            sig,
            EthCrypto.hash.keccak256(JSON.stringify(payload)) // signed message hash
        );
        assert.equal(recAddress, ident.address);

        const recKey = EthCrypto.recoverPublicKey(
            sig,
            EthCrypto.hash.keccak256(JSON.stringify(payload)) // signed message hash
        );
        assert.equal(recKey, ident.publicKey);
    });
    it('#3 issuecommet-387616789', () => {
        const message = 'foobar';
        const messageHash = EthCrypto.hash.keccak256(message);
        const signature = EthCrypto.sign(
            '0x107be946709e41b7895eea9f2dacf998a0a9124acbb786f0fd1a826101581a07', // privateKey
            messageHash // hash of message
        );
        const signer = EthCrypto.recover(
            signature,
            messageHash
        );
        assert.ok(signer);
    });
});
