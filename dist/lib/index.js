"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "calculateContractAddress", {
  enumerable: true,
  get: function get() {
    return _calculateContractAddress.calculateContractAddress;
  }
});
exports.cipher = void 0;
Object.defineProperty(exports, "createIdentity", {
  enumerable: true,
  get: function get() {
    return _createIdentity.createIdentity;
  }
});
Object.defineProperty(exports, "decryptWithPrivateKey", {
  enumerable: true,
  get: function get() {
    return _decryptWithPrivateKey.decryptWithPrivateKey;
  }
});
exports["default"] = void 0;
Object.defineProperty(exports, "encryptWithPublicKey", {
  enumerable: true,
  get: function get() {
    return _encryptWithPublicKey.encryptWithPublicKey;
  }
});
exports.publicKey = exports.hex = exports.hash = void 0;
Object.defineProperty(exports, "publicKeyByPrivateKey", {
  enumerable: true,
  get: function get() {
    return _publicKeyByPrivateKey.publicKeyByPrivateKey;
  }
});
Object.defineProperty(exports, "recover", {
  enumerable: true,
  get: function get() {
    return _recover.recover;
  }
});
Object.defineProperty(exports, "recoverPublicKey", {
  enumerable: true,
  get: function get() {
    return _recoverPublicKey.recoverPublicKey;
  }
});
Object.defineProperty(exports, "sign", {
  enumerable: true,
  get: function get() {
    return _sign.sign;
  }
});
Object.defineProperty(exports, "signTransaction", {
  enumerable: true,
  get: function get() {
    return _signTransaction.signTransaction;
  }
});
Object.defineProperty(exports, "txDataByCompiled", {
  enumerable: true,
  get: function get() {
    return _txDataByCompiled.txDataByCompiled;
  }
});
exports.vrs = exports.util = void 0;
var _createIdentity = require("./create-identity");
var publicKey = _interopRequireWildcard(require("./public-key"));
exports.publicKey = publicKey;
var _decryptWithPrivateKey = require("./decrypt-with-private-key");
var _encryptWithPublicKey = require("./encrypt-with-public-key");
var cipher = _interopRequireWildcard(require("./cipher"));
exports.cipher = cipher;
var _publicKeyByPrivateKey = require("./public-key-by-private-key");
var _recover = require("./recover");
var _recoverPublicKey = require("./recover-public-key");
var _sign = require("./sign");
var _signTransaction = require("./sign-transaction");
var _txDataByCompiled = require("./tx-data-by-compiled");
var _calculateContractAddress = require("./calculate-contract-address");
var hash = _interopRequireWildcard(require("./hash"));
exports.hash = hash;
var hex = _interopRequireWildcard(require("./hex"));
exports.hex = hex;
var vrs = _interopRequireWildcard(require("./vrs"));
exports.vrs = vrs;
var util = _interopRequireWildcard(require("./util"));
exports.util = util;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _default = {
  createIdentity: _createIdentity.createIdentity,
  publicKey: publicKey,
  decryptWithPrivateKey: _decryptWithPrivateKey.decryptWithPrivateKey,
  encryptWithPublicKey: _encryptWithPublicKey.encryptWithPublicKey,
  cipher: cipher,
  publicKeyByPrivateKey: _publicKeyByPrivateKey.publicKeyByPrivateKey,
  recover: _recover.recover,
  recoverPublicKey: _recoverPublicKey.recoverPublicKey,
  sign: _sign.sign,
  signTransaction: _signTransaction.signTransaction,
  txDataByCompiled: _txDataByCompiled.txDataByCompiled,
  calculateContractAddress: _calculateContractAddress.calculateContractAddress,
  hash: hash,
  hex: hex,
  vrs: vrs,
  util: util
};
exports["default"] = _default;