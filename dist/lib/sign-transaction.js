"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signTransaction = signTransaction;
var _tx = require("@ethereumjs/tx");
var _publicKeyByPrivateKey = require("./public-key-by-private-key");
var _publicKey = require("./public-key");
function signTransaction(rawTx, privateKey) {
  var txOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // check if privateKey->address matches rawTx.from
  var publicKey = (0, _publicKeyByPrivateKey.publicKeyByPrivateKey)(privateKey);
  var address = (0, _publicKey.toAddress)(publicKey);
  if (address != rawTx.from) throw new Error('EthCrypto.signTransaction(): rawTx.from does not match the address of the privateKey');
  var privateKeyBuffer = Buffer.from(privateKey.replace(/^.{2}/g, ''), 'hex');
  var tx = _tx.Transaction.fromTxData(rawTx, txOptions);
  var signedTx = tx.sign(privateKeyBuffer);
  var serializedTx = signedTx.serialize().toString('hex');
  return serializedTx;
}