import {
    generateAddress,
    toChecksumAddress,
    toBuffer
} from 'ethereumjs-util';
import {
    addLeading0x
} from './util';


export function calculateContractAddress(
    creatorAddress,
    nonce
) {
    const addressBuffer = generateAddress(
        toBuffer(addLeading0x(creatorAddress)),
        toBuffer(nonce)
    );
    const address = addressBuffer.toString('hex');
    return toChecksumAddress(addLeading0x(address));
}
