import { soliditySha3 } from 'web3-utils';

export function keccak256(params) {
    if (!Array.isArray(params)) {
        params = [{
            type: 'string',
            value: params
        }];
    }
    return soliditySha3.apply(undefined, params);
}

export var SIGN_PREFIX = '\x19Ethereum Signed Message:\n32';