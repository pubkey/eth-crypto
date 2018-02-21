import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import eccrypto from 'eccrypto';

export default (function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(privateKey, encrypted) {
        var twoStripped, encryptedBuffer, decryptedBuffer;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:

                        // remove trailing '0x' from privateKey
                        twoStripped = privateKey.replace(/^.{2}/g, '');
                        encryptedBuffer = {
                            iv: new Buffer(encrypted.iv, 'hex'),
                            ephemPublicKey: new Buffer(encrypted.ephemPublicKey, 'hex'),
                            ciphertext: new Buffer(encrypted.ciphertext, 'hex'),
                            mac: new Buffer(encrypted.mac, 'hex')
                        };
                        _context.next = 4;
                        return eccrypto.decrypt(new Buffer(twoStripped, 'hex'), encryptedBuffer);

                    case 4:
                        decryptedBuffer = _context.sent;
                        return _context.abrupt('return', decryptedBuffer.toString());

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function decryptWithPrivateKey(_x, _x2) {
        return _ref.apply(this, arguments);
    }

    return decryptWithPrivateKey;
})();