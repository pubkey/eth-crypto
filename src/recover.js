import {
    web3
} from './util';
import VRSBySignature from './v-r-s-by-signature';

/**
 * returns the adress with which the messageHash was signed
 * @param  {string} signature
 * @param  {string} messageHash
 * @return {string} address
 */
export default function recover(signature, messageHash) {
    const vrs = VRSBySignature(signature);
    const address = web3.eth.accounts.recover(
        messageHash,
        vrs.v,
        vrs.r,
        vrs.s
    );
    return address;
}
