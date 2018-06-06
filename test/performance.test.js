const AsyncTestUtil = require('async-test-util');
const EthCrypto = require('../dist/lib/index');

const benchmark = {
    sign: {},
    recoverPublicKey: {},
    encryptWithPublicKey: {},
    decryptWithPrivateKey: {}
};

const nowTime = () => {
    return AsyncTestUtil.performanceNow();
};

const elapsedTime = before => {
    return AsyncTestUtil.performanceNow() - before;
};

describe('performance.test.js', () => {
    describe('.sign()', () => {
        it('sameKey', async () => {
            // prepare
            const identity = EthCrypto.createIdentity();
            const runs = 200;
            const hashes = new Array(runs)
                .fill(0)
                .map(() => AsyncTestUtil.randomString(12))
                .map(s => EthCrypto.hash.keccak256(s).replace(/^.{2}/g, ''));

            // run
            const startTime = nowTime();
            for (let i = 0; i < runs; i++) {
                const hash = hashes.pop();
                EthCrypto.sign(
                    identity.privateKey,
                    hash
                );
            }

            const elapsed = elapsedTime(startTime);
            benchmark.sign.sameKey = elapsed;
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
            const startTime = nowTime();
            for (let i = 0; i < runs; i++) {
                const hash = hashes.pop();
                const key = keys.pop();
                EthCrypto.sign(
                    key,
                    hash
                );
            }

            const elapsed = elapsedTime(startTime);
            benchmark.sign.otherKey = elapsed;
        });
    });
    describe('.recoverPublicKey()', () => {
        it('run', async () => {
            // prepare
            const identity = EthCrypto.createIdentity();
            const runs = 200;
            const hashes = new Array(runs)
                .fill(0)
                .map(() => AsyncTestUtil.randomString(12))
                .map(s => EthCrypto.hash.keccak256(s).replace(/^.{2}/g, ''));

            const signatures = hashes.map(hash => EthCrypto.sign(
                identity.privateKey,
                hash
            ));

            // run
            const startTime = nowTime();
            for (let i = 0; i < runs; i++) {
                const sig = signatures.pop();
                const hash = hashes.pop();
                EthCrypto.recoverPublicKey(
                    sig,
                    hash
                );
            }

            const elapsed = elapsedTime(startTime);
            benchmark.recoverPublicKey.sameKey = elapsed;
        });
    });
    describe('.encryptWithPublicKey()', () => {
        it('sameKey', async () => {
            // prepare
            const identity = EthCrypto.createIdentity();

            const runs = 200;
            const hashes = new Array(runs)
                .fill(0)
                .map(() => AsyncTestUtil.randomString(12))
                .map(s => EthCrypto.hash.keccak256(s));

            // run
            const startTime = nowTime();

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

            const elapsed = elapsedTime(startTime);
            benchmark.encryptWithPublicKey.sameKey = elapsed;
        });
        it('otherKey', async () => {
            // prepare
            const runs = 200;
            const hashes = new Array(runs)
                .fill(0)
                .map(() => AsyncTestUtil.randomString(12))
                .map(s => EthCrypto.hash.keccak256(s));
            const keys = new Array(runs)
                .fill(0)
                .map(() => EthCrypto.createIdentity().publicKey);

            // run
            const startTime = nowTime();
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

            const elapsed = elapsedTime(startTime);
            benchmark.encryptWithPublicKey.otherKey = elapsed;
        });
    });
    describe('.decryptWithPrivateKey()', () => {
        it('sameKey', async () => {
            // prepare
            const identity = EthCrypto.createIdentity();

            const runs = 200;
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
            const startTime = nowTime();
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

            const elapsed = elapsedTime(startTime);
            benchmark.decryptWithPrivateKey.sameKey = elapsed;
        });
    });
    describe('show', () => {
        it('show result', () => {
            console.log('benchmark result:');
            console.log(JSON.stringify(benchmark, null, 2));
        });
    });
});
