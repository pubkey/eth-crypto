"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromString = fromString;
exports.toString = toString;
var ethersUtils = _interopRequireWildcard(require("ethers"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * split signature-hex into parts
 * @param  {string} hexString
 * @return {{v: string, r: string, s: string}}
 */
function fromString(hexString) {
  var arr = ethersUtils.Signature.from(hexString);
  return {
    // convert "v" to hex
    v: "0x".concat(arr.v.toString(16)),
    r: arr.r,
    s: arr.s
  };
}

/**
 * merge signature-parts to one string
 * @param  {{v: string, r: string, s: string}} sig
 * @return {string} hexString
 */
function toString(sig) {
  // migrating from v5 to v6:
  // https://docs.ethers.org/v6/migrating/#migrate-signatures
  return ethersUtils.Signature.from(sig).serialized;
}