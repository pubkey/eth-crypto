'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = createIdentity;

var _util = require('./util');

var _publicKeyByPrivateKey = require('./public-key-by-private-key');

var _publicKeyByPrivateKey2 = _interopRequireDefault(_publicKeyByPrivateKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * creates a new object with
 * private-, public-Key and address
 */
function createIdentity() {
    var account = _util.web3.eth.accounts.create();

    var identity = {
        address: account.address,
        privateKey: account.privateKey,
        publicKey: (0, _publicKeyByPrivateKey2['default'])(account.privateKey)
    };

    return identity;
}