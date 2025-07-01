"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signTransaction = signTransaction;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _tx = require("@ethereumjs/tx");
var _util = require("@ethereumjs/util");
var _publicKeyByPrivateKey = require("./public-key-by-private-key");
var _publicKey = require("./public-key");
function signTransaction(_x, _x2) {
  return _signTransaction.apply(this, arguments);
}
function _signTransaction() {
  _signTransaction = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(rawTx, privateKey) {
    var txOptions,
      publicKey,
      address,
      privateKeyBuffer,
      tx,
      signedTx,
      serializedTx,
      _args = arguments;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          txOptions = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
          // check if privateKey->address matches rawTx.from
          publicKey = (0, _publicKeyByPrivateKey.publicKeyByPrivateKey)(privateKey);
          address = (0, _publicKey.toAddress)(publicKey);
          if (!(address != rawTx.from)) {
            _context.next = 1;
            break;
          }
          throw new Error('EthCrypto.signTransaction(): rawTx.from does not match the address of the privateKey');
        case 1:
          privateKeyBuffer = Buffer.from(privateKey.replace(/^.{2}/g, ''), 'hex');
          _context.next = 2;
          return (0, _tx.createTxFromRPC)(rawTx, txOptions);
        case 2:
          tx = _context.sent;
          signedTx = tx.sign(privateKeyBuffer);
          serializedTx = (0, _util.bytesToHex)(signedTx.serialize());
          return _context.abrupt("return", serializedTx);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _signTransaction.apply(this, arguments);
}