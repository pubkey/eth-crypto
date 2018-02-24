'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = txDataByCompiled;

var _util = require('./util');

function txDataByCompiled(abi, bytecode, args) {

    // solc returns a string which is often passed instead of the json
    if (typeof abi === 'string') abi = JSON.parse(abi);

    var web3Contract = new _util.web3.eth.Contract(abi, null, {
        data: '0x' + bytecode
    });

    var createCode = web3Contract.deploy({
        arguments: args
    }).encodeABI();

    return createCode;
}