import { web3 } from './util';

/**
 * signs the given message
 * @param  {string} privateKey
 * @param  {string} message
 * @return {{v: string, r: string, s: string}} signature
 */
export default function sign(privateKey, message) {
    var account = web3.eth.accounts.privateKeyToAccount(privateKey);
    var sig = account.sign(message);
    var ret = {
        v: sig.v,
        r: sig.r,
        s: sig.s
    };
    return ret;
}