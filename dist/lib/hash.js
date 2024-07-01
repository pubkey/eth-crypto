"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIGN_PREFIX = void 0;
exports.keccak256 = keccak256;
var ethersUtils = _interopRequireWildcard(require("ethers"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function keccak256(params) {
  var types = [];
  var values = [];
  if (!Array.isArray(params)) {
    types.push('string');
    values.push(params);
  } else {
    params.forEach(function (p) {
      types.push(p.type);
      values.push(p.value);
    });
  }
  return ethersUtils.solidityPackedKeccak256(types, values);
}
var SIGN_PREFIX = exports.SIGN_PREFIX = '\x19Ethereum Signed Message:\n32';