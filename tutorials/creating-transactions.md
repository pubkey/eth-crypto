# Creating Keys and use them for ethereum-transactions

In this tutorial we will create an ethereum-identity and use it so send transactions to the blockchain.


## Creating a new identity
An identity is an object with a privateKey and the corresponding publicKey and its address. To create a fresh identity, the function `createIdentity` is called which returns one.

```javascript
import EthCrypto from 'eth-crypto';

const identity = EthCrypto.createIdentity();

console.dir(identity);
/* > {
    address: '0x3f243FdacE01Cfd9719f7359c94BA11361f32471',
    privateKey: '0x107be946709e41b7895eea9f2dacf998a0a9124acbb786f0fd1a826101581a07',
    publicKey: 'bf1cc3154424dc22191941d9f4f50b063a2b663a2337e5548abea633c1d06ece...'
} */
```

When we code things in the ethereum ecosystem, it is standard to represent data as hex-strings. You can see that hex-strings start with a `0x` which marks them as so.

The identity consists of:

- The **privateKey** which must never be revealed to anyone. It can be used to sign and decrypted messages and to create it's publicKey.
- The **publicKey** is revealed whenever something is signed with the privateKey. It's also common to send the publicKey to other humans so that they can encrypt data with it, which then can only decrypted by the correct privateKey. It's important to know that there are [two ways to represent](https://github.com/bitpay/bitcore-lib/blob/master/docs/publickey.md) a publicKey compresssed and uncompressed. EthCrypto always creates the uncompressed key which starts with `0x04`. Compressed keys start with `0x03` or `0x02`. To represent the key, we strip the starting `04` away from it and internally add it when doing cryptographic calls.
- The **address** is calculated from the last 20 bytes of the keccak-256-hash of the publicKey. It is used to represent an identity. Notice that there is no way to calculate the publicKey from an address. This means that whenever we want to encrypt data for someone, we first have to get the publicKey. There are two ways to represent an address. The normal address is lowercase and represents just the 20 bytes of the hash. The checksum-format contains uppercase-letters which the purpose of detecting errors when the address is entered manually.


# creating a transaction

An ethereum-transaction is basically a json-object with defined values. Lets create one, where we send some ether to another address.

```javascript
    const transaction = {
        from: identity.address, // sender address
        to: '0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0', // reciever address
        value: 10000000 // amount of wei we want to send
        gasPrice: 100000,
        gasLimit: 21000
    };
```
