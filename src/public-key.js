import {
    publicKeyConvert
} from 'secp256k1';
import {
    pubToAddress,
    toChecksumAddress
} from 'ethereumjs-util';

export function compress(startsWith04) {

    // add trailing 04 if not done before
    const testBuffer = new Buffer(startsWith04, 'hex');
    if (testBuffer.length === 64) startsWith04 = '04' + startsWith04;


    return publicKeyConvert(
        new Buffer(startsWith04, 'hex'),
        true
    ).toString('hex');
}

export function decompress(startsWith02Or03) {

    // if already decompressed an not has trailing 04
    const testBuffer = new Buffer(startsWith02Or03, 'hex');
    if (testBuffer.length === 64) startsWith02Or03 = '04' + startsWith02Or03;

    let decompressed = publicKeyConvert(
        new Buffer(startsWith02Or03, 'hex'),
        false
    ).toString('hex');

    // remove trailing 04
    decompressed = decompressed.substring(2);
    return decompressed;
}

/**
 * generates the ethereum-adress of the publicKey
 * We create the checksum-adress which is case-sensitive
 * @returns {string} address
 */
export function toAddress(publicKey) {

    // normalize key
    publicKey = decompress(publicKey);

    const addressBuffer = pubToAddress(new Buffer(publicKey, 'hex'));
    const checkSumAdress = toChecksumAddress(addressBuffer.toString('hex'));
    return checkSumAdress;
}
