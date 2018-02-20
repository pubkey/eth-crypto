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
        privateKeys: []
    };
    describe('init', () => {
        it('create web3', () => {
            state.web3 = new Web3();
        });
        it('create testnet', async () => {
            // create accounts
            const ganacheAccounts = new Array(20)
                .fill(0)
                .map(() => EthereumEncryption.createPrivateKey())
                .map(privateKey => {
                    state.privateKeys.push(privateKey);
                    return {
                        secretKey: new Buffer(privateKey, 'hex'),
                        balance: state.web3.utils.toWei('100', 'ether')
                    };
                });
            state.web3.setProvider(ganache.provider({
                accounts: ganacheAccounts
            }));
        });
        it('deploy test-contract', async () => {
            const privateKey = state.privateKeys.pop();
            const publicKey = EthereumEncryption.publicKeyFromPrivateKey(privateKey);
            const address = EthereumEncryption.publicKeyToAddress(publicKey);
            const gasPrice = await state.web3.eth.getGasPrice();

            const rawTx = {
                from: address,
                gasPrice: parseInt(gasPrice),
                data: compiled.code
            };
            const estimateGas = await state.web3.eth.estimateGas(rawTx);
            rawTx.gasLimit = estimateGas * 5;

            const receipt = await state.web3.eth.sendTransaction(rawTx);
            state.contractAddress = receipt.contractAddress;
            assert.ok(state.contractAddress);
        });
        it('create contract-instance', async()=>{
            state.contract = new state.web3.eth.Contract(
                compiled.interface,
                state.contractAddress
            );
            assert.ok(state.contract);
        });
    });
    describe('privateKey', () => {
        it('should be possible to use the keys with ganache', async () => {
            const web3 = new Web3();
            const ganacheAccounts = new Array(10)
                .fill(0)
                .map(() => EthereumEncryption.createPrivateKey())
                .map(privateKey => ({
                    secretKey: new Buffer(privateKey, 'hex'),
                    balance: web3.utils.toWei('100', 'ether')
                }));
            web3.setProvider(ganache.provider({
                accounts: ganacheAccounts
            }));
        });
        it('should be possible to sign transaction with the key', async () => {
            const privateKey = EthereumEncryption.createPrivateKey();
            const publicKey = EthereumEncryption.publicKeyFromPrivateKey(privateKey);
            const address = EthereumEncryption.publicKeyToAddress(publicKey);
            const web3 = new Web3();
            web3.setProvider(ganache.provider({
                accounts: [{
                    secretKey: new Buffer(privateKey, 'hex'),
                    balance: web3.utils.toWei('100', 'ether')
                }]
            }));
            const gasPrice = await web3.eth.getGasPrice();
            const rawTx = {
                from: address,
                to: '0x63dcee1fd1d814858acd4172bb20e1aa0c947c0a',
                value: parseInt(web3.utils.toWei('1', 'ether')),
                nonce: 0,
                gasLimit: 60000,
                gasPrice: parseInt(gasPrice)
            };
            const tx = new Tx(rawTx);
            tx.sign(new Buffer(privateKey, 'hex'));
            const serializedTx = tx.serialize().toString('hex');
            const receipt = await web3.eth.sendSignedTransaction(serializedTx);
            assert.equal(receipt.blockNumber, 1);
            assert.equal(receipt.status, 1);
        });
    });
    describe('hash', () => {
        it('should create the same hash from string as solidity', async()=>{
            const str = EthereumEncryption.hash(AsyncTestUtil.randomString(12));
            const jshash = EthereumEncryption.hash(str);

        });
    });
});
