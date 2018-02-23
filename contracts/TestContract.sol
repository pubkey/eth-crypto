pragma solidity 0.4.20;

/**
 * this is a test-contract
 * to run tests against it
 * so we can be sure the code works together with ethereum tools
 */

contract TestContract {

    uint public onePublicValue = 1337;

    /**
     * hashes the given values
     * should be equal to own hash()-function in js
     */
    function hashNumber(
        uint256 someNumber
    ) public constant returns(bytes32) {
        return keccak256(
            someNumber
        );
    }

    function hashString(
        string someString
    ) public constant returns(bytes32) {
        return keccak256(
            someString
        );
    }

    function hashMulti(
        string someString,
        uint256 someNumber,
        bool someBool
    ) public constant returns(bytes32) {
        return keccak256(
            someString,
            someNumber,
            someBool
        );
    }

    /**
     * see https://ethereum.stackexchange.com/a/21037/1375
     */
    function signHashLikeWeb3Sign(
        bytes32 _hash
    ) public constant returns (bytes32) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(prefix, _hash);
        return prefixedHash;
    }

    /**
     * checks if the signature is valid
     * should be valid for signature created from the sign()-function in js
     */
    function recoverSignature(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
        ) public constant returns (address) {
        address signer = ecrecover(
                messageHash,
                v, r, s
        );
        return signer;
    }

    /**
     * recovers the signer from the message instead of the messageHash
     */
    function recoverSignatureFromMessage(
        string _message,
        uint8 v,
        bytes32 r,
        bytes32 s
        ) public constant returns (address) {
        bytes32 hash = hashString(_message);
        address signer = ecrecover(
                hash,
                v, r, s
        );
        return signer;
    }

}
