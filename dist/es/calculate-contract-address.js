import { generateAddress, toChecksumAddress, toBuffer } from 'ethereumjs-util';
import { addTrailing0x } from './util';

export default function calculateContractAddress(creatorAddress, nonce) {
    var addressBuffer = generateAddress(toBuffer(addTrailing0x(creatorAddress)), toBuffer(nonce));
    var address = addressBuffer.toString('hex');
    return toChecksumAddress(addTrailing0x(address));
}