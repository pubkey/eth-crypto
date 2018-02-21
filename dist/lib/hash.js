'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = hash;

var _util = require('./util');

function hash(str) {
    return _util.web3.utils.soliditySha3(str);
}