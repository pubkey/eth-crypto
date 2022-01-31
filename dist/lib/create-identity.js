"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPrivateKey = createPrivateKey;
exports["default"] = createIdentity;

var _ethers = require("ethers");

var _ethereumjsUtil = require("ethereumjs-util");

var MIN_ENTROPY_SIZE = 128;
var keccak256 = _ethers.ethers.utils.keccak256;
/**
 * create a privateKey from the given entropy or a new one
 * @param  {Buffer} entropy
 * @return {string}
 */

function createPrivateKey(entropy) {
  if (entropy) {
    if (!Buffer.isBuffer(entropy)) throw new Error('EthCrypto.createPrivateKey(): given entropy is no Buffer');
    if (Buffer.byteLength(entropy, 'utf8') < MIN_ENTROPY_SIZE) throw new Error('EthCrypto.createPrivateKey(): Entropy-size must be at least ' + MIN_ENTROPY_SIZE);
    var outerHex = keccak256(entropy);
    return outerHex;
  } else {
    var innerHex = keccak256(_ethers.ethers.utils.concat([_ethers.ethers.utils.randomBytes(32), _ethers.ethers.utils.randomBytes(32)]));

    var middleHex = _ethers.ethers.utils.concat([_ethers.ethers.utils.concat([_ethers.ethers.utils.randomBytes(32), innerHex]), _ethers.ethers.utils.randomBytes(32)]);

    var _outerHex = keccak256(middleHex);

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
  var wallet = new _ethers.ethers.Wallet(privateKey);
  var identity = {
    privateKey: privateKey,
    // remove trailing '0x04'
    publicKey: (0, _ethereumjsUtil.stripHexPrefix)(wallet.publicKey).slice(2),
    address: wallet.address
  };
  return identity;
}