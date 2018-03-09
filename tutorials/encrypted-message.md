# Tutorial: Encrypt and sign a message

With ethereum-keys you cannot only interact with the blockchain, but also use them to send message over mutual untrusted channels in a secure way. In this tutorial we will use ethereum-identites to send messages like you would do in an decentralized chat-app.

## Prerequisites

First we create two identities, `Alice` and `Bob`. In our case `Alice` want to send the message `My name is Satoshi Buterin` to `Bob`.

```javascript
const EthCrypto = require('eth-crypto');

const alice = EthCrypto.createIdentity();
const bob = EthCrypto.createIdentity();
const secretMessage = 'My name is Satoshi Buterin';
```

## Encrypt and sign the message

Before we send the message from `Alice` to `Bob`, we want to ensure that

- Only `Bob` can read the message
- `Bob` can be sure that the message really comes from `Alice`

To do this, we first sign the message with alice's privateKey and then encrypt the message and the signature with bob's publicKey.

```javascript
const signature = EthCrypto.sign(
    alice.privateKey,
    EthCrypto.hash.keccak256(secretMessage)
);
const payload = {
    message: secretMessage,
    signature
};
const encrypted = await EthCrypto.encryptWithPublicKey(
    bob.publicKey, // by encryping with bobs publicKey, only bob can decrypt the payload with his privateKey
    JSON.stringify(payload) // we have to stringify the payload before we can encrypt it
);
/*  { iv: 'c66fbc24cc7ef520a7...',
  ephemPublicKey: '048e34ce5cca0b69d4e1f5...',
  ciphertext: '27b91fe986e3ab030...',
  mac: 'dd7b78c16e462c42876745c7...'
    }
*/

// now we send the encrypted object to bob over the internet.. *bieb, bieb, blob*
```

## Decrypt and verify the payload

When bob receives the message, he starts with decrypting it with his privateKey and then verifies the signature.

```javascript
const decrypted = await EthCrypto.decryptWithPrivateKey(
    bob.privateKey,
    encrypted
);
const decryptedPayload = JSON.parse(decrypted);

// check signature
const senderAddress = EthCrypto.recover(
    decryptedPayload.signature,
    EthCrypto.hash.keccak256(payload.message)
);

console.log(
    'Got message from ' +
    senderAddress +
    ': ' +
    decryptedPayload.message
);
// > 'Got message from 0x19C24B2d99FB91C5...: "My name is Satoshi Buterin" Buterin'
```

## Creating an answer

Now that `Bob` got the message, he can also answer back to alice.
To to this he has to recover the publicKey of alice with `recoverPublicKey()`.

```javascript
const answerMessage = 'And I am Bob Kelso';
const answerSignature = EthCrypto.sign(
    bob.privateKey,
    EthCrypto.hash.keccak256(answerMessage)
);
const answerPayload = {
    message: answerMessage,
    signature: answerSignature
};

const alicePublicKey = EthCrypto.recoverPublicKey(
    decryptedPayload.signature,
    EthCrypto.hash.keccak256(payload.message)
);

const encryptedAnswer = await EthCrypto.encryptWithPublicKey(
    alicePublicKey,
    JSON.stringify(answerPayload)
);
// now we send the encryptedAnswer to alice over the internet.. *bieb, bieb, blob*
```
