import * as ethUtil from 'ethereumjs-util';
import randombytes from 'randombytes';
import * as secp256k1 from 'secp256k1';

import {
    ensureBuffer,
    formatAddress
} from './util';


/**
 * get the ethereum-address by the publicKey
 * @param  {string} publicKey
 * @return {string} address
 */
export function publicKeyToAddress(publicKey) {
    publicKey = secp256k1
        .publicKeyConvert(
            ensureBuffer(publicKey),
            false
        )
        .slice(1); // slice(1) is to drop the type byte which is hardcoded as 04 ethereum
    return formatAddress(
        ethUtil.publicToAddress(publicKey)
        .toString('hex')
    );
}

/**
 * creates a new privateKey
 * @return {string} privateKey as hex
 */
export function createPrivateKey() {
    const key =
        new Buffer(
            randombytes(32), // Ethereum requires private key to be 256 bit long
            'hex'
        )
        .toString('hex');
    return key;
}

/**
 * signs the message with the privateKey
 * @param {string} privateKey
 * @param {string} message
 * @return {string} signature as hex
 */
export function sign(privateKey, message) {
    const sigObj = secp256k1.sign(
        ensureBuffer(message),
        ensureBuffer(privateKey)
    );
    return sigObj.signature.toString('hex');
}

/**
 * check if signature of message is signed by the privateKey of the publicKey
 * @param {string} publicKey
 * @param {string} message
 * @param {string} signature
 * @return {boolean} true if valid, false if not
 */
export function verify(publicKey, message, signature) {
    return secp256k1.verify(
        _helper.ensureBuffer(message),
        _helper.ensureBuffer(signature),
        _helper.ensureBuffer(publicKey)
    );
}
