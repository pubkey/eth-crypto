import * as ethers from 'ethers';
import { stripHexPrefix } from 'ethereumjs-util';
var MIN_ENTROPY_SIZE = 128;
var keccak256 = ethers.keccak256,
  Wallet = ethers.Wallet;

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
export function createIdentity(entropy) {
  var privateKey = createPrivateKey(entropy);
  var wallet = new Wallet(privateKey);
  var identity = {
    privateKey: privateKey,
    // remove trailing '0x04'
    publicKey: stripHexPrefix(wallet.signingKey.publicKey).slice(2),
    address: wallet.address
  };
  return identity;
}