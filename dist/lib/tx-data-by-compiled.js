'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = txDataByCompiled;

var _web3EthContract = require('web3-eth-contract');

var Web3EthContract = _interopRequireWildcard(_web3EthContract);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function txDataByCompiled(abi, bytecode, args) {

    // solc returns a string which is often passed instead of the json
    if (typeof abi === 'string') abi = JSON.parse(abi);

    var web3Contract = new Web3EthContract['default'](abi, null, {
        data: '0x' + bytecode
    });

    var createCode = web3Contract.deploy({
        arguments: args
    }).encodeABI();

    return createCode;
}