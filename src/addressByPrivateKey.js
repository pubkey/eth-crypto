import { Wallet } from 'ethers';
import { stripHexPrefix } from 'ethereumjs-util';


export default function addressByPrivateKey(privateKey) {
   
    const wallet = new Wallet(privateKey);
    const identity = {
        privateKey: privateKey,
        // remove trailing '0x04'
        publicKey: stripHexPrefix(wallet.publicKey).slice(2),
        address: wallet.address,
    };
    return identity.address;
}