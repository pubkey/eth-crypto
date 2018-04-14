'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = recover;

var _recoverPublicKey = require('./recover-public-key');

var _recoverPublicKey2 = _interopRequireDefault(_recoverPublicKey);

var _publicKey = require('./public-key');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * returns the adress with which the messageHash was signed
 * @param  {string} sigString
 * @param  {string} hash
 * @return {string} address
 */
function recover(sigString, hash) {
    var pubkey = (0, _recoverPublicKey2['default'])(sigString, hash);
    var address = (0, _publicKey.toAddress)(pubkey);
    return address;
}