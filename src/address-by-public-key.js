import EthUtil from 'ethereumjs-util';
import {
    web3
} from './util';

/**
 * generates the ethereum-adress of the publicKey
 * We create the checksum-adress which is case-sensitive
 * @returns {string} address
 */
export default function addressByPublicKey(publicKey) {
    const addressBuffer = EthUtil.pubToAddress(new Buffer(publicKey, 'hex'));
    const checkSumAdress = web3.utils.toChecksumAddress(addressBuffer.toString('hex'));
    return checkSumAdress;
}
