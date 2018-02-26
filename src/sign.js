import Account from 'eth-lib/lib/account';

/**
 * signs the given message
 * @param  {string} privateKey
 * @param  {string} hash
 * @return {string} hexString
 */
export default function sign(privateKey, hash) {
    const signature = Account.sign(hash, privateKey);
    return signature;
}
