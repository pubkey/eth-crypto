"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.txDataByCompiled = txDataByCompiled;
var _ethers = require("ethers");
function txDataByCompiled(abi, bytecode, args) {
  // solc returns a string which is often passed instead of the JSON
  if (typeof abi === 'string') {
    abi = JSON.parse(abi);
  }
  var iface = new _ethers.Interface(abi);
  var encodedArgs = iface.encodeDeploy(args);
  console.log('encodedArgs: ', bytecode);
  var data = (0, _ethers.concat)(['0x' + bytecode.replace(/^0x/, ''), encodedArgs]);
  return data;
}