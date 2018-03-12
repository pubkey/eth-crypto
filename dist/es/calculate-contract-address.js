import ethUtil from 'ethereumjs-util';

export default function calculateContractAddress(creatorAddress, nonce) {
    var addressBuffer = ethUtil.generateAddress(creatorAddress, nonce);
    var address = addressBuffer.toString('hex');
    return ethUtil.toChecksumAddress(address);
}