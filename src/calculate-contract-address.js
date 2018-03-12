import ethUtil from 'ethereumjs-util';


export default function calculateContractAddress(
    creatorAddress,
    nonce
) {
    const addressBuffer = ethUtil.generateAddress(
        creatorAddress,
        nonce
    );
    const address = addressBuffer.toString('hex');
    return ethUtil.toChecksumAddress(address);
}
