'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureBuffer = ensureBuffer;
exports.formatAddress = formatAddress;
/**
 * make sure that the given obj is a buffer
 * @param {string|Buffer} bufferOrString
 * @return {Buffer}
 */
function ensureBuffer(bufferOrString) {
    //make sure its a buffer
    if (typeof bufferOrString === 'string') return new Buffer(bufferOrString, 'hex');else return bufferOrString;
};

/**
 * Prepair Ethereum address for either raw transactions or browser storage.
 */
function formatAddress(addr) {
    var format = 'hex';
    /*        if (addr.substr(0, 2) == '0x' && format == 'raw') {
                addr = addr.substr(2);
            }*/
    if (addr.substr(0, 2) !== '0x' && format === 'hex') addr = '0x' + addr;

    return addr;
};