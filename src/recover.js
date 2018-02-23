import Account from 'eth-lib/lib/account';

/**
 * returns the adress with which the messageHash was signed
 * @param  {{v: string, r: string, s: string}} signature
 * @param  {string} hash
 * @return {string} address
 */
export default function recover(signature, hash) {
    const sig = Account.encodeSignature([
        signature.v,
        signature.r,
        signature.s
    ]);
    return Account.recover(hash, sig);
}
