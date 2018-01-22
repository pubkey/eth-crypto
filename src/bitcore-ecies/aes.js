/**
 * copied from bitcore-ecies
 * https://github.com/bitpay/bitcore-ecies
 */

import {
    util as bitcoreUtil
} from 'bitcore-lib';
const $ = bitcoreUtil.preconditions;
import aes from 'aes';

const AES = function AES() {};

export function encrypt(messagebuf, keybuf) {
    const key = buf2words(keybuf);
    const message = buf2words(messagebuf);
    const a = new aes(key);
    const enc = a.encrypt(message);
    const encbuf = words2buf(enc);
    return encbuf;
};

export function decrypt(encbuf, keybuf) {
    const enc = buf2words(encbuf);
    const key = buf2words(keybuf);
    const a = new aes(key);
    const message = a.decrypt(enc);
    const messagebuf = words2buf(message);
    return messagebuf;
};

export function buf2words(buf) {
    $.checkArgument(buf);
    $.checkArgument(buf.length % 4 === 0, 'buf length must be a multiple of 4');

    const words = [];

    for (let i = 0; i < buf.length / 4; i++)
        words.push(buf.readUInt32BE(i * 4));

    return words;
};

export function words2buf(words) {
    const buf = new Buffer(words.length * 4);

    for (let i = 0; i < words.length; i++)
        buf.writeUInt32BE(words[i], i * 4);

    return buf;
};
