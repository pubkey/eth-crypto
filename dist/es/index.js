import addressByPublicKey from './address-by-public-key';
import createIdentity from './create-identity';
import decryptWithPrivateKey from './decrypt-with-private-key';
import encryptWithPublicKey from './encrypt-with-public-key';
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

export { addressByPublicKey, createIdentity, decryptWithPrivateKey, encryptWithPublicKey, publicKeyByPrivateKey, recover, recoverPublicKey, sign, signTransaction, txDataByCompiled, calculateContractAddress, hash, hex, vrs, util };

export default {
    addressByPublicKey: addressByPublicKey,
    createIdentity: createIdentity,
    decryptWithPrivateKey: decryptWithPrivateKey,
    encryptWithPublicKey: encryptWithPublicKey,
    publicKeyByPrivateKey: publicKeyByPrivateKey,
    recover: recover,
    recoverPublicKey: recoverPublicKey,
    sign: sign,
    signTransaction: signTransaction,
    txDataByCompiled: txDataByCompiled,
    calculateContractAddress: calculateContractAddress,
    hash: hash,
    hex: hex,
    vrs: vrs,
    util: util
};