'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeLeading0x = removeLeading0x;
exports.addLeading0x = addLeading0x;
exports.uint8ArrayToHex = uint8ArrayToHex;
exports.hexToUnit8Array = hexToUnit8Array;
function removeLeading0x(str) {
    if (str.startsWith('0x')) return str.substring(2);else return str;
}

function addLeading0x(str) {
    if (!str.startsWith('0x')) return '0x' + str;else return str;
}

function uint8ArrayToHex(arr) {
    return Buffer.from(arr).toString('hex');
}

function hexToUnit8Array(str) {
    return new Uint8Array(Buffer.from(str, 'hex'));
}