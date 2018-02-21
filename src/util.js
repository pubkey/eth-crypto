import Web3 from 'web3';

export const web3 = new Web3();

/**
 * make sure that the given obj is a buffer
 * @param {string|Buffer} bufferOrString
 * @return {Buffer}
 */
export function ensureBuffer(bufferOrString) {
    //make sure its a buffer
    if (typeof bufferOrString === 'string')
        return new Buffer(bufferOrString, 'hex');
    else
        return bufferOrString;
};

/**
 * Prepair Ethereum address for either raw transactions or browser storage.
 */
export function formatAddress(addr) {
    const format = 'hex';
    /*        if (addr.substr(0, 2) == '0x' && format == 'raw') {
                addr = addr.substr(2);
            }*/
    if (addr.substr(0, 2) !== '0x' && format === 'hex')
        addr = '0x' + addr;

    return addr;
};
