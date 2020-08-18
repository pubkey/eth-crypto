import {
    utils as ethersUtils
} from 'ethers';


export function keccak256(params) {
    const types = [];
    const values = [];
    if (!Array.isArray(params)) {
        types.push('string');
        values.push(params);
    }else {
        params.forEach(p => {
            types.push(p.type);
            values.push(p.value);
        });
    }
    return ethersUtils.solidityKeccak256(types, values);
}

export const SIGN_PREFIX = '\x19Ethereum Signed Message:\n32';
