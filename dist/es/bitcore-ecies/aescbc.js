/**
 * copied from bitcore-ecies
 * https://github.com/bitpay/bitcore-ecies
 */

import { util as bitcoreUtil, crypto as bitcoreCrypto } from 'bitcore-lib';

var $ = bitcoreUtil.preconditions;
var Random = bitcoreCrypto.Random;
var Hash = bitcoreCrypto.Hash;

import * as AES from './aes';
import CBC from './cbc';

// Symmetric encryption with AES and CBC convenience class
var AESCBC = function AESCBC() {};

export function encrypt(messagebuf, passwordstr) {
    $.checkArgument(messagebuf);
    $.checkArgument(passwordstr);
    var cipherkeybuf = Hash.sha256(new Buffer(passwordstr));
    return AESCBC.encryptCipherkey(messagebuf, cipherkeybuf);
};

export function decrypt(encbuf, passwordstr) {
    $.checkArgument(encbuf);
    $.checkArgument(passwordstr);
    var cipherkeybuf = Hash.sha256(new Buffer(passwordstr));
    return AESCBC.decryptCipherkey(encbuf, cipherkeybuf);
};

export function encryptCipherkey(messagebuf, cipherkeybuf, ivbuf) {
    $.checkArgument(messagebuf);
    $.checkArgument(cipherkeybuf);
    $.checkArgument(ivbuf);
    ivbuf = ivbuf || Random.getRandomBuffer(128 / 8);
    var ctbuf = CBC.encrypt(messagebuf, ivbuf, AES, cipherkeybuf);
    var encbuf = Buffer.concat([ivbuf, ctbuf]);
    return encbuf;
};

export function decryptCipherkey(encbuf, cipherkeybuf) {
    $.checkArgument(encbuf);
    $.checkArgument(cipherkeybuf);
    var ivbuf = encbuf.slice(0, 128 / 8);
    var ctbuf = encbuf.slice(128 / 8);
    var messagebuf = CBC.decrypt(ctbuf, ivbuf, AES, cipherkeybuf);
    return messagebuf;
};