import { compress, decompress } from './public-key';

export function stringify(cipher) {
    if (typeof cipher === 'string') return cipher;

    // use compressed key because it's smaller
    var compressedKey = compress(cipher.ephemPublicKey);

    var ret = Buffer.concat([new Buffer(cipher.iv, 'hex'), // 16bit
    new Buffer(compressedKey, 'hex'), // 33bit
    new Buffer(cipher.mac, 'hex'), // 32bit
    new Buffer(cipher.ciphertext, 'hex') // var bit
    ]);

    return ret.toString('hex');
}

export function parse(str) {
    if (typeof str !== 'string') return str;

    var buf = new Buffer(str, 'hex');

    var ret = {
        iv: buf.toString('hex', 0, 16),
        ephemPublicKey: buf.toString('hex', 16, 49),
        mac: buf.toString('hex', 49, 81),
        ciphertext: buf.toString('hex', 81, buf.length)
    };

    // decompress publicKey
    ret.ephemPublicKey = '04' + decompress(ret.ephemPublicKey);

    return ret;
}