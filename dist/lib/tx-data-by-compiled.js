'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports['default'] = txDataByCompiled;

var _contract = require('ethers/contracts/contract.js');

var _contract2 = _interopRequireDefault(_contract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function txDataByCompiled(abi, bytecode, args) {
    // solc returns a string which is often passed instead of the json
    if (typeof abi === 'string') abi = JSON.parse(abi);

    var deployTransaction = _contract2['default'].getDeployTransaction.apply(_contract2['default'], ['0x' + bytecode, abi].concat((0, _toConsumableArray3['default'])(args)));

    return deployTransaction.data;
}