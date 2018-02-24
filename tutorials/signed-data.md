# Tutorial: Sign and validate data with solidity

In this tutorial we will sign data with javascript and later validate the signatur in a solidity smart-contract.


## Prerequisites

First we create two identities, `creator` and `receiver`.

```javascript
const EthCrypto = require('eth-crypto');
const creatorIdentity = EthCrypto.createIdentity();
const recieverIdentity = EthCrypto.createIdentity();
```

Then we start a local testnet to use later. At the testnet, we givbe the creatorIdentity a balance of 10 ether.

```javascript
const Web3 = require('web3');
const ganache = require('ganache-cli');

// create a web3-instance
const web3 = new Web3();

// create a ganache-provider
const ganacheProvider = ganache.provider({
    // we preset the balance of our identity to 10 ether
    accounts: [{
        secretKey: creatorIdentity.privateKey,
        balance: web3.utils.toWei('10', 'ether')
    }]
});

// set ganache to web3 as provider
web3.setProvider(ganacheProvider);
```


## Create a smart-contract that can validate signatures
Lets create an example-contract. The contract will be a donation-bag which contains some ether and has an owner.
Whenever someone submits a valid donation-signature, he recieves a part of the contracts value. This allows the creator of the contract to give signed data to people **off-chain** which they can later use to claim the value **on-chain**.

Write the contracts code in a file called `DonationBag.sol`. See the content [here](../contracts/DonationBag.sol).

As you can see, the contract has some methods:

- DonationBag(): The constructor which is called when the contract is created. Here we set the owner of the DonationBag
- isSignatureValid(): checks if a given signature is really signed by the sender and contains the correct content.
- recieveDonation(): This is called by the receiver when the donation is claimed.

## Deploy the contract

Before we can put the contract on our local blockchain. We have to compile the solidity-code to bytecode.

```javascript
const solc = require('solc');
const fs = require('fs');
const path = require('path');
const contractPath = path.join(__dirname, '../contracts/DonationBag.sol');

// read solidity-code from file
const contractCode = fs.readFileSync(contractPath, 'utf8');

// compile the code into an object
const compiled = solc.compile(contractCode, 1).contracts[':DonationBag'];

console.dir(compiled);
/* > {
    interface: [...],
    bytecode: '10390f35b34156101ef57600...'
}
 */
```

Now that we have the bytecode of the contract, we can submit a transaction to create a new instance of it at our local blockchain.

```javascript
// create contract-create-code
const web3Contract = new web3.eth.Contract(JSON.parse(compiled.interface), null, {
    data: '0x' + compiled.bytecode
});
const createCode = web3Contract.deploy({
    arguments: [creatorIdentity.address] // this is the address in the DonationBag-constructor
}).encodeABI();


// create a transaction the deploys the contract
const rawTx = {
    from: creatorIdentity.address,
    nonce: 0,
    value: 1000000000000000000, // on creation we send 1 ether to the contract
    gasLimit: 5000000,
    gasPrice: 5000000000
};
const serializedTx = EthCrypto.signTransaction(
    rawTx,
    creatorIdentity.privateKey
);

// submit to local chain
const receipt = await web3.eth.sendSignedTransaction(serializedTx);

console.log(receipt.contractAddress);
// > '0xCF3d784002721227F36575eD051Ea2171a528b7D' <- this is the address of our contract
```
