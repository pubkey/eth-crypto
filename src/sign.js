import Account from 'eth-lib/lib/account';

/**
 * signs the given message
 * @param  {string} privateKey
 * @param  {string} hash
 * @return {{v: string, r: string, s: string}} signature
 */
export default function sign(privateKey, hash) {
    const signature = Account.sign(hash, privateKey);
    const vrs = Account.decodeSignature(signature);
    const ret = {
        v: vrs[0],
        r: vrs[1],
        s: vrs[2]
    };
    return ret;
}
