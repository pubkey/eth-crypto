import addressByPublicKey from './address-by-public-key';
import createIdentity from './create-identity';
import decryptWithPrivateKey from './decrypt-with-private-key';
import encryptWithPublicKey from './encrypt-with-public-key';
import publicKeyByPrivateKey from './public-key-by-private-key';
import recover from './recover';
import sign from './sign';
import signTransaction from './sign-transaction';
import txDataByCompiled from './tx-data-by-compiled';
import * as hash from './hash';
import * as hex from './hex';
import * as vrs from './vrs';
import * as util from './util';

export { addressByPublicKey, createIdentity, decryptWithPrivateKey, encryptWithPublicKey, publicKeyByPrivateKey, recover, sign, signTransaction, txDataByCompiled, hash, hex, vrs, util };

export default {
    addressByPublicKey: addressByPublicKey,
    createIdentity: createIdentity,
    decryptWithPrivateKey: decryptWithPrivateKey,
    encryptWithPublicKey: encryptWithPublicKey,
    publicKeyByPrivateKey: publicKeyByPrivateKey,
    recover: recover,
    sign: sign,
    signTransaction: signTransaction,
    txDataByCompiled: txDataByCompiled,
    hash: hash,
    hex: hex,
    vrs: vrs,
    util: util
};