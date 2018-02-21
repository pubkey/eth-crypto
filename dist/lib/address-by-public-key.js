'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = addressByPublicKey;

var _ethereumjsUtil = require('ethereumjs-util');

var _ethereumjsUtil2 = _interopRequireDefault(_ethereumjsUtil);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * generates the ethereum-adress of the publicKey
 * We create the checksum-adress which is case-sensitive
 * @returns {string} address
 */
function addressByPublicKey(publicKey) {
    var addressBuffer = _ethereumjsUtil2['default'].pubToAddress(new Buffer(publicKey, 'hex'));
    var checkSumAdress = _util.web3.utils.toChecksumAddress(addressBuffer.toString('hex'));
    return checkSumAdress;
}