import { web3 } from './util';
import publicKeyByPrivateKey from './public-key-by-private-key';

/**
 * creates a new object with
 * private-, public-Key and address
 */
export default function createIdentity() {
    var account = web3.eth.accounts.create();

    var identity = {
        address: account.address,
        privateKey: account.privateKey,
        publicKey: publicKeyByPrivateKey(account.privateKey)
    };

    return identity;
}