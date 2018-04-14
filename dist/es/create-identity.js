import publicKeyByPrivateKey from './public-key-by-private-key';

import Account from 'eth-lib/lib/account';

/**
 * creates a new object with
 * private-, public-Key and address
 */
export default function createIdentity() {
  var identity = Account.create();
  identity.publicKey = publicKeyByPrivateKey(identity.privateKey);
  return identity;
}