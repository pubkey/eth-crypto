'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.buf2words = buf2words;
exports.words2buf = words2buf;

var _bitcoreLib = require('bitcore-lib');

var _aes = require('aes');

var _aes2 = _interopRequireDefault(_aes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var $ = _bitcoreLib.util.preconditions; /**
                                         * copied from bitcore-ecies
                                         * https://github.com/bitpay/bitcore-ecies
                                         */

var AES = function AES() {};

function encrypt(messagebuf, keybuf) {
    var key = buf2words(keybuf);
    var message = buf2words(messagebuf);
    var a = new _aes2['default'](key);
    var enc = a.encrypt(message);
    var encbuf = words2buf(enc);
    return encbuf;
};

function decrypt(encbuf, keybuf) {
    var enc = buf2words(encbuf);
    var key = buf2words(keybuf);
    var a = new _aes2['default'](key);
    var message = a.decrypt(enc);
    var messagebuf = words2buf(message);
    return messagebuf;
};

function buf2words(buf) {
    $.checkArgument(buf);
    $.checkArgument(buf.length % 4 === 0, 'buf length must be a multiple of 4');

    var words = [];

    for (var i = 0; i < buf.length / 4; i++) {
        words.push(buf.readUInt32BE(i * 4));
    }return words;
};

function words2buf(words) {
    var buf = new Buffer(words.length * 4);

    for (var i = 0; i < words.length; i++) {
        buf.writeUInt32BE(words[i], i * 4);
    }return buf;
};