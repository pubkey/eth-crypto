import {
    web3
} from './util';

export default function hash(str) {
    return web3.eth.accounts.hashMessage(str);
}
