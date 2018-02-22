import _Map from 'babel-runtime/core-js/map';
import { web3 } from './util';

var ACCOUNTS_CACHE = new _Map();

/**
 * signs the given message
 * @param  {string} privateKey
 * @param  {string} message
 * @return {{v: string, r: string, s: string}} signature
 */
export default function sign(privateKey, message) {
    if (!ACCOUNTS_CACHE.has(privateKey)) {
        ACCOUNTS_CACHE.set(privateKey, web3.eth.accounts.privateKeyToAccount(privateKey));
    }
    var account = ACCOUNTS_CACHE.get(privateKey);
    var sig = account.sign(message);
    var ret = {
        v: sig.v,
        r: sig.r,
        s: sig.s
    };
    return ret;
}