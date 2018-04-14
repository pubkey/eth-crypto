import {
    web3
} from './util';

export function keccak256(params) {
    if (!Array.isArray(params)) {
        params = [{
            type: 'string',
            value: params
        }];
    }
    return web3.utils.soliditySha3(...params);
}

export const SIGN_PREFIX = '\x19Ethereum Signed Message:\n32';
