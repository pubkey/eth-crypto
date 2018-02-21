const ganache = require('ganache-cli');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const AsyncTestUtil = require('async-test-util');
const assert = require('assert');
const EthereumEncryption = require('../dist/lib/index');
const compiled = require('../gen/TestContract.json');


describe('integration.test.js', () => {
    const state = {
        web3: null,
        accounts: []
    };
    describe('init', () => {
        it('create web3', () => {
            state.web3 = new Web3();
        });
        it('create testnet', async () => {
            // create accounts
            const ganacheAccounts = new Array(20)
                .fill(0)
                .map(() => EthereumEncryption.createIdentity())
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
                data: compiled.code
            };
            const estimateGas = await state.web3.eth.estimateGas(rawTx);
            rawTx.gasLimit = estimateGas * 5;

            const receipt = await state.web3.eth.sendTransaction(rawTx);
            state.contractAddress = receipt.contractAddress;
            assert.ok(state.contractAddress);
        });
        it('create contract-instance', async () => {
            state.contract = new state.web3.eth.Contract(
                compiled.interface,
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
                .map(() => EthereumEncryption.createIdentity())
                .map(identity => ({
                    secretKey: new Buffer(identity.privateKey.replace(/^.{2}/g, ''), 'hex'),
                    balance: web3.utils.toWei('100', 'ether')
                }));
            web3.setProvider(ganache.provider({
                accounts: ganacheAccounts
            }));
        });
        it('should be possible to sign transaction with the key', async () => {
            const identity = EthereumEncryption.createIdentity();

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
            const tx = new Tx(rawTx);
            tx.sign(new Buffer(identity.privateKey.replace(/^.{2}/g, ''), 'hex'));
            const serializedTx = tx.serialize().toString('hex');
            const receipt = await web3.eth.sendSignedTransaction(serializedTx);
            assert.equal(receipt.blockNumber, 1);
            assert.equal(receipt.status, 1);
        });
    });
    describe('hash', () => {
        it('number: should create the same hash as solidity', async () => {
            const nr = 1337;
            const solHash = await state.contract
                .methods.hashNumber(nr)
                .call();

            const jsHash = EthereumEncryption.hash(nr);
            assert.equal(solHash, jsHash);
        });
        it('string: should create the same hash as solidity', async () => {
            const str = 'foobar';
            const jsHash = EthereumEncryption.hash(str);
            const solHash = await state.contract
                .methods.hashString(str)
                .call();
            assert.equal(jsHash, solHash);
        });
    });
    describe('sign', () => {
        it('should validate the signature on solidity', async () => {
            const ident = EthereumEncryption.createIdentity();
            const message = AsyncTestUtil.randomString(12);
            const messageHex = EthereumEncryption.util.web3.utils.toHex(message);
            const signature = await EthereumEncryption.sign(
                ident.privateKey,
                messageHex
            );
            console.dir(signature);

            const solSigner = await state.contract
                .methods.recoverSignature(
                    messageHex,
                    signature.v,
                    signature.r,
                    signature.s
                )
                .call();

            assert.equal(solSigner, ident.address);

            process.exit();
        });
    });
});
