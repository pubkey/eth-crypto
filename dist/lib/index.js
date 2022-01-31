"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "calculateContractAddress", {
  enumerable: true,
  get: function get() {
    return _calculateContractAddress["default"];
  }
});
exports.cipher = void 0;
Object.defineProperty(exports, "createIdentity", {
  enumerable: true,
  get: function get() {
    return _createIdentity["default"];
  }
});
Object.defineProperty(exports, "decryptWithPrivateKey", {
  enumerable: true,
  get: function get() {
    return _decryptWithPrivateKey["default"];
  }
});
exports["default"] = void 0;
Object.defineProperty(exports, "encryptWithPublicKey", {
  enumerable: true,
  get: function get() {
    return _encryptWithPublicKey["default"];
  }
});
exports.publicKey = exports.hex = exports.hash = void 0;
Object.defineProperty(exports, "publicKeyByPrivateKey", {
  enumerable: true,
  get: function get() {
    return _publicKeyByPrivateKey["default"];
  }
});
Object.defineProperty(exports, "recover", {
  enumerable: true,
  get: function get() {
    return _recover["default"];
  }
});
Object.defineProperty(exports, "recoverPublicKey", {
  enumerable: true,
  get: function get() {
    return _recoverPublicKey["default"];
  }
});
Object.defineProperty(exports, "sign", {
  enumerable: true,
  get: function get() {
    return _sign["default"];
  }
});
Object.defineProperty(exports, "signTransaction", {
  enumerable: true,
  get: function get() {
    return _signTransaction["default"];
  }
});
Object.defineProperty(exports, "txDataByCompiled", {
  enumerable: true,
  get: function get() {
    return _txDataByCompiled["default"];
  }
});
exports.vrs = exports.util = void 0;

var _createIdentity = _interopRequireDefault(require("./create-identity"));

var publicKey = _interopRequireWildcard(require("./public-key"));

exports.publicKey = publicKey;

var _decryptWithPrivateKey = _interopRequireDefault(require("./decrypt-with-private-key"));

var _encryptWithPublicKey = _interopRequireDefault(require("./encrypt-with-public-key"));

var cipher = _interopRequireWildcard(require("./cipher"));

exports.cipher = cipher;

var _publicKeyByPrivateKey = _interopRequireDefault(require("./public-key-by-private-key"));

var _recover = _interopRequireDefault(require("./recover"));

var _recoverPublicKey = _interopRequireDefault(require("./recover-public-key"));

var _sign = _interopRequireDefault(require("./sign"));

var _signTransaction = _interopRequireDefault(require("./sign-transaction"));

var _txDataByCompiled = _interopRequireDefault(require("./tx-data-by-compiled"));

var _calculateContractAddress = _interopRequireDefault(require("./calculate-contract-address"));

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
  createIdentity: _createIdentity["default"],
  publicKey: publicKey,
  decryptWithPrivateKey: _decryptWithPrivateKey["default"],
  encryptWithPublicKey: _encryptWithPublicKey["default"],
  cipher: cipher,
  publicKeyByPrivateKey: _publicKeyByPrivateKey["default"],
  recover: _recover["default"],
  recoverPublicKey: _recoverPublicKey["default"],
  sign: _sign["default"],
  signTransaction: _signTransaction["default"],
  txDataByCompiled: _txDataByCompiled["default"],
  calculateContractAddress: _calculateContractAddress["default"],
  hash: hash,
  hex: hex,
  vrs: vrs,
  util: util
};
exports["default"] = _default;