import * as ethersUtils from 'ethers';
/**
 * split signature-hex into parts
 * @param  {string} hexString
 * @return {{v: string, r: string, s: string}}
 */
export function fromString(hexString) {
    const arr = ethersUtils.Signature.from(hexString);
    return {
        // convert "v" to hex
        v: `0x${arr.v.toString(16)}`,
        r: arr.r,
        s: arr.s,
    };
}

/**
 * merge signature-parts to one string
 * @param  {{v: string, r: string, s: string}} sig
 * @return {string} hexString
 */
export function toString(sig) {
    // migrating from v5 to v6:
    // https://docs.ethers.org/v6/migrating/#migrate-signatures
    return ethersUtils.Signature.from(sig).serialized;
}
