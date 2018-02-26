'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = sign;

var _account = require('eth-lib/lib/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * signs the given message
 * @param  {string} privateKey
 * @param  {string} hash
 * @return {string} hexString
 */
function sign(privateKey, hash) {
  var signature = _account2['default'].sign(hash, privateKey);
  return signature;
}