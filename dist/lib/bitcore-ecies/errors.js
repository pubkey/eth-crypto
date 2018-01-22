'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bitcoreLib = require('bitcore-lib');

var spec = {
    name: 'ECIES',
    message: 'Internal Error on bitcore-ecies Module {0}',
    errors: [{
        name: 'InvalidPadding',
        message: 'Invalid padding: {0}'
    }]
}; /**
    * copied from bitcore-ecies
    * https://github.com/bitpay/bitcore-ecies
    */

exports['default'] = _bitcoreLib.errors.extend(spec);