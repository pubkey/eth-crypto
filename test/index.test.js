const AsyncTestUtil = require('async-test-util');
const assert = require('assert');
const EthereumEncryption = require('../dist/lib/index');

const testData = {
    address: '0x63dcee1fd1d814858acd4172bb20e1aa0c947c0a',
    privateKey: '2400238629a674a372694567f949c94847b76607de151433587c20547aa90460',
    publicKey: '03a34d6aef3eb42335fb3cacb59478c0b44c0bbeb8bb4ca427dbc7044157a5d24b'
};

describe('index.test.js', () => {
    describe('.publicKeyToAddress()', () => {
        describe('positive', () => {
            it('should give the correct address', () => {
                const address = EthereumEncryption.publicKeyToAddress(testData.publicKey);
                assert.equal(address, testData.address);
            });
        });
        describe('negative', () => {
            it('should throw when wrong key given', () => {
                assert.throws(
                    () => EthereumEncryption.publicKeyToAddress('foobar')
                );
            });
        });
    });
    describe('.createPrivateKey()', () => {
        it('should create a valid key', () => {
            const key = EthereumEncryption.createPrivateKey();
            assert.equal(typeof key, 'string');
            assert.ok(key.length > 55);
            assert.ok(key.length < 90);
        });
    });

});
