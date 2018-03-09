import Account from 'eth-lib/lib/account';

/**
 * split signature-hex into parts
 * @param  {string} hexString
 * @return {{v: string, r: string, s: string}}
 */
export function fromString(hexString) {
    const arr = Account.decodeSignature(hexString);
    return {
        v: arr[0],
        r: arr[1],
        s: arr[2]
    };
}

/**
 * merge signature-parts to one string
 * @param  {{v: string, r: string, s: string}} sig
 * @return {string} hexString
 */
export function toString(sig) {
    const partsArray = [sig.v, sig.r, sig.s];
    return Account.encodeSignature(partsArray);
}
