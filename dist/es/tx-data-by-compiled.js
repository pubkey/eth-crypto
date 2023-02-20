import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { ContractFactory } from 'ethers';
export function txDataByCompiled(abi, bytecode, args) {
  // solc returns a string which is often passed instead of the json
  if (typeof abi === 'string') abi = JSON.parse(abi);

  // Construct a Contract Factory
  var factory = new ContractFactory(abi, '0x' + bytecode);
  var deployTransaction = factory.getDeployTransaction.apply(factory, _toConsumableArray(args));
  return deployTransaction.data;
}