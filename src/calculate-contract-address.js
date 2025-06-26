import {
    generateAddress,
    toChecksumAddress,
    hexToBytes,
    bytesToHex,
    intToHex
} from '@ethereumjs/util';
import {
    addLeading0x
} from './util';


export function calculateContractAddress(
    creatorAddress,
    nonce
) {
    const addressBuffer = generateAddress(
        hexToBytes(addLeading0x(creatorAddress)),
        hexToBytes(intToHex(nonce))
    );
    const address = bytesToHex(addressBuffer);
    return toChecksumAddress(addLeading0x(address));
}
