import {
    utils as ethersUtils
} from 'ethers';
/**
 * split signature-hex into parts
 * @param  {string} hexString
 * @return {{v: string, r: string, s: string}}
 */
export function fromString(hexString) {
    const arr = ethersUtils.splitSignature(hexString);
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
    return ethersUtils.joinSignature(sig);
}
