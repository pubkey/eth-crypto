/**
 * compress/decompress hex-strings to utf16 or base64
 * thx @juvian
 * @link https://stackoverflow.com/a/40471908/3443137
 */

import * as util from './util';

export function compress(hex, base64 = false) {
    hex = util.removeTrailing0x(hex);

    // if base64:true, we use our own function because it results in a smaller output
    if (base64 === true)
        return new Buffer(hex, 'hex').toString('base64');

    let string = '';
    while (hex.length % 4 != 0) { // we need it to be multiple of 4
        hex = '0' + hex;
    }
    for (let i = 0; i < hex.length; i += 4) {
        // get char from ascii code which goes from 0 to 65536
        string += String.fromCharCode(parseInt(hex.substring(i, i + 4), 16));
    }
    return string;
}

export function decompress(compressedString, base64 = false) {

    // if base64:true, we use our own function because it results in a smaller output
    if (base64 === true) {
        const ret = new Buffer(compressedString, 'base64').toString('hex');
        return util.addTrailing0x(ret);
    }

    let hex = '';
    for (let i = 0; i < compressedString.length; i++) {
        // get character ascii code and convert to hexa string, adding necessary 0s
        hex += ((i == 0 ? '' : '000') + compressedString.charCodeAt(i).toString(16)).slice(-4);
    }
    hex = hex.toLowerCase();
    return util.addTrailing0x(hex);
}
