import {
    generateAddress,
    toChecksumAddress
} from 'ethereumjs-util';


export default function calculateContractAddress(
    creatorAddress,
    nonce
) {
    const addressBuffer = generateAddress(
        creatorAddress,
        nonce
    );
    const address = addressBuffer.toString('hex');
    return toChecksumAddress(address);
}
