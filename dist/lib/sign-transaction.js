'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = signTransaction;

var _tx = require('@ethereumjs/tx');

var _publicKeyByPrivateKey = require('./public-key-by-private-key');

var _publicKeyByPrivateKey2 = _interopRequireDefault(_publicKeyByPrivateKey);

var _publicKey = require('./public-key');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function signTransaction(rawTx, privateKey) {
    var txOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


    // check if privateKey->address matches rawTx.from
    var publicKey = (0, _publicKeyByPrivateKey2['default'])(privateKey);
    var address = (0, _publicKey.toAddress)(publicKey);
    if (address != rawTx.from) throw new Error('EthCrypto.signTransaction(): rawTx.from does not match the address of the privateKey');

    var privateKeyBuffer = Buffer.from(privateKey.replace(/^.{2}/g, ''), 'hex');

    var tx = _tx.Transaction.fromTxData(rawTx, txOptions);
    var signedTx = tx.sign(privateKeyBuffer);
    var serializedTx = signedTx.serialize().toString('hex');
    return serializedTx;
}