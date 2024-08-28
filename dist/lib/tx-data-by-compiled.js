"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.txDataByCompiled = txDataByCompiled;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ethers = require("ethers");
function txDataByCompiled(_x, _x2, _x3) {
  return _txDataByCompiled.apply(this, arguments);
}
function _txDataByCompiled() {
  _txDataByCompiled = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(abi, bytecode, args) {
    var factory, deployTransaction;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // solc returns a string which is often passed instead of the json
          if (typeof abi === 'string') abi = JSON.parse(abi);

          // Construct a Contract Factory
          factory = new _ethers.ContractFactory(abi, '0x' + bytecode); // this function now returns a promise
          // https://docs.ethers.org/v6/api/contract/#ContractFactory-getDeployTransaction
          _context.next = 4;
          return factory.getDeployTransaction.apply(factory, (0, _toConsumableArray2["default"])(args));
        case 4:
          deployTransaction = _context.sent;
          return _context.abrupt("return", deployTransaction.data);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _txDataByCompiled.apply(this, arguments);
}