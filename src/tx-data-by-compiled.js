import {
    web3
} from './util';

export default function txDataByCompiled(
    abi,
    bytecode,
    args
) {

    // solc returns a string which is often passed instead of the json
    if (typeof abi === 'string') abi = JSON.parse(abi);

    const web3Contract = new web3.eth.Contract(
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
