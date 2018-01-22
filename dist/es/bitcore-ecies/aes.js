/**
 * copied from bitcore-ecies
 * https://github.com/bitpay/bitcore-ecies
 */

import { util as bitcoreUtil } from 'bitcore-lib';
var $ = bitcoreUtil.preconditions;
import aes from 'aes';

var AES = function AES() {};

export function encrypt(messagebuf, keybuf) {
    var key = buf2words(keybuf);
    var message = buf2words(messagebuf);
    var a = new aes(key);
    var enc = a.encrypt(message);
    var encbuf = words2buf(enc);
    return encbuf;
};

export function decrypt(encbuf, keybuf) {
    var enc = buf2words(encbuf);
    var key = buf2words(keybuf);
    var a = new aes(key);
    var message = a.decrypt(enc);
    var messagebuf = words2buf(message);
    return messagebuf;
};

export function buf2words(buf) {
    $.checkArgument(buf);
    $.checkArgument(buf.length % 4 === 0, 'buf length must be a multiple of 4');

    var words = [];

    for (var i = 0; i < buf.length / 4; i++) {
        words.push(buf.readUInt32BE(i * 4));
    }return words;
};

export function words2buf(words) {
    var buf = new Buffer(words.length * 4);

    for (var i = 0; i < words.length; i++) {
        buf.writeUInt32BE(words[i], i * 4);
    }return buf;
};