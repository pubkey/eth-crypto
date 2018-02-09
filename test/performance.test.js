const {
    performance
} = require('perf_hooks');
const convertHrtime = require('convert-hrtime');
const AsyncTestUtil = require('async-test-util');
const assert = require('assert');

const EthereumEncryption = require('../dist/lib/index');

const testData = {
    address: '0x63dcee1fd1d814858acd4172bb20e1aa0c947c0a',
    privateKey: '2400238629a674a372694567f949c94847b76607de151433587c20547aa90460',
    publicKey: '03a34d6aef3eb42335fb3cacb59478c0b44c0bbeb8bb4ca427dbc7044157a5d24b'
};

const benchmark = {
    signHash: {},
    encryptWithPublicKey: {},
    decryptWithPrivateKey: {}
};

describe('performance.test.js', () => {
    describe('.signHash()', () => {
        it('sameKey', async () => {
            // prepare
            const privateKey = EthereumEncryption.createPrivateKey();
            const runs = 10000;
            const hashes = new Array(runs)
                .fill(0)
                .map(() => AsyncTestUtil.randomString(12))
                .map(s => EthereumEncryption.hash(s));

            // run
            const startTime = process.hrtime();
            for (let i = 0; i < runs; i++) {
                const hash = hashes.pop();
                EthereumEncryption.signHash(
                    privateKey,
                    hash
                );
            }

            const elapsed = convertHrtime(process.hrtime(startTime));
            benchmark.signHash.sameKey = elapsed.milliseconds;
        });
        it('otherKey', async () => {
            // prepare
            const runs = 10000;
            const hashes = new Array(runs)
                .fill(0)
                .map(() => AsyncTestUtil.randomString(12))
                .map(s => EthereumEncryption.hash(s));
            const keys = new Array(runs)
                .fill(0)
                .map(() => EthereumEncryption.createPrivateKey());

            // run
            const startTime = process.hrtime();
            for (let i = 0; i < runs; i++) {
                const hash = hashes.pop();
                const key = keys.pop();
                EthereumEncryption.signHash(
                    key,
                    hash
                );
            }

            const elapsed = convertHrtime(process.hrtime(startTime));
            benchmark.signHash.otherKey = elapsed.milliseconds;
        });
    });
    describe('.encryptWithPublicKey()', () => {
        it('sameKey', async () => {
            // prepare
            const privateKey = EthereumEncryption.createPrivateKey();
            const publicKey = EthereumEncryption.publicKeyFromPrivateKey(
                privateKey
            );
            const runs = 1000;
            const hashes = new Array(runs)
                .fill(0)
                .map(() => AsyncTestUtil.randomString(12))
                .map(s => EthereumEncryption.hash(s));

            // run
            const startTime = process.hrtime();
            for (let i = 0; i < runs; i++) {
                const hash = hashes.pop();
                const encrypted = EthereumEncryption.encryptWithPublicKey(
                    publicKey,
                    hash
                );
            }

            const elapsed = convertHrtime(process.hrtime(startTime));
            benchmark.encryptWithPublicKey.sameKey = elapsed.milliseconds;
        });
        it('otherKey', async () => {
            // prepare
            const runs = 1000;
            const hashes = new Array(runs)
                .fill(0)
                .map(() => AsyncTestUtil.randomString(12))
                .map(s => EthereumEncryption.hash(s));
            const keys = new Array(runs)
                .fill(0)
                .map(() => {
                    const privateKey = EthereumEncryption.createPrivateKey();
                    const publicKey = EthereumEncryption.publicKeyFromPrivateKey(
                        privateKey
                    );
                    return publicKey;
                });
            // run
            const startTime = process.hrtime();
            for (let i = 0; i < runs; i++) {
                const hash = hashes.pop();
                const publicKey = keys.pop();
                const encrypted = EthereumEncryption.encryptWithPublicKey(
                    publicKey,
                    hash
                );
            }

            const elapsed = convertHrtime(process.hrtime(startTime));
            benchmark.encryptWithPublicKey.otherKey = elapsed.milliseconds;
        });
    });
    describe('.decryptWithPrivateKey()', () => {
        it('sameKey', async () => {
            // prepare
            const privateKey = EthereumEncryption.createPrivateKey();
            const publicKey = EthereumEncryption.publicKeyFromPrivateKey(
                privateKey
            );
            const runs = 1000;
            const hashes = new Array(runs)
                .fill(0)
                .map(() => AsyncTestUtil.randomString(12))
                .map(s => EthereumEncryption.hash(s))
                .map(h => EthereumEncryption.encryptWithPublicKey(
                    publicKey,
                    h
                ));

            // run
            const startTime = process.hrtime();
            for (let i = 0; i < runs; i++) {
                const encrypted = hashes.pop();
                const decrypted = EthereumEncryption.decryptWithPrivateKey(
                    privateKey,
                    encrypted
                );
            }

            const elapsed = convertHrtime(process.hrtime(startTime));
            benchmark.decryptWithPrivateKey.sameKey = elapsed.milliseconds;
        });
    });
    describe('show', () => {
        it('show result', () => {
            console.log('benchmark result:');
            console.log(JSON.stringify(benchmark, null, 2));
        });
    });
});
