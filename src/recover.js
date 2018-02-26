import Account from 'eth-lib/lib/account';
import vrs from './vrs';

/**
 * returns the adress with which the messageHash was signed
 * @param  {string} hexString
 * @param  {string} hash
 * @return {string} address
 */
export default function recover(sigString, hash) {
    return Account.recover(hash, sigString);
}
