'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = signTransaction;

var _ethereumjsTx = require('ethereumjs-tx');

var _ethereumjsTx2 = _interopRequireDefault(_ethereumjsTx);

var _publicKeyByPrivateKey = require('./public-key-by-private-key');

var _publicKeyByPrivateKey2 = _interopRequireDefault(_publicKeyByPrivateKey);

var _addressByPublicKey = require('./address-by-public-key');

var _addressByPublicKey2 = _interopRequireDefault(_addressByPublicKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function signTransaction(rawTx, privateKey) {

    // check if privateKey->address matches rawTx.from
    var publicKey = (0, _publicKeyByPrivateKey2['default'])(privateKey);
    var address = (0, _addressByPublicKey2['default'])(publicKey);
    if (address != rawTx.from) throw new Error('EthCrypto.signTransaction(): rawTx.from does not match the address of the privateKey');

    var privateKeyBuffer = new Buffer(privateKey.replace(/^.{2}/g, ''), 'hex');
    var tx = new _ethereumjsTx2['default'](rawTx);
    tx.sign(privateKeyBuffer);
    var serializedTx = tx.serialize().toString('hex');
    return serializedTx;
}