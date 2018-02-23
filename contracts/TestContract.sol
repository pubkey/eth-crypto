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
        uint someNumber
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

    /**
     * see https://ethereum.stackexchange.com/a/21037/1375
     */
    function signHashLikeWeb3(
        bytes32 _message
    ) public constant returns (bytes32) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(prefix, _message);
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
        bytes32 _message,
        uint8 v,
        bytes32 r,
        bytes32 s
        ) public constant returns (address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(prefix, _message);
        address signer = ecrecover(
                prefixedHash,
                v, r, s
        );
        return signer;
    }

}
