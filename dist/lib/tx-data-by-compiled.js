"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.txDataByCompiled = txDataByCompiled;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _ethers = require("ethers");
function txDataByCompiled(abi, bytecode, args) {
  // solc returns a string which is often passed instead of the json
  if (typeof abi === 'string') abi = JSON.parse(abi);

  // Construct a Contract Factory
  var factory = new _ethers.ContractFactory(abi, '0x' + bytecode);
  var deployTransaction = factory.getDeployTransaction.apply(factory, (0, _toConsumableArray2["default"])(args));
  return deployTransaction.data;
}