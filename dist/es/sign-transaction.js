import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { createTxFromRPC } from '@ethereumjs/tx';
import { bytesToHex } from '@ethereumjs/util';
import { publicKeyByPrivateKey } from './public-key-by-private-key';
import { toAddress as addressByPublicKey } from './public-key';
export function signTransaction(_x, _x2) {
  return _signTransaction.apply(this, arguments);
}
function _signTransaction() {
  _signTransaction = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(rawTx, privateKey) {
    var txOptions,
      publicKey,
      address,
      privateKeyBuffer,
      tx,
      signedTx,
      serializedTx,
      _args = arguments;
    return _regeneratorRuntime.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          txOptions = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
          // check if privateKey->address matches rawTx.from
          publicKey = publicKeyByPrivateKey(privateKey);
          address = addressByPublicKey(publicKey);
          if (!(address != rawTx.from)) {
            _context.next = 1;
            break;
          }
          throw new Error('EthCrypto.signTransaction(): rawTx.from does not match the address of the privateKey');
        case 1:
          privateKeyBuffer = Buffer.from(privateKey.replace(/^.{2}/g, ''), 'hex');
          _context.next = 2;
          return createTxFromRPC(rawTx, txOptions);
        case 2:
          tx = _context.sent;
          signedTx = tx.sign(privateKeyBuffer);
          serializedTx = bytesToHex(signedTx.serialize());
          return _context.abrupt("return", serializedTx);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _signTransaction.apply(this, arguments);
}