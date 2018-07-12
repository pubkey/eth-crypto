import Contract from 'ethers/contracts/contract.js';

export default function txDataByCompiled(abi, bytecode, args) {
    // solc returns a string which is often passed instead of the json
    if (typeof abi === 'string') abi = JSON.parse(abi);

    var deployTransaction = Contract.getDeployTransaction.apply(Contract, ['0x' + bytecode, abi].concat(args));

    return deployTransaction.data;
}