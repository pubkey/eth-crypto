'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeTrailing0x = removeTrailing0x;
exports.addTrailing0x = addTrailing0x;
function removeTrailing0x(str) {
    if (str.startsWith('0x')) return str.substring(2);else return str;
}

function addTrailing0x(str) {
    if (!str.startsWith('0x')) return '0x' + str;else return str;
}