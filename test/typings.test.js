/**
 * checks if the typings are correct
 * run via 'npm run test:typings'
 */
const assert = require('assert');
assert.ok(true);
const path = require('path');
const AsyncTestUtil = require('async-test-util');

describe('typings.test.ts', () => {
    const mainPath = path.join(__dirname, '../');
    const codeBase = `
        import EthCrypto from '${mainPath}';
        import * as EthCryptoAll from '${mainPath}';
    `;
    const transpileCode = async (code) => {
        const spawn = require('child-process-promise').spawn;
        const stdout = [];
        const stderr = [];
        const promise = spawn('ts-node', [
            '--compiler-options', '{"target":"es6", "strict": true}',
            '--type-check',
            '-e', codeBase + '\n' + code
        ]);
        const childProcess = promise.childProcess;
        childProcess.stdout.on('data', data => stdout.push(data.toString()));
        childProcess.stderr.on('data', data => stderr.push(data.toString()));
        try {
            await promise;
        } catch (err) {
            throw new Error(`could not run
                # Error: ${err}
                # Output: ${stdout}
                # ErrOut: ${stderr}
                `);
        }
    };
    describe('basic', () => {
        it('should sucess on basic test', async () => {
            await transpileCode('console.log("Hello, world!")');
        });
        it('should fail on broken code', async () => {
            const brokenCode = `
                let x: string = 'foo';
                x = 1337;
            `;
            await AsyncTestUtil.assertThrows(
                () => transpileCode(brokenCode)
            );
        });
    });
    describe('statics', () => {
        describe('.createIdentity()', () => {
            it('usage', async () => {
                const code = `
                    (async()=>{
                        const ident = EthCrypto.createIdentity();
                        const privKey: string = ident.privateKey;

                        const ident2 = EthCryptoAll.createIdentity();
                        const privKey2: string = ident2.privateKey;
                    })();
                `;
                await transpileCode(code);
            });
            it('EthCryptoAll.createIdentity() fail on wrong access', async () => {
                const code = `
                    (async()=>{
                        const ident = EthCryptoAll.createIdentity();
                        const privKey: string = ident.privateKeyFoobar;
                    })();
                `;
                await AsyncTestUtil.assertThrows(
                    () => transpileCode(code)
                );
            });
            it('EthCrypto.createIdentity() fail on wrong access', async () => {
                const code = `
                    (async()=>{
                        const ident = EthCrypto.createIdentity();
                        const privKey: string = ident.privateKeyFoobar;
                    })();
                `;
                await AsyncTestUtil.assertThrows(
                    () => transpileCode(code)
                );
            });
        });
        describe('.publicKey.compress()', () => {
            it('usage', async () => {
                const code = `
                    (async()=>{
                        const ident = EthCrypto.createIdentity();
                        const pub1: string = EthCrypto.publicKey.compress(ident.publicKey);
                        const pub2: string = EthCryptoAll.publicKey.compress(ident.publicKey);
                    })();
                `;
                await transpileCode(code);
            });
        });
        describe('rawTx', () => {
            /**
             * @link https://github.com/pubkey/eth-crypto/issues/20
             */
            it('#20 should need a nonce for a RawTx', async () => {
                const code = `
                    (async()=>{
                        const rawTx: EthCryptoAll.RawTx = {
                            from: '0xfoobar',
                            to: '0xfoobar',
                            value: 10,
                            gasLimit: 10,
                            gasPrice: 10,
                            nonce: 20
                        };
                    })();
                `;
                await transpileCode(code);

                const badCodeWithoutNonce = `
                    (async()=>{
                        const rawTx: EthCryptoAll.RawTx = {
                            from: '0xfoobar',
                            to: '0xfoobar',
                            value: 10,
                            gasLimit: 10,
                            gasPrice: 10
                        };
                    })();
                `;
                await AsyncTestUtil.assertThrows(
                    () => transpileCode(badCodeWithoutNonce),
                    Error,
                    'nonce'
                );
            });
        });
    });
});
