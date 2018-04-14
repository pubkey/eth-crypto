import Tx from 'ethereumjs-tx';
import publicKeyByPrivateKey from './public-key-by-private-key';
import { toAddress as addressByPublicKey } from './public-key';

export default function signTransaction(rawTx, privateKey) {

    // check if privateKey->address matches rawTx.from
    var publicKey = publicKeyByPrivateKey(privateKey);
    var address = addressByPublicKey(publicKey);
    if (address != rawTx.from) throw new Error('EthCrypto.signTransaction(): rawTx.from does not match the address of the privateKey');

    var privateKeyBuffer = new Buffer(privateKey.replace(/^.{2}/g, ''), 'hex');
    var tx = new Tx(rawTx);
    tx.sign(privateKeyBuffer);
    var serializedTx = tx.serialize().toString('hex');
    return serializedTx;
}