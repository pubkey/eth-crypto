import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import eccrypto from 'eccrypto';
import { decompress } from './public-key';

export default (function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(publicKey, message) {
        var pubString, encryptedBuffers, encrypted;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:

                        // ensure its an uncompressed publicKey
                        publicKey = decompress(publicKey);

                        // re-add the compression-flag
                        pubString = '04' + publicKey;
                        _context.next = 4;
                        return eccrypto.encrypt(new Buffer(pubString, 'hex'), Buffer(message));

                    case 4:
                        encryptedBuffers = _context.sent;
                        encrypted = {
                            iv: encryptedBuffers.iv.toString('hex'),
                            ephemPublicKey: encryptedBuffers.ephemPublicKey.toString('hex'),
                            ciphertext: encryptedBuffers.ciphertext.toString('hex'),
                            mac: encryptedBuffers.mac.toString('hex')
                        };
                        return _context.abrupt('return', encrypted);

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function encryptWithPublicKey(_x, _x2) {
        return _ref.apply(this, arguments);
    }

    return encryptWithPublicKey;
})();