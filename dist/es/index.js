import addressByPublicKey from './address-by-public-key';
import createIdentity from './create-identity';
import decryptWithPrivateKey from './decrypt-with-private-key';
import encryptWithPublicKey from './encrypt-with-public-key';
import publicKeyByPrivateKey from './public-key-by-private-key';
import recover from './recover';
import sign from './sign';
import hash from './hash';
import * as util from './util';

export { addressByPublicKey, createIdentity, decryptWithPrivateKey, encryptWithPublicKey, publicKeyByPrivateKey, recover, sign, hash, util };

export default {
    addressByPublicKey: addressByPublicKey,
    createIdentity: createIdentity,
    decryptWithPrivateKey: decryptWithPrivateKey,
    encryptWithPublicKey: encryptWithPublicKey,
    publicKeyByPrivateKey: publicKeyByPrivateKey,
    recover: recover,
    sign: sign,
    hash: hash,
    util: util
};