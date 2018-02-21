import {
    web3
} from './util';

export default function hash(str) {
    return web3.utils.soliditySha3(str);
}
