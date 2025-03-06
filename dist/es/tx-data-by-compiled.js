import { Interface, concat } from 'ethers';
export function txDataByCompiled(abi, bytecode, args) {
  // solc returns a string which is often passed instead of the JSON
  if (typeof abi === 'string') {
    abi = JSON.parse(abi);
  }
  var iface = new Interface(abi);
  var encodedArgs = iface.encodeDeploy(args);
  var data = concat(['0x' + bytecode.replace(/^0x/, ''), encodedArgs]);
  return data;
}