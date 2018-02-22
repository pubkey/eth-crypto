import {
    web3
} from './util';

const ACCOUNTS_CACHE = new Map();

/**
 * signs the given message
 * @param  {string} privateKey
 * @param  {string} message
 * @return {{v: string, r: string, s: string}} signature
 */
export default function sign(privateKey, message) {
    if (!ACCOUNTS_CACHE.has(privateKey)) {
        ACCOUNTS_CACHE.set(
            privateKey,
            web3.eth.accounts.privateKeyToAccount(privateKey)
        );
    }
    const account = ACCOUNTS_CACHE.get(privateKey);
    const sig = account.sign(message);
    const ret = {
        v: sig.v,
        r: sig.r,
        s: sig.s
    };
    return ret;
}
