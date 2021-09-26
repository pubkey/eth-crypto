import { generateAddress, toChecksumAddress, toBuffer } from 'ethereumjs-util';
import { addLeading0x } from './util';
export default function calculateContractAddress(creatorAddress, nonce) {
  var addressBuffer = generateAddress(toBuffer(addLeading0x(creatorAddress)), toBuffer(nonce));
  var address = addressBuffer.toString('hex');
  return toChecksumAddress(addLeading0x(address));
}