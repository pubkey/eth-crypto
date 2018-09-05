const AsyncTestUtil = require('async-test-util');
const assert = require('assert');
const EthCrypto = require('../dist/lib/index');

/**
 * If you have found a bug, edit this test to reproduce it
 * You can run it with: 'npm run test:node'
 * If you have successfully reproduced it, make a pull request with this file
 */
describe('bug-template.test.js', () => {
    it('should reproduce the bug', () => {
        const testData = {
            address: '0x3f243FdacE01Cfd9719f7359c94BA11361f32471',
            privateKey: '0x107be946709e41b7895eea9f2dacf998a0a9124acbb786f0fd1a826101581a07',
            publicKey: 'bf1cc3154424dc22191941d9f4f50b063a2b663a2337e5548abea633c1d06eceacf2b81dd326d278cd992d5e03b0df140f2df389ac9a1c2415a220a4a9e8c046'
        };
        
        // do things with eth-crypto
        const message = AsyncTestUtil.randomString(12);
        const messageHash = EthCrypto.hash.keccak256(message);
        const signature = EthCrypto.sign(testData.privateKey, messageHash);

        // assert things that should be ok
        assert.equal(typeof signature, 'string');
        assert.ok(signature.length > 10);
    });
});