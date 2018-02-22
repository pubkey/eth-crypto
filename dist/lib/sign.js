'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports['default'] = sign;

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ACCOUNTS_CACHE = new _map2['default']();

/**
 * signs the given message
 * @param  {string} privateKey
 * @param  {string} message
 * @return {{v: string, r: string, s: string}} signature
 */
function sign(privateKey, message) {
    if (!ACCOUNTS_CACHE.has(privateKey)) {
        ACCOUNTS_CACHE.set(privateKey, _util.web3.eth.accounts.privateKeyToAccount(privateKey));
    }
    var account = ACCOUNTS_CACHE.get(privateKey);
    var sig = account.sign(message);
    var ret = {
        v: sig.v,
        r: sig.r,
        s: sig.s
    };
    return ret;
}