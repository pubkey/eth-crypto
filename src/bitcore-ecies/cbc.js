/**
 * copied from bitcore-ecies
 * https://github.com/bitpay/bitcore-ecies
 */

import {
    util as bitcoreUtil
} from 'bitcore-lib';
const $ = bitcoreUtil.preconditions;

import errors from './errors';


// Cipher Block Chaining
// http://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher-block_chaining_.28CBC.29
const CBC = function CBC(blockcipher, cipherkeybuf, ivbuf) {
    if (!(this instanceof CBC))
        return new CBC(blockcipher, cipherkeybuf, ivbuf);

    this.blockcipher = blockcipher;
    this.cipherkeybuf = cipherkeybuf;
    this.ivbuf = ivbuf;
};

CBC.buf2blockbufs = function(buf, blocksize) {
    const bytesize = blocksize / 8;
    const blockbufs = [];

    for (let i = 0; i <= buf.length / bytesize; i++) {
        let blockbuf = buf.slice(i * bytesize, i * bytesize + bytesize);

        if (blockbuf.length < blocksize)
            blockbuf = CBC.pkcs7pad(blockbuf, blocksize);

        blockbufs.push(blockbuf);
    }

    return blockbufs;
};

CBC.blockbufs2buf = function(blockbufs) {
    let last = blockbufs[blockbufs.length - 1];
    last = CBC.pkcs7unpad(last);
    blockbufs[blockbufs.length - 1] = last;

    const buf = Buffer.concat(blockbufs);

    return buf;
};

CBC.encrypt = function(messagebuf, ivbuf, blockcipher, cipherkeybuf) {
    const blocksize = ivbuf.length * 8;
    const blockbufs = CBC.buf2blockbufs(messagebuf, blocksize);
    const encbufs = CBC.encryptblocks(blockbufs, ivbuf, blockcipher, cipherkeybuf);
    const encbuf = Buffer.concat(encbufs);
    return encbuf;
};

CBC.decrypt = function(encbuf, ivbuf, blockcipher, cipherkeybuf) {
    const blocksize = ivbuf.length * 8;
    const bytesize = ivbuf.length;
    const encbufs = [];
    for (let i = 0; i < encbuf.length / bytesize; i++)
        encbufs.push(encbuf.slice(i * bytesize, i * bytesize + bytesize));

    const blockbufs = CBC.decryptblocks(encbufs, ivbuf, blockcipher, cipherkeybuf);
    const buf = CBC.blockbufs2buf(blockbufs, blocksize);
    return buf;
};

CBC.encryptblock = function(blockbuf, ivbuf, blockcipher, cipherkeybuf) {
    const xorbuf = CBC.xorbufs(blockbuf, ivbuf);
    const encbuf = blockcipher.encrypt(xorbuf, cipherkeybuf);
    return encbuf;
};

CBC.decryptblock = function(encbuf, ivbuf, blockcipher, cipherkeybuf) {
    const xorbuf = blockcipher.decrypt(encbuf, cipherkeybuf);
    const blockbuf = CBC.xorbufs(xorbuf, ivbuf);
    return blockbuf;
};

CBC.encryptblocks = function(blockbufs, ivbuf, blockcipher, cipherkeybuf) {
    const encbufs = [];

    for (let i = 0; i < blockbufs.length; i++) {
        let blockbuf = blockbufs[i];
        let encbuf = CBC.encryptblock(blockbuf, ivbuf, blockcipher, cipherkeybuf);

        encbufs.push(encbuf);

        ivbuf = encbuf;
    }

    return encbufs;
};

CBC.decryptblocks = function(encbufs, ivbuf, blockcipher, cipherkeybuf) {
    const blockbufs = [];

    for (let i = 0; i < encbufs.length; i++) {
        let encbuf = encbufs[i];
        let blockbuf = CBC.decryptblock(encbuf, ivbuf, blockcipher, cipherkeybuf);

        blockbufs.push(blockbuf);

        ivbuf = encbuf;
    }

    return blockbufs;
};

CBC.pkcs7pad = function(buf, blocksize) {
    const bytesize = blocksize / 8;
    const padbytesize = bytesize - buf.length;
    const pad = new Buffer(padbytesize);
    pad.fill(padbytesize);
    const paddedbuf = Buffer.concat([buf, pad]);
    return paddedbuf;
};

CBC.pkcs7unpad = function(paddedbuf) {
    const padlength = paddedbuf[paddedbuf.length - 1];
    const padbuf = paddedbuf.slice(paddedbuf.length - padlength, paddedbuf.length);
    const padbuf2 = new Buffer(padlength);
    padbuf2.fill(padlength);
    if (padbuf.toString('hex') !== padbuf2.toString('hex'))
        throw new errors.InvalidPadding(padbuf.toString());

    return paddedbuf.slice(0, paddedbuf.length - padlength);
};

CBC.xorbufs = function(buf1, buf2) {
    $.checkArgument(buf1.length === buf2.length, 'bufs must have the same length');

    const buf = new Buffer(buf1.length);

    for (let i = 0; i < buf1.length; i++)
        buf[i] = buf1[i] ^ buf2[i];

    return buf;
};

export default CBC;
