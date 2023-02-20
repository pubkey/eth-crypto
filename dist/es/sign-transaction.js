import { Transaction } from '@ethereumjs/tx';
import { publicKeyByPrivateKey } from './public-key-by-private-key';
import { toAddress as addressByPublicKey } from './public-key';
export function signTransaction(rawTx, privateKey) {
  var txOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // check if privateKey->address matches rawTx.from
  var publicKey = publicKeyByPrivateKey(privateKey);
  var address = addressByPublicKey(publicKey);
  if (address != rawTx.from) throw new Error('EthCrypto.signTransaction(): rawTx.from does not match the address of the privateKey');
  var privateKeyBuffer = Buffer.from(privateKey.replace(/^.{2}/g, ''), 'hex');
  var tx = Transaction.fromTxData(rawTx, txOptions);
  var signedTx = tx.sign(privateKeyBuffer);
  var serializedTx = signedTx.serialize().toString('hex');
  return serializedTx;
}