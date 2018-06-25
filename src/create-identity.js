import publicKeyByPrivateKey from './public-key-by-private-key';

import {
    create as createAccount
} from 'eth-lib/lib/account';

/**
 * creates a new object with
 * private-, public-Key and address
 */
export default function createIdentity() {
    const identity = createAccount();
    identity.publicKey = publicKeyByPrivateKey(identity.privateKey);
    return identity;
}
