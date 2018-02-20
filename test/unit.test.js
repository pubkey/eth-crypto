const AsyncTestUtil = require('async-test-util');
const assert = require('assert');
const EthereumEncryption = require('../dist/lib/index');
const ethUtil = require('ethereumjs-util');
// const ECIES = require('../dist/lib/bitcore-ecies/ecies').default;
const ECIES = require('bitcore-ecies');
const bitcore = require('bitcore-lib');
const Base58 = require('base58');
const eccrypto = require('eccrypto');

const testData = {
    address: '0x63dcee1fd1d814858acd4172bb20e1aa0c947c0a',
    privateKey: '2400238629a674a372694567f949c94847b76607de151433587c20547aa90460',
    publicKey: '03a34d6aef3eb42335fb3cacb59478c0b44c0bbeb8bb4ca427dbc7044157a5d24b'
};

describe('unit.test.js', () => {
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
    describe('.soliditySha3()', () => {
        it('should hash the value', () => {
            const hash = EthereumEncryption.soliditySha3('foobar');
            assert.equal(hash, '0x38d18acb67d25c8bb9942764b62f18e17054f66a817bd4295423adf9ed98873e');
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
            it('should sign the solidity hash', async () => {
                // return;
                const web3 = EthereumEncryption.web3;

                console.log('Account:');
                const account = web3.eth.accounts.create();
                console.dir(account);

                console.log('account2:');
                const account2 = web3.eth.accounts
                    .privateKeyToAccount(account.privateKey);
                console.dir(account2);

                console.log('publicKey:');
                const publicKey = ethUtil.privateToPublic(account.privateKey);
                console.dir(publicKey.toString('hex'));

                console.log('## address:');
                const address = ethUtil.pubToAddress(publicKey);
                console.dir(address.toString('hex'));

                console.log('## sign:');
                const sig1 = account.sign('foobar');
                console.dir(sig1);

                console.log('## recover:');
                const rec = EthereumEncryption
                    .web3.eth.accounts
                    .recover(
                        sig1.messageHash,
                        sig1.v,
                        sig1.r,
                        sig1.s
                    );
                console.dir(rec);


                console.log('## encrypt:');
                const message = 'foobar';
                const pubString = '04' + publicKey.toString('hex');

                console.dir('pubString: ' + pubString);
                const encrypted = EthereumEncryption.encryptWithPublicKey(
                    pubString,
                    'foobar'
                );
                console.log('encrypted:');
                console.dir(encrypted.toString('hex'));


                console.log('## decrypt:');

                console.log('privKey: ' + account.privateKey);
                const twoStripped = account.privateKey.replace(/^.{2}/g, '');
                console.log('twoStripped: ' + twoStripped);

                const privBuffer = new Buffer(twoStripped);
                console.log('privKeyString: ' + privBuffer.toString());
                console.dir(ethUtil.toBuffer(account.privateKey).toString('hex'));

                console.log('::::::::::::::::::' + account.privateKey);
                const buf = Buffer('msg to b');
                const publicKeyA = eccrypto.getPublic(new Buffer(twoStripped, 'hex'));
                console.log('publicKeyA: ' + publicKeyA);
                console.log('_');
                const enc = await eccrypto.encrypt(publicKeyA, buf);
                console.log('....');
                const dec = await eccrypto.decrypt(new Buffer(twoStripped, 'hex'), enc);
                console.dir(dec.toString());

                console.log('--------------------');
                const p = new bitcore.PrivateKey(twoStripped);
                const pub = p.toPublicKey();
                console.log('pub: ' + pub);
                const compressedPK = bitcore.PublicKey(pub);
                console.log('compressedPK: ' + compressedPK);

                const encrypted2 = EthereumEncryption.encryptWithPublicKey(
                    pub,
                    'foobar'
                );
                console.log('encryption with compressed key worked!');

                const aliceDec2 = ECIES()
                    .privateKey(twoStripped)
                    .publicKey(pubString);
                console.dir(aliceDec2);

                console.log('ECIES with own private key workd!');

                const decrypted2 = aliceDec2.decrypt(
                    new Buffer(encrypted2, 'hex')
                );
                console.log('decrypted2:');
                console.dir(decrypted2.toString());

                console.log('aliceDec:');
                const aliceDec = ECIES().privateKey('03' + twoStripped);
                console.log('decryptMe');
                const decryptMe = new Buffer(encrypted, 'hex');
                console.log('decryptedBuffer');
                const decryptedBuffer = aliceDec.decrypt(decryptMe);
                console.log('decrypted:');
                const decrypted = decryptedBuffer.toString();

                console.dir(decrypted);

                process.exit();
                /*
                const privateKey = EthereumEncryption.createPrivateKey();
                const publicKey = EthereumEncryption.publicKeyFromPrivateKey(privateKey);
                const address = EthereumEncryption.publicKeyToAddress(publicKey);
                console.log('address:');
                console.dir(EthereumEncryption.web3.utils.toChecksumAddress(address));

                const hash = EthereumEncryption.soliditySha3('foobar');
                console.log('hash:');
                console.dir(hash);
                const useHash = hash;

                console.log('privKey:');
                console.dir(privateKey);

                const sig1 = EthereumEncryption
                    .web3.eth.accounts
                    .sign(
                        'Hello, world!',
                        new Buffer(privateKey, 'hex')
                    );
                console.log('sig1:');
                console.dir(sig1);

                const rec = EthereumEncryption
                    .web3.eth.accounts
                    .recover(
                        sig1.messageHash,
                        sig1.v,
                        sig1.r,
                        sig1.s
                    );
                console.log('recover:');
                console.dir(EthereumEncryption.web3.utils.toChecksumAddress(rec));

                console.log('useHash:');
                console.dir(useHash);

                const signature = EthereumEncryption.signHash(
                    privateKey,
                    useHash
                );
                assert.ok(signature);
                console.dir(signature);*/
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
