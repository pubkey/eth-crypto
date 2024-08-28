import { ContractFactory } from 'ethers';

export async function txDataByCompiled(
    abi,
    bytecode,
    args
) {
    // solc returns a string which is often passed instead of the json
    if (typeof abi === 'string') abi = JSON.parse(abi);

    // Construct a Contract Factory
    const factory = new ContractFactory(abi, '0x' + bytecode);

    // this function now returns a promise
    // https://docs.ethers.org/v6/api/contract/#ContractFactory-getDeployTransaction
    const deployTransaction = await factory.getDeployTransaction(...args);

    return deployTransaction.data;
}
