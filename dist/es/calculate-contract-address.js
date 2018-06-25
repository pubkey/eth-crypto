import { generateAddress, toChecksumAddress } from 'ethereumjs-util';

export default function calculateContractAddress(creatorAddress, nonce) {
    var addressBuffer = generateAddress(creatorAddress, nonce);
    var address = addressBuffer.toString('hex');
    return toChecksumAddress(address);
}