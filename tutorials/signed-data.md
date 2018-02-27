# Tutorial: Sign and validate data with solidity

In this tutorial we will sign data with JavaScript and later validate the signature in a solidity smart-contract.

## Prerequisites

First we create two identities, `creator` and `receiver`.

```javascript
const EthCrypto = require('eth-crypto');

const creatorIdentity = EthCrypto.createIdentity();
const recieverIdentity = EthCrypto.createIdentity();
```

Then we start a local testnet to use later. At the testnet, we give the `creatorIdentity` a balance of 10 ether. We also give one ether to the `recieverIdentity` so we have enough gas to send transactions.

```javascript
const Web3 = require('web3');
const ganache = require('ganache-cli');

// create a web3-instance
const web3 = new Web3();

// create a ganache-provider
const ganacheProvider = ganache.provider({
    accounts: [
        // we preset the balance of our creatorIdentity to 10 ether
        {
            secretKey: creatorIdentity.privateKey,
            balance: web3.utils.toWei('10', 'ether')
        },
        // we also give some wei to the recieverIdentity
        // so it can send transaction to the chain
        {
            secretKey: recieverIdentity.privateKey,
            balance: web3.utils.toWei('1', 'ether')
        }
    ]
});

// set ganache to web3 as provider
web3.setProvider(ganacheProvider);
```

## Create a smart-contract that can validate signatures

Lets create an example-contract. The contract will be a donation-bag which contains some ether and has an owner. Whenever someone submits a valid donation-signature, he recieves a part of the contracts value. This allows the creator of the contract to give signed data to people **off-chain** which they can later use to claim the value **on-chain**.

Write the contracts code in a file called `DonationBag.sol`. **Check out it's content [here](../contracts/DonationBag.sol)**.

As you can see, the contract has some methods:

- **DonationBag()**: The constructor which is called when the contract is created. Here we set the owner of the DonationBag
- **default-function**: The default function is called when we send ether to the contract without doing anything. This is needed so the contract can recieve value.
- **prefixedHash()**: Creates a hash of the data which must be signed by the creator.
- **isSignatureValid()**: Checks if a given signature is really signed by the sender and contains the correct content.
- **recieveDonation():** This is called by the receiver when the donation is claimed.

## Deploy the contract

Before we can put the contract on our local blockchain. We have to compile the solidity-code to bytecode. We will do this by using the javascript-version of the `solc` compiler.

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

Now that we have the bytecode of the contract, we can submit a transaction to create a new instance of it at our local testchain.

```javascript
// create contract-create-code
const createCode = EthCrypto.txDataByCompiled(
    compiled.interface, // abi
    compiled.bytecode, // bytecode
    [creatorIdentity.address] // constructor-arguments
);

// create a transaction the deploys the contract
const rawTx = {
    from: creatorIdentity.address,
    nonce: 0,
    gasLimit: 5000000,
    gasPrice: 5000000000,
    data: createCode
};
const serializedTx = EthCrypto.signTransaction(
    rawTx,
    creatorIdentity.privateKey
);

// submit to local chain
const receipt = await web3.eth.sendSignedTransaction(serializedTx);
const contractAddress = receipt.contractAddress;

console.log(contractAddress);
// > '0xCF3d784002721227F36575eD051Ea2171a528b7D' <- this is the address of our contract
```

Awesome. The contract is now on the blockchain. To check if it is deployed correctly, lets call a function on it.

```javascript

// create contract instance
const contractInstance = new web3.eth.Contract(
    JSON.parse(compiled.interface),
    contractAddress
);

// check owner
const owner = await contractInstance.methods.owner().call();
console.dir(owner); // same as creatorIdentity.address
```

Before we can sign donations, we have to send some value to the contract.

```javascript
const rawTx2 = {
    from: creatorIdentity.address,
    to: contractAddress,
    nonce: 1, // increased by one
    value: parseInt(web3.utils.toWei('3', 'ether')),
    gas: 600000,
    gasPrice: 20000000000
};
const serializedTx2 = EthCrypto.signTransaction(
    rawTx2,
    creatorIdentity.privateKey
);
await web3.eth.sendSignedTransaction(serializedTx2);

// check balance
const balance = await contractInstance.methods.getBalance().call();
console.log(balance); // > '1000000000000000000'
```

## Sign the message

Lets sign a message with the `creatorIdentity` where the donator validates a donation to the `recieverIdentity`.

```javascript
const signHash = EthCrypto.hash.keccak256([
    { // prefix
        type: 'string',
        value: 'Signed for DonationBag:'
    }, { // contractAddress
        type: 'address',
        value: contractAddress
    }, { // receiverAddress
        type: 'address',
        value: recieverIdentity.address
    }
]);

const signature = EthCrypto.sign(
    creatorIdentity.privateKey,
    signHash
);
```

As you can see, we did not sign the reciever-address directly but a hash that was build of some concated data:

- **Prefix:** To ensure the creator cannot be tricked into accidentially singing a valid ethereum-transaction, we prefix the signed data with something unique to our system. In this case lets take the string `Signed for DonationBag:`.
- **contractAddress:** It might be possible that the creator has more than one instance of the contract deployed to the blockchain. In this case it's signatures might be replayed to other instances. As prevention of this attack, we also add the contracts address to the signed hash.
- **receiverAddress:** By signing this address, the creator proves that the given address should recieve the donation.

## Recover the signature on the blockchain

The reciever now has a signature from the creator which he can send to the contract to claim the donation.

```javascript

// we have to split the signature-hex-string into its parts
const vrs = EthCrypto.vrs.fromString(signature);
/* > {
    v: '0x1c',
    r: '0x525db3ea66...',
    s: '0x78544aebe6...'
    }
*/

// create the transaction-data for the recieveDonation()-call
const recieveCode = contractInstance
    .methods.recieveDonation(
        vrs.v,
        vrs.r,
        vrs.s
    ).encodeABI();

// create+sign the transaction
const recieveTx = {
    from: recieverIdentity.address,
    to: contractAddress,
    nonce: 0,
    gasLimit: 5000000,
    gasPrice: 5000000000,
    data: recieveCode
};
const serializedRecieveTx = EthCrypto.signTransaction(
    recieveTx,
    recieverIdentity.privateKey
);

// submit the tx
const receipt3 = await web3.eth.sendSignedTransaction(serializedRecieveTx);
```

If everything has gone right, the receiver should now have more ether then before. Let's check this.

```javascript
const receiverBalance = await web3.eth.getBalance(recieverIdentity.address);
console.dir(receiverBalance);
// '1999802840000000000'
```
