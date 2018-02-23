const AsyncTestUtil = require('async-test-util');
const assert = require('assert');
const EthCrypto = require('../dist/lib/index');
const eccrypto = require('eccrypto');

const TEST_DATA = {
    address: '0x3f243FdacE01Cfd9719f7359c94BA11361f32471',
    privateKey: '0x107be946709e41b7895eea9f2dacf998a0a9124acbb786f0fd1a826101581a07',
    publicKey: 'bf1cc3154424dc22191941d9f4f50b063a2b663a2337e5548abea633c1d06eceacf2b81dd326d278cd992d5e03b0df140f2df389ac9a1c2415a220a4a9e8c046'
};

describe('unit.test.js', () => {
    describe('.createIdentity()', () => {
        it('should create an identity', () => {
            const ident = EthCrypto.createIdentity();
            assert.equal(typeof ident.privateKey, 'string');
            assert.equal(typeof ident.publicKey, 'string');
            assert.equal(typeof ident.address, 'string');
        });
    });
    describe('.publicKeyByPrivateKey()', () => {
        describe('positive', () => {
            it('should give the correct publicKey', () => {
                const publicKey = EthCrypto.publicKeyByPrivateKey(TEST_DATA.privateKey);
                assert.equal(publicKey, TEST_DATA.publicKey);
            });
        });
        describe('negative', () => {
            it('should crash when non-key given', () => {
                assert.throws(
                    () => EthCrypto.publicKeyByPrivateKey(
                        AsyncTestUtil.randomString(12)
                    )
                );
            });
        });
    });
    describe('.addressByPublicKey()', () => {
        describe('positive', () => {
            it('should generate the correct address', () => {
                const address = EthCrypto.addressByPublicKey(TEST_DATA.publicKey);
                assert.equal(address, TEST_DATA.address);
            });
        });
        describe('negative', () => {
            assert.throws(
                () => EthCrypto.addressByPublicKey(
                    AsyncTestUtil.randomString(12)
                )
            );
        });
    });
    describe('.sign()', () => {
        describe('positive', () => {
            it('should sign the data', () => {
                const message = AsyncTestUtil.randomString(12);
                const signature = EthCrypto.sign(TEST_DATA.privateKey, message);
                assert.ok(signature);
                assert.equal(typeof signature.r, 'string');
                assert.equal(typeof signature.s, 'string');
                assert.equal(typeof signature.v, 'string');
            });
        });
        describe('negative', () => {
            it('should not sign with wrong key', () => {
                return; // TODO
                assert.throws(
                    () => EthCrypto.sign(
                        'XXX' + AsyncTestUtil.randomString(222),
                        AsyncTestUtil.randomString(12)
                    )
                );
            });
        });
    });
    describe('.recover()', () => {
        describe('positive', () => {
            it('should return the correct address', () => {
                const message = AsyncTestUtil.randomString(12);
                const signature = EthCrypto.sign(TEST_DATA.privateKey, message);
                const address = EthCrypto.recover(signature, message);
                assert.equal(address, TEST_DATA.address);
            });
        });
        describe('negative', () => {});
    });
    describe('.encryptWithPublicKey()', () => {
        describe('positive', () => {
            it('should encrypt the data', async () => {
                const message = AsyncTestUtil.randomString(12);
                const encrypted = await EthCrypto.encryptWithPublicKey(
                    TEST_DATA.publicKey,
                    message
                );
                assert.equal(typeof encrypted.iv, 'string');
                assert.equal(typeof encrypted.ephemPublicKey, 'string');
                assert.equal(typeof encrypted.ciphertext, 'string');
                assert.equal(typeof encrypted.mac, 'string');
            });
        });
        describe('negative', () => {
            it('should throw when non-key given', async () => {
                const message = AsyncTestUtil.randomString(12);
                await AsyncTestUtil.assertThrows(
                    () => EthCrypto.encryptWithPublicKey(
                        AsyncTestUtil.randomString(12),
                        message
                    )
                );
            });
        });
    });
    describe('.decryptWithPrivateKey()', () => {
        describe('positive', () => {
            it('should decrypt the data', async () => {
                const message = AsyncTestUtil.randomString(12);
                const encrypted = await EthCrypto.encryptWithPublicKey(
                    TEST_DATA.publicKey,
                    message
                );
                const decrypted = await EthCrypto.decryptWithPrivateKey(
                    TEST_DATA.privateKey,
                    encrypted
                );
                assert.equal(decrypted, message);
            });
        });
        describe('negative', () => {});
    });
    describe('.signTransaction()', () => {
        describe('positive', () => {
            it('should sign our transaction', () => {
                const ident = EthCrypto.createIdentity();
                const rawTx = {
                    from: ident.address,
                    to: '0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0',
                    value: 1000000000000000000,
                    gasPrice: 5000000000,
                    gasLimit: 21000
                };
                const signed = EthCrypto.signTransaction(
                    rawTx,
                    ident.privateKey
                );
                assert.equal(typeof signed, 'string');
            });
        });
        describe('negative', () => {
            it('should throw on non-key', () => {
                const ident = EthCrypto.createIdentity();
                const rawTx = {
                    from: ident.address,
                    to: '0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0',
                    value: 1000000000000000000,
                    gasPrice: 5000000000,
                    gasLimit: 21000
                };
                const ident2 = EthCrypto.createIdentity();
                assert.throws(
                    () => EthCrypto.signTransaction(
                        rawTx,
                        ident2.privateKey
                    )
                );
            });
        });
    });

    /*
        describe('.testBlock()', ()=> {
            describe('positive', ()=> {});
            describe('negative', ()=> {});
        });
    */
});
