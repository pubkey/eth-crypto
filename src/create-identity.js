import { ethers } from 'ethers';
import { stripHexPrefix } from 'ethereumjs-util';

const MIN_ENTROPY_SIZE = 128;
const { keccak256 } = ethers.utils;

/**
 * create a privateKey from the given entropy or a new one
 * @param  {Buffer} entropy
 * @return {string}
 */
export function createPrivateKey(entropy) {
    if (entropy) {
        if (!Buffer.isBuffer(entropy))
            throw new Error('EthCrypto.createPrivateKey(): given entropy is no Buffer');
        if (Buffer.byteLength(entropy, 'utf8') < MIN_ENTROPY_SIZE)
            throw new Error('EthCrypto.createPrivateKey(): Entropy-size must be at least ' + MIN_ENTROPY_SIZE);

        const outerHex = keccak256(entropy);
        return outerHex;
    } else {
        const innerHex = keccak256(ethers.utils.concat([...ethers.utils.randomBytes(32), ...ethers.utils.randomBytes(32)]));
        const middleHex = ethers.utils.concat([ethers.utils.concat([ethers.utils.randomBytes(32), innerHex]), ethers.utils.randomBytes(32)]);
        const outerHex = keccak256(middleHex);
        return outerHex;
    }
}

/**
 * creates a new object with
 * private-, public-Key and address
 * @param {Buffer?} entropy if provided, will use that as single random-source
 */
export default function createIdentity(entropy) {
    const privateKey = createPrivateKey(entropy);
    const wallet = new ethers.Wallet(privateKey);
    const identity = {
        privateKey: privateKey,
        publicKey: stripHexPrefix(wallet.publicKey).slice(2), // remove trailing '0x04'
        address: wallet.address,
    };
    return identity;
}
