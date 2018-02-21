import { web3 } from './util';

/**
 * returns the adress with which the messageHash was signed
 * @param  {{v: string, r: string, s: string}} signature
 * @param  {string} message
 * @return {string} address
 */
export default function recover(signature, message) {
    var address = web3.eth.accounts.recover(message, signature.v, signature.r, signature.s);
    return address;
}