import Web3 from 'web3';

export var web3 = new Web3();

export function removeTrailing0x(str) {
    if (str.startsWith('0x')) return str.substring(2);else return str;
}

export function addTrailing0x(str) {
    if (!str.startsWith('0x')) return '0x' + str;else return str;
}