import EthUtil from 'ethereumjs-util';

/**
 * Generate publicKey from the privateKey.
 * This creates the uncompressed publicKey,
 * where 04 has stripped from left
 * @returns {string}
 */
export default function publicKeyOfPrivateKey(privateKey) {
  var publicKeyBuffer = EthUtil.privateToPublic(privateKey);
  return publicKeyBuffer.toString('hex');
}