'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = publicKeyOfPrivateKey;

var _ethereumjsUtil = require('ethereumjs-util');

var _ethereumjsUtil2 = _interopRequireDefault(_ethereumjsUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Generate publicKey from the privateKey.
 * This creates the uncompressed publicKey,
 * where 04 has stripped from left
 * @returns {string}
 */
function publicKeyOfPrivateKey(privateKey) {
  var publicKeyBuffer = _ethereumjsUtil2['default'].privateToPublic(privateKey);
  return publicKeyBuffer.toString('hex');
}