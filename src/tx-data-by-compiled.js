import { ContractFactory } from 'ethers';

export function txDataByCompiled(
    abi,
    bytecode,
    args
) {
    // solc returns a string which is often passed instead of the json
    if (typeof abi === 'string') abi = JSON.parse(abi);

    // Construct a Contract Factory
    const factory = new ContractFactory(abi, '0x' + bytecode);

    const deployTransaction = factory.getDeployTransaction(...args);

    return deployTransaction.data;
}
