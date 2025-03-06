import { Interface, concat } from 'ethers';

export function txDataByCompiled(abi, bytecode, args) {
  // solc returns a string which is often passed instead of the JSON
  if (typeof abi === 'string') {
    abi = JSON.parse(abi);
  }

  const iface = new Interface(abi);
  const encodedArgs = iface.encodeDeploy(args);
  const data = concat(['0x' + bytecode.replace(/^0x/, ''), encodedArgs]);

  return data;
}
