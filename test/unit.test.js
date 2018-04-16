const AsyncTestUtil = require('async-test-util');
const assert = require('assert');
const EthCrypto = require('../dist/lib/index');

const TEST_DATA = {
    address: '0x3f243FdacE01Cfd9719f7359c94BA11361f32471',
    privateKey: '0x107be946709e41b7895eea9f2dacf998a0a9124acbb786f0fd1a826101581a07',
    publicKey: 'bf1cc3154424dc22191941d9f4f50b063a2b663a2337e5548abea633c1d06eceacf2b81dd326d278cd992d5e03b0df140f2df389ac9a1c2415a220a4a9e8c046'
};
const HEX_STRING = '0x55030130e79efc853f8644d32c11a58d47018cc3a08a16ac4fb9c09af4a634b16d1e37f44c60be0001670b7147dbacc6e057ac7595d74ecfd7ff58a593ee9db3cee601ee06234d200e1f2e35533533754ecbf910b86c1b7fc556b1cc2516f6dd3a25360bcd68f1af4f9450952cc9ef53de5b0c42f8f07976a05d0cfc0ee21acda7ad31cc77640fdd55349c460f94d71656e79048e5991aeb8852ad094bc96e8983232710f5b983ba07bc542ac3f4116a5d066b965e9071cb9912ed1a3da98cdd06e5ef75738fb915a6cef05497f49215bba156c2ba525b2a268be95c3efabb3f1d10fc3b3a57f8a06ef048735a5f3cf9fbbe2203b1b39568ff99e78094bf78c61514ebcbdc75fa90e7d06bc11a49959c2c4632d87384a2667f06e03216bba3b345af2cf89c439c12d4c24dc392d3ffdc9e807b00772b99299178415966d86b59478f21ae005e74c68057d5a3ccbefa08';


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
            it('should auto-prefix 0x', () => {
                const noPrefixPrivate = '43137cdb869f4375abfce46910aa24d528b2152c5a396158550158fbdb160b4f';
                const publicKey = EthCrypto.publicKeyByPrivateKey(noPrefixPrivate);
                const publicKey2 = EthCrypto.publicKeyByPrivateKey('0x' + noPrefixPrivate);
                assert.equal(publicKey, publicKey2);
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
    describe('.sign()', () => {
        describe('positive', () => {
            it('should sign the data', () => {
                const message = AsyncTestUtil.randomString(12);
                const messageHash = EthCrypto.hash.keccak256(message);
                const signature = EthCrypto.sign(TEST_DATA.privateKey, messageHash);
                assert.equal(typeof signature, 'string');
                assert.ok(signature.length > 10);
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
            it('should throw when non-hash given', () => {
                assert.throws(
                    () => EthCrypto.sign(
                        TEST_DATA.privateKey,
                        AsyncTestUtil.randomString(5)
                    )
                );
            });
        });
    });
    describe('.recover()', () => {
        describe('positive', () => {
            it('should return the correct address', () => {
                const message = AsyncTestUtil.randomString(12);
                const messageHash = EthCrypto.hash.keccak256(message);
                const signature = EthCrypto.sign(TEST_DATA.privateKey, messageHash);
                const address = EthCrypto.recover(signature, messageHash);
                assert.equal(address, TEST_DATA.address);

            });
        });
        describe('negative', () => {});
    });
    describe('.recoverPublicKey()', () => {
        it('should recover the correct key', async () => {
            const message = AsyncTestUtil.randomString(12);
            const messageHash = EthCrypto.hash.keccak256(message);
            const signature = EthCrypto.sign(TEST_DATA.privateKey, messageHash);
            const publicKey = EthCrypto.recoverPublicKey(signature, messageHash);
            assert.equal(publicKey, TEST_DATA.publicKey);
        });
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
            it('should also work with compressed keys', async () => {
                const message = AsyncTestUtil.randomString(12);
                const ident = EthCrypto.createIdentity();
                const compressed = EthCrypto.publicKey.compress(ident.publicKey);
                const encrypted = await EthCrypto.encryptWithPublicKey(
                    compressed,
                    message
                );
                const decrypted = await EthCrypto.decryptWithPrivateKey(
                    ident.privateKey,
                    encrypted
                );
                assert.equal(decrypted, message);
            });
        });
        describe('negative', () => {
            it('should throw when non-key given', async () => {
                const message = AsyncTestUtil.randomString(12);
                await AsyncTestUtil.assertThrows(
                    () => EthCrypto.encryptWithPublicKey(
                        AsyncTestUtil.randomString(12),
                        message
                    ),
                    'RangeError'
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
            it('should also decrypt with stringified data', async()=>{
                const message = AsyncTestUtil.randomString(12);
                const encrypted = await EthCrypto.encryptWithPublicKey(
                    TEST_DATA.publicKey,
                    message
                );
                const encryptedString = EthCrypto.cipher.stringify(encrypted);
                const decrypted = await EthCrypto.decryptWithPrivateKey(
                    TEST_DATA.privateKey,
                    encryptedString
                );
                assert.equal(decrypted, message);
            });
        });
        describe('negative', () => {});
    });
    describe('.cipher', () => {
        describe('.stringify()', () => {
            it('should stringify the cipher', async () => {
                const ident = EthCrypto.createIdentity();
                const message = AsyncTestUtil.randomString(12);

                const cipher = await EthCrypto.encryptWithPublicKey(
                    ident.publicKey,
                    message
                );
                const str = EthCrypto.cipher.stringify(cipher);
                assert.equal(typeof str, 'string');
            });
            it('should not stringify the string', async () => {
                const ident = EthCrypto.createIdentity();
                const message = AsyncTestUtil.randomString(12);

                const cipher = await EthCrypto.encryptWithPublicKey(
                    ident.publicKey,
                    message
                );
                const str = EthCrypto.cipher.stringify(cipher);
                const str2 = EthCrypto.cipher.stringify(str);
                assert.equal(str, str2);
            });
        });
        describe('.parse()', () => {
            it('should parse the equal object', async () => {
                const ident = EthCrypto.createIdentity();
                const message = AsyncTestUtil.randomString(12);

                const cipher = await EthCrypto.encryptWithPublicKey(
                    ident.publicKey,
                    message
                );
                const str = EthCrypto.cipher.stringify(cipher);
                const cipher2 = EthCrypto.cipher.parse(str);
                assert.deepEqual(cipher, cipher2);
            });
            it('should also work with different message-length', async () => {
                const ident = EthCrypto.createIdentity();
                const message = AsyncTestUtil.randomString(120);

                const cipher = await EthCrypto.encryptWithPublicKey(
                    ident.publicKey,
                    message
                );
                const str = EthCrypto.cipher.stringify(cipher);
                const cipher2 = EthCrypto.cipher.parse(str);
                assert.deepEqual(cipher, cipher2);
            });
        });
    });
    describe('.publicKey', () => {
        describe('.compress()', () => {
            it('should compress the key', () => {
                const uncompressed = 'a34d6aef3eb42335fb3cacb59478c0b44c0bbeb8bb4ca427dbc7044157a5d24b4adf14868d8449c9b3e50d3d6338f3e5a2d3445abe679cddbe75cb893475806f';
                const compressed = EthCrypto.publicKey.compress(uncompressed);
                assert.equal(typeof compressed, 'string');
                assert.ok(compressed.startsWith('03'));
            });
            it('should also work with trailing 04', () => {
                const uncompressed = '04a34d6aef3eb42335fb3cacb59478c0b44c0bbeb8bb4ca427dbc7044157a5d24b4adf14868d8449c9b3e50d3d6338f3e5a2d3445abe679cddbe75cb893475806f';
                const compressed = EthCrypto.publicKey.compress(uncompressed);
                assert.equal(typeof compressed, 'string');
                assert.ok(compressed.startsWith('03'));
            });
            it('should also work when compressed already given', () => {
                const uncompressed = '03a34d6aef3eb42335fb3cacb59478c0b44c0bbeb8bb4ca427dbc7044157a5d24b';
                const compressed = EthCrypto.publicKey.compress(uncompressed);
                assert.equal(typeof compressed, 'string');
                assert.ok(compressed.startsWith('03'));
            });
        });
        describe('.decompress()', () => {
            it('should decompress', () => {
                const compressed = '03a34d6aef3eb42335fb3cacb59478c0b44c0bbeb8bb4ca427dbc7044157a5d24b';
                const uncompressed = EthCrypto.publicKey.decompress(compressed);
                assert.equal(typeof uncompressed, 'string');
                const buf = new Buffer(uncompressed, 'hex');
                assert.equal(buf.length, 64);
            });
            it('should work when already uncompressed', () => {
                const compressed = '04a34d6aef3eb42335fb3cacb59478c0b44c0bbeb8bb4ca427dbc7044157a5d24b4adf14868d8449c9b3e50d3d6338f3e5a2d3445abe679cddbe75cb893475806f';
                const uncompressed = EthCrypto.publicKey.decompress(compressed);
                assert.equal(typeof uncompressed, 'string');
                const buf = new Buffer(uncompressed, 'hex');
                assert.equal(buf.length, 64);
            });
            it('should work when already uncompressed (no04)', () => {
                const compressed = 'a34d6aef3eb42335fb3cacb59478c0b44c0bbeb8bb4ca427dbc7044157a5d24b4adf14868d8449c9b3e50d3d6338f3e5a2d3445abe679cddbe75cb893475806f';
                const uncompressed = EthCrypto.publicKey.decompress(compressed);
                assert.equal(typeof uncompressed, 'string');
                const buf = new Buffer(uncompressed, 'hex');
                assert.equal(buf.length, 64);
            });
        });
        describe('.toAddress()', () => {
            describe('positive', () => {
                it('should generate the correct address', () => {
                    const address = EthCrypto.publicKey.toAddress(TEST_DATA.publicKey);
                    assert.equal(address, TEST_DATA.address);
                });
                it('should work with compressed key', () => {
                    const ident = EthCrypto.createIdentity();
                    const compressed = EthCrypto.publicKey.compress(ident.publicKey);
                    const address = EthCrypto.publicKey.toAddress(compressed);
                    assert.equal(address, ident.address);
                });
            });
            describe('negative', () => {
                assert.throws(
                    () => EthCrypto.publicKey.toAddress(
                        AsyncTestUtil.randomString(12)
                    )
                );
            });
        });
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
    describe('hex', () => {
        it('compress/decompress to utf16', () => {
            const compressed = EthCrypto.hex.compress(HEX_STRING, false);
            assert.ok(compressed.length < HEX_STRING.length);

            const decompressed = EthCrypto.hex.decompress(compressed, false);
            assert.equal(decompressed, HEX_STRING);
        });
        it('compress/decompress to base64', () => {
            const compressed = EthCrypto.hex.compress(HEX_STRING, true);
            assert.ok(compressed.length < HEX_STRING.length);

            const decompressed = EthCrypto.hex.decompress(compressed, true);
            assert.equal(decompressed, HEX_STRING);
        });
    });
    /*
        describe('.testBlock()', ()=> {
            describe('positive', ()=> {});
            describe('negative', ()=> {});
        });
    */
});
