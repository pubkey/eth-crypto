'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.web3 = undefined;
exports.removeTrailing0x = removeTrailing0x;
exports.addTrailing0x = addTrailing0x;

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var web3 = exports.web3 = new _web2['default']();

function removeTrailing0x(str) {
    if (str.startsWith('0x')) return str.substring(2);else return str;
}

function addTrailing0x(str) {
    if (!str.startsWith('0x')) return '0x' + str;else return str;
}