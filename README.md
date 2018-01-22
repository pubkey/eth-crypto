# ethereum-encryption

A javascript module to encrypt, decrypt, sign and verify data with an ethereum public- or privateKey. This internally uses [bitcore-lib](https://github.com/bitpay/bitcore-lib) and [bitcore-ecies](https://github.com/bitpay/bitcore-ecies).

`Warning: There was no audit on this code. Use this on your own risk.`

## Install

```bash
  npm install ethereum-encryption --save
```

```javascript
// es6
import EthereumEncryption from 'ethereum-encryption';

// node
const EthereumEncryption = require('ethereum-encryption');
```

## API

### createPrivateKey()

Creates a new privateKey from random bytes and returns it as hex-string.

```javascript

  const privateKey = EthereumEncryption.createPrivateKey();
  // '2400238629a674a372694567f949c94847b76607de151433587c20547aa90460'
```

### publicKeyFromPrivateKey()

Derives the publicKey from a privateKey and returns it as hex-string.

```javascript
  const publicKey = EthereumEncryption.publicKeyFromPrivateKey(
      '2400238629a674a372694567f949c94847b76607de151433587c20547aa90460'
  );
  // '03a34d6aef3eb42335fb3cacb59478c0b44c0bbeb8bb4ca427dbc7044157a5d24b'
```

### publicKeyToAddress()

Derives the ethereum-address from the publicKey.

```javascript
  const address = EthereumEncryption.publicKeyToAddress(
      '03a34d6aef3eb42335fb3cacb59478c0b44c0bbeb8bb4ca427dbc7044157a5d24b'
  );
  // '0x63dcee1fd1d814858acd4172bb20e1aa0c947c0a'
```

### hash()

Creates the `sha3_256`-hash of the given string.

```javascript
  const hash = EthereumEncryption.hash('foobar');
  // '09234807e4af85f17c66b48ee3bca89dffd1f1233659f9f940a2b17b0b8c6bc5'
```

### signHash()

Signs the sha3_256-hash with the privateKey. Returns the signature as hex-string.

```javascript
  const signature = EthereumEncryption.signHash(
      '2400238629a674a372694567f949c94847b76607de151433587c20547aa90460', // privateKey
      '09234807e4af85f17c66b48ee3bca89dffd1f1233659f9f940a2b17b0b8c6bc5' // hash
  );
  // '40f50efc7aee9d414b5621a5818a6cc8f89bc000087d6a41ed9cc66b605365295279d3bbd7710f9fc4c4d73c39f74a0e5c116168e69d1341c3a5467142f3e63a'
```

### verifyHashSignature()

Check if signature of the hash was signed by the privateKey of the publicKey. Returns `true` if valid, `false` if not.

```javascript
  const valid = verifyHashSignature.verifyHashSignature(
      '03a34d6aef3eb42335fb3cacb59478c0b44c0bbeb8bb4ca427dbc7044157a5d24b', // publicKey
      '09234807e4af85f17c66b48ee3bca89dffd1f1233659f9f940a2b17b0b8c6bc5', // hash
      '40f50efc7aee9d414b5621a5818a6cc8f89bc000087d6a41ed9cc66b605365295279d3bbd7710f9fc4c4d73c39f74a0e5c116168e69d1341c3a5467142f3e63a' // signature
  );
  // true
```

### encryptWithPublicKey()

Encrypts the message with the publicKey. Returns the encrypted hex-string.

```javascript
    const encrypted = verifyHashSignature.encryptWithPublicKey(
        '03a34d6aef3eb42335fb3cacb59478c0b44c0bbeb8bb4ca427dbc7044157a5d24b', // publicKey
        'foobar' // data
    );
    // '0333eec583d04a55ce0aba9dbfb04035e8c6de4f501ecc9b26c08fa501a5ec1507ccd64457ceae9dd4f52abfa673912f2618bfb71392f864465d9bfe996bc0a2acf6133e14a689b7c1299c60eadf43f45adbb8a21543b0c4749aa9bc2a106a0f8e'
```

### decryptWithPrivateKey()

Decrypt the encrypted message with the privateKey. Returns the message as string.

```javascript
    const message = verifyHashSignature.decryptWithPrivateKey(
        '2400238629a674a372694567f949c94847b76607de151433587c20547aa90460', // privateKey
        '0333eec583d04a55ce0aba9dbfb04035e8c6de4f501ecc9b26c08fa501a5ec1507ccd64457ceae9dd4f52abfa673912f2618bfb71392f864465d9bfe996bc0a2acf6133e14a689b7c1299c60eadf43f45adbb8a21543b0c4749aa9bc2a106a0f8e' // encrypted-data
    );
    // 'foobar'
```
