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
    var _ref = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee(publicKey, message) {
        var pubString, encryptedBuffers, encrypted;
        return _regenerator2['default'].wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:

                        // re-add the compression-flag
                        pubString = '04' + publicKey;
                        _context.next = 3;
                        return _eccrypto2['default'].encrypt(new Buffer(pubString, 'hex'), Buffer(message));

                    case 3:
                        encryptedBuffers = _context.sent;
                        encrypted = {
                            iv: encryptedBuffers.iv.toString('hex'),
                            ephemPublicKey: encryptedBuffers.ephemPublicKey.toString('hex'),
                            ciphertext: encryptedBuffers.ciphertext.toString('hex'),
                            mac: encryptedBuffers.mac.toString('hex')
                        };
                        return _context.abrupt('return', encrypted);

                    case 6:
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
}();