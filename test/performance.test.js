const {
    performance
} = require('perf_hooks');
const convertHrtime = require('convert-hrtime');
const AsyncTestUtil = require('async-test-util');
const assert = require('assert');

const EthCrypto = require('../dist/lib/index');

const TEST_DATA = {
    address: '0x3f243FdacE01Cfd9719f7359c94BA11361f32471',
    privateKey: '0x107be946709e41b7895eea9f2dacf998a0a9124acbb786f0fd1a826101581a07',
    publicKey: 'bf1cc3154424dc22191941d9f4f50b063a2b663a2337e5548abea633c1d06eceacf2b81dd326d278cd992d5e03b0df140f2df389ac9a1c2415a220a4a9e8c046'
};

const benchmark = {
    sign: {},
    encryptWithPublicKey: {},
    decryptWithPrivateKey: {}
};

describe('performance.test.js', () => {
    describe('.sign()', () => {
        it('sameKey', async () => {
            // prepare
            const identity = EthCrypto.createIdentity();
            const runs = 300;
            const hashes = new Array(runs)
                .fill(0)
                .map(() => AsyncTestUtil.randomString(12))
                .map(s => EthCrypto.hash.keccak256(s).replace(/^.{2}/g, ''));

            // run
            const startTime = process.hrtime();
            for (let i = 0; i < runs; i++) {
                const hash = hashes.pop();
                EthCrypto.sign(
                    identity.privateKey,
                    hash
                );
            }

            const elapsed = convertHrtime(process.hrtime(startTime));
            benchmark.sign.sameKey = elapsed.milliseconds;
        });
        it('otherKey', async () => {
            // prepare
            const runs = 300;
            const hashes = new Array(runs)
                .fill(0)
                .map(() => AsyncTestUtil.randomString(12))
                .map(s => EthCrypto.hash.keccak256(s).replace(/^.{2}/g, ''));
            const keys = new Array(runs)
                .fill(0)
                .map(() => EthCrypto.createIdentity().privateKey);

            // run
            const startTime = process.hrtime();
            for (let i = 0; i < runs; i++) {
                const hash = hashes.pop();
                const key = keys.pop();
                EthCrypto.sign(
                    key,
                    hash
                );
            }

            const elapsed = convertHrtime(process.hrtime(startTime));
            benchmark.sign.otherKey = elapsed.milliseconds;
        });
    });
    describe('.encryptWithPublicKey()', () => {
        it('sameKey', async () => {
            // prepare
            const identity = EthCrypto.createIdentity();

            const runs = 1000;
            const hashes = new Array(runs)
                .fill(0)
                .map(() => AsyncTestUtil.randomString(12))
                .map(s => EthCrypto.hash.keccak256(s));

            // run
            const startTime = process.hrtime();

            await Promise.all(
                new Array(runs)
                .fill(0)
                .map(async () => {
                    const hash = hashes.pop();
                    await EthCrypto.encryptWithPublicKey(
                        identity.publicKey,
                        hash
                    );
                })
            );

            const elapsed = convertHrtime(process.hrtime(startTime));
            benchmark.encryptWithPublicKey.sameKey = elapsed.milliseconds;
        });
        it('otherKey', async () => {
            // prepare
            const runs = 1000;
            const hashes = new Array(runs)
                .fill(0)
                .map(() => AsyncTestUtil.randomString(12))
                .map(s => EthCrypto.hash.keccak256(s));
            const keys = new Array(runs)
                .fill(0)
                .map(() => EthCrypto.createIdentity().publicKey);

            // run
            const startTime = process.hrtime();
            await Promise.all(
                new Array(runs)
                .fill(0)
                .map(async () => {
                    const hash = hashes.pop();
                    const publicKey = keys.pop();
                    await EthCrypto.encryptWithPublicKey(
                        publicKey,
                        hash
                    );
                })
            );

            const elapsed = convertHrtime(process.hrtime(startTime));
            benchmark.encryptWithPublicKey.otherKey = elapsed.milliseconds;
        });
    });
    describe('.decryptWithPrivateKey()', () => {
        it('sameKey', async () => {
            // prepare
            const identity = EthCrypto.createIdentity();

            const runs = 1000;
            const hashes = await Promise.all(
                new Array(runs)
                .fill(0)
                .map(() => AsyncTestUtil.randomString(12))
                .map(s => EthCrypto.hash.keccak256(s))
                .map(async (h) => EthCrypto.encryptWithPublicKey(
                    identity.publicKey,
                    h
                ))
            );

            // run
            const startTime = process.hrtime();
            await Promise.all(
                new Array(runs)
                .fill(0)
                .map(async () => {
                    const encrypted = hashes.pop();
                    await EthCrypto.decryptWithPrivateKey(
                        identity.privateKey,
                        encrypted
                    );

                })
            );

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
