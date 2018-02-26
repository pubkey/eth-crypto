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

/**
 * hashes the given hash with the web3-prefix
 * '\x19Ethereum Signed Message:\n32'
 */
export function prefixedHash(hash) {
    if (!web3.utils.isHexStrict(hash))
        throw new Error('EthCrypto.hash.prefixedHash(): please insert an hash');
    return web3.eth.accounts.hashMessage({
        type: 'bytes32',
        value: hash
    });
}
