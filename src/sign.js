import Account from 'eth-lib/lib/account';
import * as util from './util';

/**
 * signs the given message
 * @param  {string} privateKey
 * @param  {string} hash
 * @return {string} hexString
 */
export default function sign(privateKey, hash) {
    hash = util.addTrailing0x(hash);
    if (hash.length !== 66)
        throw new Error('EthCrypto.sign(): Can only sign hashes, given: ' + hash);

    const signature = Account.sign(hash, privateKey);
    return signature;
}
