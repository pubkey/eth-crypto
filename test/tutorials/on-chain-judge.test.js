/**
 * at this tests, we run the code which is used in the tutorials
 * to ensure they work as expected
 */

const ganache = require('ganache-cli');
const Web3 = require('web3');
const assert = require('assert');
const EthCrypto = require('../../dist/lib/index');

describe('state-channel.md', () => {
    it('all', async () => {
        const alice = EthCrypto.createIdentity();
        const bob = EthCrypto.createIdentity();
        const carol = EthCrypto.createIdentity();
        const dave = EthCrypto.createIdentity();
        const eve = EthCrypto.createIdentity();
        const allIdentites = [alice, bob, carol, dave, eve];

        const web3 = new Web3();
        const ganacheProvider = ganache.provider({
            accounts: allIdentites
                .map(ident => ident.privateKey)
                .map(secretKey => ({
                    secretKey,
                    balance: web3.utils.toWei('10', 'ether')
                }))
        });
        web3.setProvider(ganacheProvider);


        let compiled;
        const fastMode = true; // TODO check in config if really fast-mode
        if (!fastMode) {
            const solc = require('solc');
            const fs = require('fs');
            const path = require('path');
            const contractPath = path.join(__dirname, '../../contracts/OnChainJudge.sol');

            // read solidity-code from file
            const contractCode = fs.readFileSync(contractPath, 'utf8');

            // compile the code into an object
            compiled = solc.compile(contractCode, 1).contracts[':OnChainJudge'];

        } else {
            compiled = require('../../gen/OnChainJudge.json');
            compiled.bytecode = compiled.code;
            compiled.interface = JSON.stringify(compiled.interface);
        }

        const createCode = EthCrypto.txDataByCompiled(
            compiled.interface, // abi
            compiled.bytecode, // bytecode
            [
                [
                    alice.address,
                    bob.address,
                    carol.address
                ]
            ] // constructor-arguments
        );

        // create create-tx
        const rawTx = {
            from: alice.address,
            nonce: 0,
            gasLimit: 5000000,
            gasPrice: 5000000000,
            data: createCode
        };
        const serializedTx = EthCrypto.signTransaction(
            rawTx,
            alice.privateKey
        );

        // submit
        const receipt = await web3.eth.sendSignedTransaction(serializedTx);
        const contractAddress = receipt.contractAddress;

        assert.ok(contractAddress);
        assert.equal(receipt.status, 1);

        const contractInstance = new web3.eth.Contract(
            JSON.parse(compiled.interface),
            contractAddress
        );

        // check board members
        const members = await contractInstance.methods.getBoardMembers().call();
        assert.equal(members.length, 3);
        assert.equal(members[0], alice.address);



        // voting for new board-member
        const boardMemberVotingCode = contractInstance
            .methods.createVoting(
                true,
                'add dave to members',
                dave.address,
                0
            ).encodeABI();
        const boardMemberVotingRawTx = {
            from: alice.address,
            to: contractAddress,
            nonce: 1,
            gasLimit: 5000000,
            gasPrice: 5000000000,
            data: boardMemberVotingCode
        };
        const boardMemberVotingTx = EthCrypto.signTransaction(
            boardMemberVotingRawTx,
            alice.privateKey
        );
        console.log('-----');
        console.dir(boardMemberVotingTx);
        await web3.eth.sendSignedTransaction(boardMemberVotingTx);



        process.exit();
    });
});
