pragma solidity 0.4.19;

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
     * checks if the signature is valid
     * should be valid for signature created from the sign()-function in js
     */
    function recoverSignature(
        bytes32 msg,
        uint8 v,
        bytes32 r,
        bytes32 s
        ) public constant returns (address) {
        address signer = ecrecover(
                msg,
                v, r, s
            );
        return signer;
    }
}
