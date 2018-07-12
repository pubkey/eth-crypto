import Contract from 'ethers/contracts/contract.js';

export default function txDataByCompiled(
    abi,
    bytecode,
    args
) {
    // solc returns a string which is often passed instead of the json
    if (typeof abi === 'string') abi = JSON.parse(abi);

    const deployTransaction = Contract.getDeployTransaction(
        '0x' + bytecode,
        abi,
        ...args
    );

    return deployTransaction.data;
}
