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

});
