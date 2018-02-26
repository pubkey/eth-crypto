'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = recover;

var _account = require('eth-lib/lib/account');

var _account2 = _interopRequireDefault(_account);

var _vrs = require('./vrs');

var _vrs2 = _interopRequireDefault(_vrs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * returns the adress with which the messageHash was signed
 * @param  {string} hexString
 * @param  {string} hash
 * @return {string} address
 */
function recover(sigString, hash) {
  return _account2['default'].recover(hash, sigString);
}