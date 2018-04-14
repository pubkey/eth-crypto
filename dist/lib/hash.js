'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SIGN_PREFIX = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.keccak256 = keccak256;

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function keccak256(params) {
    var _web3$utils;

    if (!Array.isArray(params)) {
        params = [{
            type: 'string',
            value: params
        }];
    }
    return (_web3$utils = _util.web3.utils).soliditySha3.apply(_web3$utils, (0, _toConsumableArray3['default'])(params));
}

var SIGN_PREFIX = exports.SIGN_PREFIX = '\x19Ethereum Signed Message:\n32';