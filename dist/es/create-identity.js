import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { ethers } from 'ethers';
import { stripHexPrefix } from 'ethereumjs-util';
var MIN_ENTROPY_SIZE = 128;
var keccak256 = ethers.utils.keccak256;
/**
 * create a privateKey from the given entropy or a new one
 * @param  {Buffer} entropy
 * @return {string}
 */

export function createPrivateKey(entropy) {
  if (entropy) {
    if (!Buffer.isBuffer(entropy)) throw new Error('EthCrypto.createPrivateKey(): given entropy is no Buffer');
    if (Buffer.byteLength(entropy, 'utf8') < MIN_ENTROPY_SIZE) throw new Error('EthCrypto.createPrivateKey(): Entropy-size must be at least ' + MIN_ENTROPY_SIZE);
    var outerHex = keccak256(entropy);
    return outerHex;
  } else {
    var innerHex = keccak256(ethers.utils.concat([].concat(_toConsumableArray(ethers.utils.randomBytes(32)), _toConsumableArray(ethers.utils.randomBytes(32)))));
    var middleHex = ethers.utils.concat([ethers.utils.concat([ethers.utils.randomBytes(32), innerHex]), ethers.utils.randomBytes(32)]);

    var _outerHex = keccak256(middleHex);

    return _outerHex;
  }
}
/**
 * creates a new object with
 * private-, public-Key and address
 * @param {Buffer?} entropy if provided, will use that as single random-source
 */

export default function createIdentity(entropy) {
  var privateKey = createPrivateKey(entropy);
  var wallet = new ethers.Wallet(privateKey);
  var identity = {
    privateKey: privateKey,
    publicKey: stripHexPrefix(wallet.publicKey).slice(2),
    // remove trailing '0x04'
    address: wallet.address
  };
  return identity;
}