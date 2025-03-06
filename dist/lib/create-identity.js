"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIdentity = createIdentity;
exports.createPrivateKey = createPrivateKey;
var ethers = _interopRequireWildcard(require("ethers"));
var _ethereumjsUtil = require("ethereumjs-util");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var MIN_ENTROPY_SIZE = 128;
var keccak256 = ethers.keccak256,
  Wallet = ethers.Wallet;

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
    var innerHex = keccak256(ethers.concat([ethers.randomBytes(32), ethers.randomBytes(32)]));
    var middleHex = ethers.concat([ethers.concat([ethers.randomBytes(32), innerHex]), ethers.randomBytes(32)]);
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
  var wallet = new Wallet(privateKey);
  var identity = {
    privateKey: privateKey,
    // remove trailing '0x04'
    publicKey: (0, _ethereumjsUtil.stripHexPrefix)(wallet.signingKey.publicKey).slice(2),
    address: wallet.address
  };
  return identity;
}