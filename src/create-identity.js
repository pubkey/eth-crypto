import { utils as ethersUtils, Wallet } from 'ethers';
import { stripHexPrefix } from 'ethereumjs-util';

const MIN_ENTROPY_SIZE = 128;
const { keccak256 } = ethersUtils;

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
        const innerHex = keccak256(ethersUtils.concat([ethersUtils.randomBytes(32), ethersUtils.randomBytes(32)]));
        const middleHex = ethersUtils.concat([ethersUtils.concat([ethersUtils.randomBytes(32), innerHex]), ethersUtils.randomBytes(32)]);
        const outerHex = keccak256(middleHex);
        return outerHex;
    }
}

/**
 * creates a new object with
 * private-, public-Key and address
 * @param {Buffer?} entropy if provided, will use that as single random-source
 */
export function createIdentity(entropy) {
    const privateKey = createPrivateKey(entropy);
    const wallet = new Wallet(privateKey);
    const identity = {
        privateKey: privateKey,
        // remove trailing '0x04'
        publicKey: stripHexPrefix(wallet.publicKey).slice(2),
        address: wallet.address,
    };
    return identity;
}
