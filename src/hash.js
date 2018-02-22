import {
    web3
} from './util';

export function solidityHash(str) {
    return web3.utils.soliditySha3(str);
}

export function signHash(str) {
    return web3.eth.accounts.hashMessage(
        str
    );
}
