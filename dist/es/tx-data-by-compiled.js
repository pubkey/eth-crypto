import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { ContractFactory } from 'ethers';
export function txDataByCompiled(_x, _x2, _x3) {
  return _txDataByCompiled.apply(this, arguments);
}
function _txDataByCompiled() {
  _txDataByCompiled = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(abi, bytecode, args) {
    var factory, deployTransaction;
    return _regeneratorRuntime.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // solc returns a string which is often passed instead of the json
          if (typeof abi === 'string') abi = JSON.parse(abi);

          // Construct a Contract Factory
          factory = new ContractFactory(abi, '0x' + bytecode);
          _context.next = 1;
          return factory.getDeployTransaction.apply(factory, _toConsumableArray(args));
        case 1:
          deployTransaction = _context.sent;
          return _context.abrupt("return", deployTransaction.data);
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _txDataByCompiled.apply(this, arguments);
}