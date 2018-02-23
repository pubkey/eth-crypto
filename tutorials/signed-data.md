# Sign and validate data with solidity

In this tutorial we will sign data with javascript and later validate the signatur at a solidity smart-contract.


## sign the data
First we create an identity and sign a message with it.

```javascript
const EthCrypto = require('eth-crypto');
const creatorIdentity = EthCrypto.createIdentity();
const recieverIdentity = EthCrypto.createIdentity();
const message = 'Give me the money:' + recieverIdentity.address;

const signature = EthCrypto.sign(
    identity.privateKey,
    message
);

console.dir(signature);
/* > {
      v: '0x1b',
      r: '0xc04b809d8f33c46ff80c44ba58e866...',
      s: '0x757a3393b695ba83b2aba0c35c1503...'
  }
 */
```


## create a smart-contract that validate the signature
Lets create an example-contract. The contract will be a donation-bag which contains some ether and has an owner.
Whenever someone submits a valid donation-signature, he recieves a part of the contracts value.

Write this in a file called `DonationBag.sol`.

```javascript
pragma solidity 0.4.20;

contract DonationBag {

    // dontaion-signatures must be created by the owner
    address owner;

    // each donation contains this amount of wei
    uint amountPerDonation = 1000 * 1000;

    // one address can recieve only one donation
    // the ones already recieved one, are stored here
    mapping (address => bool) alreadyRecieved;

    // constructor
    function DonationBag(address _owner) public {
        owner = _owner;
    }

    /**
     * checks if the signature and message is valid
     * if yes we send some wei to the submitter
     */
    function recieveDonation(
        bytes32 message,
        uint8 v,
        bytes32 r,
        bytes32 s
        ) public {

        // already recieved donation -> revert
        if(alreadyRecieved[msg.sender] == true) revert();

        address signer = ecrecover(
                message,
                v, r, s
            );

        // signature not valid -> revert
        if(signer != owner) revert();


        // all valid -> send wei
        msg.sender.transfer(amountPerDonation);
    }
}

```
