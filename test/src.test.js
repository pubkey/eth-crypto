const AsyncTestUtil = require('async-test-util');
const assert = require('assert');
const EthereumEncryption = require('../dist/lib/index');

const testData = {
    address: '0x63dcee1fd1d814858acd4172bb20e1aa0c947c0a',
    privateKey: '2400238629a674a372694567f949c94847b76607de151433587c20547aa90460',
    publicKey: '03a34d6aef3eb42335fb3cacb59478c0b44c0bbeb8bb4ca427dbc7044157a5d24b'
};

describe('src.test.js', () => {
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
        it('should have different keys because of randomBytes', () => {
            const key1 = EthereumEncryption.createPrivateKey();
            const key2 = EthereumEncryption.createPrivateKey();
            assert.notEqual(key1, key2);
        });
    });
    describe('.publicKeyFromPrivateKey()', () => {
        describe('positive', () => {
            it('should create the correct publicKey', () => {
                const publicKey = EthereumEncryption.publicKeyFromPrivateKey(
                    testData.privateKey
                );
                assert.equal(publicKey, testData.publicKey);
            });
            it('should create a publicKey from generated privateKey', () => {
                const privateKey = EthereumEncryption.createPrivateKey();
                const publicKey = EthereumEncryption.publicKeyFromPrivateKey(
                    privateKey
                );
                assert.equal(typeof publicKey, 'string');
                assert.ok(publicKey.length > 55);
                assert.ok(publicKey.length < 90);
            });
        });
        describe('negative', () => {
            it('should throw when non-privateKey given', () => {
                assert.throws(
                    () => EthereumEncryption.publicKeyFromPrivateKey(
                        'foobar'
                    )
                );
            });
        });
    });
    describe('.hash()', () => {
        describe('positive', () => {
            it('should create a hash', () => {
                const hash = EthereumEncryption.hash('foobar');
                assert.equal('09234807e4af85f17c66b48ee3bca89dffd1f1233659f9f940a2b17b0b8c6bc5', hash);
            });
        });
        describe('negative', () => {
            it('should throw when no string given', () => {
                assert.throws(
                    () => EthereumEncryption.hash({
                        foo: 'bar'
                    })
                );
            });
        });
    });
    describe('.signHash()', () => {
        describe('positive', () => {
            it('should sign the hash', () => {
                const privateKey = EthereumEncryption.createPrivateKey();
                const hash = EthereumEncryption.hash('foobar');
                const signature = EthereumEncryption.signHash(
                    privateKey,
                    hash
                );
                assert.equal(typeof signature, 'string');
                assert.ok(signature.length > 100);
                assert.ok(signature.length < 160);
            });
            it('should always create the same signature', () => {
                const privateKey = EthereumEncryption.createPrivateKey();
                const hash = EthereumEncryption.hash('foobar');
                const signature1 = EthereumEncryption.signHash(
                    privateKey,
                    hash
                );
                const signature2 = EthereumEncryption.signHash(
                    privateKey,
                    hash
                );
                assert.equal(signature1, signature2);
            });
        });
        describe('negative', () => {
            it('should throw when non-hash is given', () => {
                const privateKey = EthereumEncryption.createPrivateKey();
                assert.throws(
                    () => EthereumEncryption.signHash(
                        privateKey,
                        'foobar'
                    )
                );
            });
            it('should throw when non-private-key is given', () => {
                const hash = EthereumEncryption.hash('foobar');
                assert.throws(
                    () => EthereumEncryption.signHash(
                        'foobar',
                        hash
                    )
                );
            });
        });
    });
    describe('.verifyHashSignature()', () => {
        describe('positive', () => {
            it('should verify the signature', () => {
                const privateKey = EthereumEncryption.createPrivateKey();
                const hash = EthereumEncryption.hash('foobar');
                const signature = EthereumEncryption.signHash(
                    privateKey,
                    hash
                );
                const publicKey = EthereumEncryption.publicKeyFromPrivateKey(
                    privateKey
                );
                const valid = EthereumEncryption.verifyHashSignature(
                    publicKey,
                    hash,
                    signature
                );
                assert.ok(valid);
            });
            it('should not verify wrong signature', () => {
                const privateKey = EthereumEncryption.createPrivateKey();
                const wrongPrivateKey = EthereumEncryption.createPrivateKey();
                const hash = EthereumEncryption.hash('foobar');
                const signature = EthereumEncryption.signHash(
                    wrongPrivateKey,
                    hash
                );
                const publicKey = EthereumEncryption.publicKeyFromPrivateKey(
                    privateKey
                );
                const valid = EthereumEncryption.verifyHashSignature(
                    publicKey,
                    hash,
                    signature
                );
                assert.equal(false, valid);
            });
        });
        describe('negative', () => {
            it('should throw when non publicKey given', () => {
                const privateKey = EthereumEncryption.createPrivateKey();
                const hash = EthereumEncryption.hash('foobar');
                const signature = EthereumEncryption.signHash(
                    privateKey,
                    hash
                );
                const publicKey = EthereumEncryption.publicKeyFromPrivateKey(
                    privateKey
                );
                assert.throws(
                    () => EthereumEncryption.verifyHashSignature(
                        'foobar',
                        hash,
                        signature
                    )
                );
            });
        });
    });
    describe('.encryptWithPublicKey()', () => {
        describe('positive', () => {
            it('should encrypt the message', () => {
                const privateKey = EthereumEncryption.createPrivateKey();
                const publicKey = EthereumEncryption.publicKeyFromPrivateKey(
                    privateKey
                );
                const encrypted = EthereumEncryption.encryptWithPublicKey(
                    publicKey,
                    'foobar'
                );
                assert.equal(typeof encrypted, 'string');
            });
        });
        describe('negative', () => {
            it('should throw when no publicKey given', () => {
                assert.throws(
                    () => EthereumEncryption.encryptWithPublicKey(
                        'foobar',
                        'foobar'
                    )
                );
            });
        });
    });
    describe('.decryptWithPrivateKey()', () => {
        describe('positive', () => {
            it('should decrypt the message', () => {
                const privateKey = EthereumEncryption.createPrivateKey();
                const publicKey = EthereumEncryption.publicKeyFromPrivateKey(
                    privateKey
                );
                const encrypted = EthereumEncryption.encryptWithPublicKey(
                    publicKey,
                    'foobar'
                );
                const decrypted = EthereumEncryption.decryptWithPrivateKey(
                    privateKey,
                    encrypted
                );
                assert.equal('foobar', decrypted);
            });
        });
        describe('negative', () => {
            it('should throw when no privateKey given', () => {
                const privateKey = EthereumEncryption.createPrivateKey();
                const publicKey = EthereumEncryption.publicKeyFromPrivateKey(
                    privateKey
                );
                const encrypted = EthereumEncryption.encryptWithPublicKey(
                    publicKey,
                    'foobar'
                );
                assert.throws(
                    () => EthereumEncryption.encryptWithPublicKey(
                        'foobar',
                        encrypted
                    )
                );
            });
        });
    });
});
