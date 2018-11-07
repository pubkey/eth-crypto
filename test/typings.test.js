/**
 * checks if the typings are correct
 * run via 'npm run test:typings'
 */
const assert = require('assert');
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
            '--no-cache',
            '--compilerOptions', '{"target":"es6", "strict": true, "strictNullChecks": true, "noImplicitAny": true}',
            //'--type-check',
            '-p', codeBase + '\n' + code
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
            let thrown = false;
            try {
                await transpileCode(brokenCode);
            } catch (err) {
                thrown = true;
            }
            assert.ok(thrown);
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
    });
});
