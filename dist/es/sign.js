import { sign as secp256k1_sign } from 'secp256k1';
import { addTrailing0x, removeTrailing0x } from './util';

/**
 * signs the given message
 * we do not use sign from eth-lib because the pure secp256k1-version is 90% faster
 * @param  {string} privateKey
 * @param  {string} hash
 * @return {string} hexString
 */
export default function sign(privateKey, hash) {
    hash = addTrailing0x(hash);
    if (hash.length !== 66) throw new Error('EthCrypto.sign(): Can only sign hashes, given: ' + hash);

    var sigObj = secp256k1_sign(new Buffer(removeTrailing0x(hash), 'hex'), new Buffer(removeTrailing0x(privateKey), 'hex'));

    var recoveryId = sigObj.recovery === 1 ? '1c' : '1b';

    var newSignature = '0x' + sigObj.signature.toString('hex') + recoveryId;
    return newSignature;
}