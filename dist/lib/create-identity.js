'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = createIdentity;

var _publicKeyByPrivateKey = require('./public-key-by-private-key');

var _publicKeyByPrivateKey2 = _interopRequireDefault(_publicKeyByPrivateKey);

var _account = require('eth-lib/lib/account');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * creates a new object with
 * private-, public-Key and address
 */
function createIdentity() {
    var identity = (0, _account.create)();
    identity.publicKey = (0, _publicKeyByPrivateKey2['default'])(identity.privateKey);
    return identity;
}