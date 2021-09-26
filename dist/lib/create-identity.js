"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPrivateKey = createPrivateKey;
exports.default = createIdentity;

var _publicKeyByPrivateKey = _interopRequireDefault(require("./public-key-by-private-key"));

var _account = require("eth-lib/lib/account");

var _hash = require("eth-lib/lib/hash");

var _bytes = _interopRequireDefault(require("eth-lib/lib/bytes"));

var MIN_ENTROPY_SIZE = 128;
/**
 * create a privateKey from the given entropy or a new one
 * @param  {Buffer} entropy
 * @return {string}
 */

function createPrivateKey(entropy) {
  if (entropy) {
    if (!Buffer.isBuffer(entropy)) throw new Error('EthCrypto.createPrivateKey(): given entropy is no Buffer');
    if (Buffer.byteLength(entropy, 'utf8') < MIN_ENTROPY_SIZE) throw new Error('EthCrypto.createPrivateKey(): Entropy-size must be at least ' + MIN_ENTROPY_SIZE);
    var outerHex = (0, _hash.keccak256)(entropy);
    return outerHex;
  } else {
    // @link https://github.com/MaiaVictor/eth-lib/blob/master/lib/account.js#L8
    var innerHex = (0, _hash.keccak256)(_bytes.default.concat(_bytes.default.random(32), _bytes.default.random(32)));

    var middleHex = _bytes.default.concat(_bytes.default.concat(_bytes.default.random(32), innerHex), _bytes.default.random(32));

    var _outerHex = (0, _hash.keccak256)(middleHex);

    return _outerHex;
  }
}
/**
 * creates a new object with
 * private-, public-Key and address
 * @param {Buffer?} entropy if provided, will use that as single random-source
 */


function createIdentity(entropy) {
  var privateKey = createPrivateKey(entropy);
  var identity = (0, _account.fromPrivate)(privateKey);
  identity.publicKey = (0, _publicKeyByPrivateKey.default)(identity.privateKey);
  return identity;
}