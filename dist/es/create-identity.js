import publicKeyByPrivateKey from './public-key-by-private-key';

import { fromPrivate } from 'eth-lib/lib/account';
import { keccak256 } from 'eth-lib/lib/hash';
import Bytes from 'eth-lib/lib/bytes';

var MIN_ENTROPY_SIZE = 128;

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
        // @link https://github.com/MaiaVictor/eth-lib/blob/master/lib/account.js#L8
        var innerHex = keccak256(Bytes.concat(Bytes.random(32), Bytes.random(32)));
        var middleHex = Bytes.concat(Bytes.concat(Bytes.random(32), innerHex), Bytes.random(32));
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
    var identity = fromPrivate(privateKey);
    identity.publicKey = publicKeyByPrivateKey(identity.privateKey);
    return identity;
}