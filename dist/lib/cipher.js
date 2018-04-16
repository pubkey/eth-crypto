'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stringify = stringify;
exports.parse = parse;

var _publicKey = require('./public-key');

function stringify(cipher) {
    if (typeof cipher === 'string') return cipher;

    // use compressed key because it's smaller
    var compressedKey = (0, _publicKey.compress)(cipher.ephemPublicKey);

    var ret = Buffer.concat([new Buffer(cipher.iv, 'hex'), // 16bit
    new Buffer(compressedKey, 'hex'), // 33bit
    new Buffer(cipher.mac, 'hex'), // 32bit
    new Buffer(cipher.ciphertext, 'hex') // var bit
    ]);

    return ret.toString('hex');
}

function parse(str) {
    if (typeof str !== 'string') return str;

    var buf = new Buffer(str, 'hex');

    var ret = {
        iv: buf.toString('hex', 0, 16),
        ephemPublicKey: buf.toString('hex', 16, 49),
        mac: buf.toString('hex', 49, 81),
        ciphertext: buf.toString('hex', 81, buf.length)
    };

    // decompress publicKey
    ret.ephemPublicKey = '04' + (0, _publicKey.decompress)(ret.ephemPublicKey);

    return ret;
}