'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = calculateContractAddress;

var _ethereumjsUtil = require('ethereumjs-util');

var _ethereumjsUtil2 = _interopRequireDefault(_ethereumjsUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function calculateContractAddress(creatorAddress, nonce) {
    var addressBuffer = _ethereumjsUtil2['default'].generateAddress(creatorAddress, nonce);
    var address = addressBuffer.toString('hex');
    return _ethereumjsUtil2['default'].toChecksumAddress(address);
}