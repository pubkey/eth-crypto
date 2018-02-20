'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.web3 = undefined;

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.publicKeyToAddress = publicKeyToAddress;
exports.createPrivateKey = createPrivateKey;
exports.publicKeyFromPrivateKey = publicKeyFromPrivateKey;
exports.hash = hash;
exports.soliditySha3 = soliditySha3;
exports.signHash = signHash;
exports.verifyHashSignature = verifyHashSignature;
exports.encryptWithPublicKey = encryptWithPublicKey;
exports.decryptWithPrivateKey = decryptWithPrivateKey;

var _ethereumjsUtil = require('ethereumjs-util');

var ethUtil = _interopRequireWildcard(_ethereumjsUtil);

var _randombytes = require('randombytes');

var _randombytes2 = _interopRequireDefault(_randombytes);

var _secp256k = require('secp256k1');

var secp256k1 = _interopRequireWildcard(_secp256k);

var _ecies = require('./bitcore-ecies/ecies');

var _ecies2 = _interopRequireDefault(_ecies);

var _bitcoreLib = require('bitcore-lib');

var _bitcoreLib2 = _interopRequireDefault(_bitcoreLib);

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _jsSha = require('js-sha3');

var _util = require('./util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var web3 = exports.web3 = new _web2['default']();

/**
 * get the ethereum-address by the publicKey
 * @param  {string} publicKey
 * @return {string} address
 */
function publicKeyToAddress(publicKey) {
    publicKey = secp256k1.publicKeyConvert((0, _util.ensureBuffer)(publicKey), false).slice(1); // slice(1) is to drop the type byte which is hardcoded as 04 ethereum
    return (0, _util.formatAddress)(ethUtil.publicToAddress(publicKey).toString('hex'));
}

/**
 * creates a new privateKey
 * @return {string} privateKey as hex
 */
function createPrivateKey() {
    var key = new Buffer((0, _randombytes2['default'])(32), // Ethereum requires private key to be 256 bit long
    'hex').toString('hex');
    return key;
}

/**
 * create the publicKey from the privateKey
 * @param  {string} privateKey as hex
 * @return {string} publicKey as hex
 */
function publicKeyFromPrivateKey(privateKey) {
    return secp256k1.publicKeyCreate((0, _util.ensureBuffer)(privateKey)).toString('hex');
}

/**
 * creates a sha3_256 of the message
 * @param  {string} message
 * @return {string} the hash
 */
function hash(message) {
    return (0, _jsSha.sha3_256)(message);
}

function soliditySha3() {
    var _web3$utils;

    var hexHash = (_web3$utils = web3.utils).soliditySha3.apply(_web3$utils, arguments);
    return hexHash;
}

/**
 * signs the sha3_256-hash with the privateKey
 * @param {string} privateKey
 * @param {string} hash
 * @return {string} signature as hex
 */
function signHash(privateKey, hash) {
    var sigObj = secp256k1.sign((0, _util.ensureBuffer)(hash), (0, _util.ensureBuffer)(privateKey));
    return sigObj.signature.toString('hex');
}

/**
 * check if signature of message is signed by the privateKey of the publicKey
 * @param {string} publicKey
 * @param {string} hash sha3_256-hash
 * @param {string} signature
 * @return {boolean} true if valid, false if not
 */
function verifyHashSignature(publicKey, hash, signature) {
    return secp256k1.verify((0, _util.ensureBuffer)(hash), (0, _util.ensureBuffer)(signature), (0, _util.ensureBuffer)(publicKey));
}

var _encryptWithPublicKeyEciesCache = new _map2['default']();
// this key is used as false sample, because bitcore would crash when alice has no privateKey
var _encryptWithPublicKeyDefaultKey = new _bitcoreLib2['default'].PrivateKey('52435b1ff21b894da15d87399011841d5edec2de4552fdc29c8299574436925d');
/**
 * encrypts the message with the publicKey
 * This is using aes256Cbc
 * @param  {string} publicKey
 * @param  {string} message
 * @return {string}
 */
function encryptWithPublicKey(publicKey, message) {
    // caching
    if (!_encryptWithPublicKeyEciesCache.has(publicKey)) {
        var _alice = (0, _ecies2['default'])().privateKey(_encryptWithPublicKeyDefaultKey).publicKey(new _bitcoreLib2['default'].PublicKey(publicKey));
        _encryptWithPublicKeyEciesCache.set(publicKey, _alice);
    }

    var alice = _encryptWithPublicKeyEciesCache.get(publicKey);
    var encrypted = alice.encrypt(message);
    var ret = encrypted.toString('hex');
    return ret;
}

var _decryptWithPrivateKeyEciesMap = new _map2['default']();
/**
 * decrypt the encrypted message with the privateKey
 * @param  {string} privateKey
 * @param  {string} encrypted
 * @return {string}
 */
function decryptWithPrivateKey(privateKey, encrypted) {
    // caching
    if (!_decryptWithPrivateKeyEciesMap.has(privateKey)) {
        var privKey = new _bitcoreLib2['default'].PrivateKey(privateKey);
        var _alice2 = (0, _ecies2['default'])().privateKey(privKey);
        _decryptWithPrivateKeyEciesMap.set(privateKey, _alice2);
    }

    var alice = _decryptWithPrivateKeyEciesMap.get(privateKey);
    var decryptMe = new Buffer(encrypted, 'hex');
    var decrypted = alice.decrypt(decryptMe);
    var ret = decrypted.toString();
    return ret;
}

exports['default'] = {
    publicKeyToAddress: publicKeyToAddress,
    createPrivateKey: createPrivateKey,
    publicKeyFromPrivateKey: publicKeyFromPrivateKey,
    hash: hash,
    signHash: signHash,
    verifyHashSignature: verifyHashSignature,
    encryptWithPublicKey: encryptWithPublicKey,
    decryptWithPrivateKey: decryptWithPrivateKey
};