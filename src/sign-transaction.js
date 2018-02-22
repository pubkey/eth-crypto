import Tx from 'ethereumjs-tx';
import publicKeyByPrivateKey from './public-key-by-private-key';
import addressByPublicKey from './address-by-public-key';

export default function signTransaction(
    rawTx,
    privateKey
) {

    // check if privateKey->address matches rawTx.from
    const publicKey = publicKeyByPrivateKey(privateKey);
    const address = addressByPublicKey(publicKey);
    if (address != rawTx.from)
        throw new Error('EthCrypto.signTransaction(): rawTx.from does not match the address of the privateKey');

    const privateKeyBuffer = new Buffer(privateKey.replace(/^.{2}/g, ''), 'hex');
    const tx = new Tx(rawTx);
    tx.sign(privateKeyBuffer);
    const serializedTx = tx.serialize().toString('hex');
    return serializedTx;
}
