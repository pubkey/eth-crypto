'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.encryptCipherkey = encryptCipherkey;
exports.decryptCipherkey = decryptCipherkey;

var _bitcoreLib = require('bitcore-lib');

var _aes = require('./aes');

var AES = _interopRequireWildcard(_aes);

var _cbc = require('./cbc');

var _cbc2 = _interopRequireDefault(_cbc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var $ = _bitcoreLib.util.preconditions; /**
                                         * copied from bitcore-ecies
                                         * https://github.com/bitpay/bitcore-ecies
                                         */

var Random = _bitcoreLib.crypto.Random;
var Hash = _bitcoreLib.crypto.Hash;

// Symmetric encryption with AES and CBC convenience class
var AESCBC = function AESCBC() {};

function encrypt(messagebuf, passwordstr) {
    $.checkArgument(messagebuf);
    $.checkArgument(passwordstr);
    var cipherkeybuf = Hash.sha256(new Buffer(passwordstr));
    return AESCBC.encryptCipherkey(messagebuf, cipherkeybuf);
};

function decrypt(encbuf, passwordstr) {
    $.checkArgument(encbuf);
    $.checkArgument(passwordstr);
    var cipherkeybuf = Hash.sha256(new Buffer(passwordstr));
    return AESCBC.decryptCipherkey(encbuf, cipherkeybuf);
};

function encryptCipherkey(messagebuf, cipherkeybuf, ivbuf) {
    $.checkArgument(messagebuf);
    $.checkArgument(cipherkeybuf);
    $.checkArgument(ivbuf);
    ivbuf = ivbuf || Random.getRandomBuffer(128 / 8);
    var ctbuf = _cbc2['default'].encrypt(messagebuf, ivbuf, AES, cipherkeybuf);
    var encbuf = Buffer.concat([ivbuf, ctbuf]);
    return encbuf;
};

function decryptCipherkey(encbuf, cipherkeybuf) {
    $.checkArgument(encbuf);
    $.checkArgument(cipherkeybuf);
    var ivbuf = encbuf.slice(0, 128 / 8);
    var ctbuf = encbuf.slice(128 / 8);
    var messagebuf = _cbc2['default'].decrypt(ctbuf, ivbuf, AES, cipherkeybuf);
    return messagebuf;
};