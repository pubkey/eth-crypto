'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = calculateContractAddress;

var _ethereumjsUtil = require('ethereumjs-util');

function calculateContractAddress(creatorAddress, nonce) {
    var addressBuffer = (0, _ethereumjsUtil.generateAddress)(creatorAddress, nonce);
    var address = addressBuffer.toString('hex');
    return (0, _ethereumjsUtil.toChecksumAddress)(address);
}