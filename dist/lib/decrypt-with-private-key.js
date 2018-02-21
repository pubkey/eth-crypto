'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _eccrypto = require('eccrypto');

var _eccrypto2 = _interopRequireDefault(_eccrypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function () {
    var _ref = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee(privateKey, encrypted) {
        var twoStripped, encryptedBuffer, decryptedBuffer;
        return _regenerator2['default'].wrap(function _callee$(_context) {
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
                        return _eccrypto2['default'].decrypt(new Buffer(twoStripped, 'hex'), encryptedBuffer);

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
}();