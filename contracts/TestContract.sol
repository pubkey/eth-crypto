pragma solidity 0.4.19;

/**
 * this is a test-contract
 * to run tests against it
 * so we can be sure the code works together with ethereum tools
 */

contract TestContract {

    /**
     * hashes the given values
     * should be equal to own hash()-function in js
     */
     function hashString(
         bytes32 someString
     ) public constant returns(bytes32) {
         return keccak256(
             someString
         );
     }

    function hashSomething(
        uint someNumber,
        bytes32 someString,
        uint[] someNumberArray
    ) public constant returns(bytes32) {
        return keccak256(
            someNumber,
            someString,
            someNumberArray
        );
    }

    /**
     * checks if the signature is valid
     * should be valid for signature created from the sign()-function in js
     */
    function recoverSignature(
        bytes32 hash,
        uint8 v,
        bytes32 r,
        bytes32 s,
        address signer
        ) public constant returns (bool valid) {
        address isSigner = ecrecover(
                hash,
                v, r, s
            );
        return isSigner == signer;
    }
}
