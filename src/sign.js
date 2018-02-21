import {
    web3
} from './util';

/**
 * signs the given message
 * @param  {string} privateKey
 * @param  {string} message
 * @return {string} signature
 */
export default function sign(privateKey, message) {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const sig = account.sign(message);
    return sig.signature;
}
