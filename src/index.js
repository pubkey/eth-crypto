
import createIdentity from './create-identity';
import * as publicKey from './public-key';
import decryptWithPrivateKey from './decrypt-with-private-key';
import encryptWithPublicKey from './encrypt-with-public-key';
import * as cipher from './cipher';
import publicKeyByPrivateKey from './public-key-by-private-key';
import recover from './recover';
import recoverPublicKey from './recover-public-key';
import sign from './sign';
import signTransaction from './sign-transaction';
import txDataByCompiled from './tx-data-by-compiled';
import calculateContractAddress from './calculate-contract-address';
import * as hash from './hash';
import * as hex from './hex';
import * as vrs from './vrs';
import * as util from './util';

export {
    createIdentity,
    publicKey,
    decryptWithPrivateKey,
    encryptWithPublicKey,
    cipher,
    publicKeyByPrivateKey,
    recover,
    recoverPublicKey,
    sign,
    signTransaction,
    txDataByCompiled,
    calculateContractAddress,
    hash,
    hex,
    vrs,
    util
};

export default {
    createIdentity,
    publicKey,
    decryptWithPrivateKey,
    encryptWithPublicKey,
    cipher,
    publicKeyByPrivateKey,
    recover,
    recoverPublicKey,
    sign,
    signTransaction,
    txDataByCompiled,
    calculateContractAddress,
    hash,
    hex,
    vrs,
    util
};
