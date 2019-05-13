const ganache = require('ganache-cli');
const Web3 = require('web3');
const path = require('path');
const AsyncTestUtil = require('async-test-util');
const SolidityCli = require('solidity-cli');
const assert = require('assert');
const EthCrypto = require('../dist/lib/index');
// const web3 = EthCrypto.util.web3;

describe('integration.test.js', () => {
    const state = {
        web3: null,
        accounts: []
    };
    describe('init', () => {
        it('compiled contract', async function() {
            this.timeout(30 * 1000);
            const contractPath = path.join(__dirname, '../contracts/TestContract.sol');
            const compiled = await SolidityCli.compileFile(contractPath);
            state.compiled = compiled[':TestContract'];
        });
        it('create web3', () => {
            state.web3 = new Web3();
        });
        it('create testnet', async () => {
            // create accounts
            const ganacheAccounts = new Array(20)
                .fill(0)
                .map(() => EthCrypto.createIdentity())
                .map(identity => {
                    state.accounts.push(identity);
                    const twoStripped = identity.privateKey.replace(/^.{2}/g, '');
                    return {
                        secretKey: new Buffer(twoStripped, 'hex'),
                        balance: state.web3.utils.toWei('100', 'ether')
                    };
                });
            state.web3.setProvider(ganache.provider({
                accounts: ganacheAccounts
            }));
        });
        it('deploy test-contract', async () => {
            const account = state.accounts.pop();
            const gasPrice = await state.web3.eth.getGasPrice();

            const rawTx = {
                from: account.address,
                gasPrice: parseInt(gasPrice),
                data: state.compiled.bytecode
            };
            const estimateGas = await state.web3.eth.estimateGas(rawTx);
            rawTx.gasLimit = estimateGas * 5;

            const receipt = await state.web3.eth.sendTransaction(rawTx);
            state.contractAddress = receipt.contractAddress;
            assert.ok(state.contractAddress);
        });
        it('create contract-instance', async () => {
            state.contract = new state.web3.eth.Contract(
                JSON.parse(state.compiled.interface),
                state.contractAddress
            );
            assert.ok(state.contract);
        });
        it('should get the public value out of the contract', async () => {
            const value = await state.contract.methods.onePublicValue().call();
            assert.equal(value, 1337);
        });
    });
    describe('privateKey', () => {
        it('should be possible to use the keys with ganache', async () => {
            const web3 = new Web3();
            const ganacheAccounts = new Array(10)
                .fill(0)
                .map(() => EthCrypto.createIdentity())
                .map(identity => ({
                    secretKey: new Buffer(identity.privateKey.replace(/^.{2}/g, ''), 'hex'),
                    balance: web3.utils.toWei('100', 'ether')
                }));
            web3.setProvider(ganache.provider({
                accounts: ganacheAccounts
            }));
        });
        it('should be possible to sign transaction with the key', async () => {
            const identity = EthCrypto.createIdentity();

            const web3 = new Web3();
            web3.setProvider(ganache.provider({
                accounts: [{
                    secretKey: new Buffer(identity.privateKey.replace(/^.{2}/g, ''), 'hex'),
                    balance: web3.utils.toWei('100', 'ether')
                }]
            }));
            const gasPrice = await web3.eth.getGasPrice();
            const rawTx = {
                from: identity.address,
                to: '0x63dcee1fd1d814858acd4172bb20e1aa0c947c0a',
                value: parseInt(web3.utils.toWei('1', 'ether')),
                nonce: 0,
                gasLimit: 60000,
                gasPrice: parseInt(gasPrice)
            };
            const serializedTx = EthCrypto.signTransaction(
                rawTx,
                identity.privateKey
            );
            const receipt = await web3.eth.sendSignedTransaction(serializedTx);
            assert.equal(receipt.blockNumber, 1);
            assert.equal(receipt.status, 1);
        });
    });
    describe('hash', () => {
        describe('.keccak256()', () => {
            it('number: should create the same hash as solidity', async () => {
                const nr = 1337;
                const solHash = await state.contract
                    .methods.hashNumber(nr)
                    .call();

                const jsHash = EthCrypto.hash.keccak256([{
                    type: 'uint256',
                    value: nr
                }]);
                assert.equal(solHash, jsHash);
            });
            it('string: should create the same hash as solidity', async () => {
                const str = 'foobar';
                const jsHash = EthCrypto.hash.keccak256([{
                    type: 'string',
                    value: str
                }]);
                const solHash = await state.contract
                    .methods.hashString(str)
                    .call();
                assert.equal(jsHash, solHash);
            });
            it('multi: shoud create same hash as solidity', async () => {
                const str = 'foobar';
                const bool = false;
                const uint = 23453;
                const jsHash = EthCrypto.hash
                    .keccak256([{
                        type: 'string',
                        value: str
                    }, {
                        type: 'uint256',
                        value: uint
                    }, {
                        type: 'bool',
                        value: bool
                    }]);
                const solHash = await state.contract
                    .methods.hashMulti(
                        str,
                        uint,
                        bool
                    )
                    .call();
                assert.equal(jsHash, solHash);
            });
        });
        describe('.prefixedHash()', () => {
            return; // TODO
            /* it('should create the same hash as web3.accounts.sign()', async () => {
                const ident = EthCrypto.createIdentity();
                const str = 'foobar';
                const hash = EthCrypto.hash.keccak256([{
                    type: 'string',
                    value: str
                }]);
                console.log('hash: ' + hash);
                const account = web3.eth.accounts.privateKeyToAccount(ident.privateKey);
                const sig = account.sign({
                    type: 'bytes32',
                    value: hash
                });
                const jsHash = EthCrypto.hash.prefixedHash(hash);
                assert.equal(jsHash, sig.messageHash);
            });
            it('should be possible to create the same prefixed hash in solidity', async () => {
                const str = 'foobar';
                const hash = EthCrypto.hash.keccak256([{
                    type: 'string',
                    value: str
                }]);

                console.log('hash: ' + hash);

                const jsHash = EthCrypto.hash.prefixedHash(hash);
                console.log('prefixedHash: ' + jsHash);

                const hash2 = EthCrypto.hash.keccak256([{
                    type: 'string',
                    value: '\x19Ethereum Signed Message:\n32'
                }, {
                    type: 'bytes32',
                    value: hash
                }]);
                console.log('keccak256: ' + hash2);

                const solHash = await state.contract
                    .methods
                    .signHashLikeWeb3Sign(hash)
                    .call();
                console.log('= solHash: ' + solHash);
                assert.equal(jsHash, solHash);
            });*/
        });
    });
    describe('sign', () => {
        it('should validate the signature on solidity', async () => {
            const ident = EthCrypto.createIdentity();
            const message = AsyncTestUtil.randomString(12);
            const messageHash = EthCrypto.hash.keccak256([{
                type: 'string',
                value: message
            }]);

            const signature = await EthCrypto.sign(
                ident.privateKey,
                messageHash
            );
            const jsSigner = EthCrypto.recover(signature, messageHash);
            assert.equal(jsSigner, ident.address);
            const vrs = EthCrypto.vrs.fromString(signature);
            const solSigner = await state.contract
                .methods.recoverSignature(
                    messageHash,
                    vrs.v,
                    vrs.r,
                    vrs.s
                )
                .call();
            assert.equal(solSigner, ident.address);
        });
        it('should validate with the message instead of the hash', async () => {
            const ident = EthCrypto.createIdentity();
            const message = 'foobar';
            const messageHash = EthCrypto.hash.keccak256([{
                type: 'string',
                value: message
            }]);
            const signature = await EthCrypto.sign(
                ident.privateKey,
                messageHash
            );
            const vrs = EthCrypto.vrs.fromString(signature);
            const solSigner = await state.contract
                .methods.recoverSignatureFromMessage(
                    message,
                    vrs.v,
                    vrs.r,
                    vrs.s
                )
                .call();
            assert.equal(solSigner, ident.address);
        });
    });
    describe('.calculateContractAddress()', () => {
        it('should calculate the correct address', async () => {
            const account = state.accounts.pop();
            const gasPrice = await state.web3.eth.getGasPrice();

            const calculatedAddress = EthCrypto.calculateContractAddress(
                account.address,
                0
            );

            const rawTx = {
                from: account.address,
                gasPrice: parseInt(gasPrice),
                data: state.compiled.bytecode
            };
            const estimateGas = await state.web3.eth.estimateGas(rawTx);
            rawTx.gasLimit = estimateGas * 5;

            const receipt = await state.web3.eth.sendTransaction(rawTx);
            assert.equal(receipt.contractAddress, calculatedAddress);
        });
        it('should also work with higher nonce', async () => {
            const account = state.accounts.pop();
            const account2 = state.accounts.pop();
            const gasPrice = await state.web3.eth.getGasPrice();

            // send 3 transactions
            await Promise.all(
                new Array(3)
                .fill(0)
                .map(async () => {
                    const rawTx = {
                        from: account.address,
                        to: account2.address,
                        gasPrice: parseInt(gasPrice),
                        value: 1
                    };
                    const estimateGas = await state.web3.eth.estimateGas(rawTx);
                    rawTx.gasLimit = estimateGas * 2;
                    await state.web3.eth.sendTransaction(rawTx);
                })
            );

            const calculatedAddress = EthCrypto.calculateContractAddress(
                account.address,
                3
            );

            const rawTx = {
                from: account.address,
                gasPrice: parseInt(gasPrice),
                nonce: 3,
                data: state.compiled.bytecode
            };
            const estimateGas = await state.web3.eth.estimateGas(rawTx);
            rawTx.gasLimit = estimateGas * 5;

            const receipt = await state.web3.eth.sendTransaction(rawTx);
            assert.equal(receipt.contractAddress, calculatedAddress);
        });
    });
});
