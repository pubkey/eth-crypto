// const AsyncTestUtil = require('async-test-util');
const assert = require('assert');
const EthCrypto = require('../dist/lib/index');
const crypto = require('crypto');

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
    it('#47 cannot encrypt/decrypt with more then 16 chars message', async () => {
        const ident = EthCrypto.createIdentity();

        const message = crypto.randomBytes(6).toString('hex');
        const challenge = await EthCrypto.encryptWithPublicKey(
            ident.publicKey,
            Buffer.from(message)
        );
        const answer = await EthCrypto.decryptWithPrivateKey(
            ident.privateKey,
            challenge
        );
        assert.deepEqual(message, answer);
    });
    describe('v3 backward compatibility', () => {
        /**
         * Data encrypted with eth-crypto v3.1.0 must still be
         * decryptable with the current version (v4).
         * These fixtures were generated using eth-crypto v3.1.0
         * with known keys and messages.
         */
        const v3PrivateKey = '0x107be946709e41b7895eea9f2dacf998a0a9124acbb786f0fd1a826101581a07';

        it('should decrypt a v3-encrypted object', async () => {
            const v3Encrypted = {
                iv: '34ee1ff4f31bcd06091c73bb6b8ee1cb',
                ephemPublicKey: '049ced7064784fd59e44ee0f25e74b5b63977bbd2eca887874236b20fe1e695e20f00bede20d841e474bc31c3804d717dd8ab100294963b48ae6e17efa915328d3',
                ciphertext: '611210bda78f35d8ea83d17abaeeb3034f2124dff93b849b29faa65490b790832e38a6b1a69b8c068649dca3bdf0d6b8c551fbb9d29a59ea1985290d2840bdbc',
                mac: 'e74d6cb8516789ca13df04e321274bb6a0ecf36b8ad75a6f9db1c9e8b8f5f966'
            };
            const decrypted = await EthCrypto.decryptWithPrivateKey(v3PrivateKey, v3Encrypted);
            assert.equal(decrypted, 'this is a test message encrypted with eth-crypto v3');
        });
        it('should decrypt a v3-encrypted stringified cipher', async () => {
            const v3Stringified = '34ee1ff4f31bcd06091c73bb6b8ee1cb039ced7064784fd59e44ee0f25e74b5b63977bbd2eca887874236b20fe1e695e20e74d6cb8516789ca13df04e321274bb6a0ecf36b8ad75a6f9db1c9e8b8f5f966611210bda78f35d8ea83d17abaeeb3034f2124dff93b849b29faa65490b790832e38a6b1a69b8c068649dca3bdf0d6b8c551fbb9d29a59ea1985290d2840bdbc';
            const decrypted = await EthCrypto.decryptWithPrivateKey(v3PrivateKey, v3Stringified);
            assert.equal(decrypted, 'this is a test message encrypted with eth-crypto v3');
        });
        it('should decrypt a v3-encrypted deterministic cipher', async () => {
            const v3Deterministic = {
                iv: '61626364656667686970717273747576',
                ephemPublicKey: '0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
                ciphertext: 'd2829c1f00d1483bb6dd0d109b88137afa76c5d4c09ccb9331c854a54bce06b2',
                mac: '66887b23249e61eaa4207d3478146620e0f90df10818e56aab4f4a58bb264ea1'
            };
            const decrypted = await EthCrypto.decryptWithPrivateKey(v3PrivateKey, v3Deterministic);
            assert.equal(decrypted, 'hello world from eth-crypto v3');
        });
        it('should decrypt a v3-encrypted deterministic stringified cipher', async () => {
            const v3DeterministicStringified = '616263646566676869707172737475760279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f8179866887b23249e61eaa4207d3478146620e0f90df10818e56aab4f4a58bb264ea1d2829c1f00d1483bb6dd0d109b88137afa76c5d4c09ccb9331c854a54bce06b2';
            const decrypted = await EthCrypto.decryptWithPrivateKey(v3PrivateKey, v3DeterministicStringified);
            assert.equal(decrypted, 'hello world from eth-crypto v3');
        });
    });
});
