import * as Web3EthContract from 'web3-eth-contract';

export default function txDataByCompiled(
    abi,
    bytecode,
    args
) {

    // solc returns a string which is often passed instead of the json
    if (typeof abi === 'string') abi = JSON.parse(abi);

    const web3Contract = new Web3EthContract.default(
        abi,
        null, {
            data: '0x' + bytecode
        }
    );

    const createCode = web3Contract.deploy({
        arguments: args
    }).encodeABI();

    return createCode;
}
