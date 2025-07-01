
import { createTxFromRPC } from '@ethereumjs/tx';
import {
    bytesToHex
} from '@ethereumjs/util';
import { publicKeyByPrivateKey } from './public-key-by-private-key';
import {
    toAddress as addressByPublicKey
} from './public-key';

export async function signTransaction(
    rawTx,
    privateKey,
    txOptions = {}
) {
    // check if privateKey->address matches rawTx.from
    const publicKey = publicKeyByPrivateKey(privateKey);
    const address = addressByPublicKey(publicKey);
    if (address != rawTx.from)
        throw new Error('EthCrypto.signTransaction(): rawTx.from does not match the address of the privateKey');

    const privateKeyBuffer = Buffer.from(privateKey.replace(/^.{2}/g, ''), 'hex');

    const tx = await createTxFromRPC(rawTx, txOptions);
    const signedTx = tx.sign(privateKeyBuffer);
    const serializedTx = bytesToHex(signedTx.serialize());

    return serializedTx;
}
