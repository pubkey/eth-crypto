pragma solidity 0.4.20;


contract DonationBag {

    // donation-signatures must be created by the owner
    address public owner;

    // each donation contains this amount of wei
    uint public amountPerDonation = 1000 * 1000;

    // one address can recieve only one donation
    // the ones already recieved one, are stored here
    mapping (address => bool) public alreadyRecieved;

    // constructor
    function DonationBag(address _owner) public {
        owner = _owner;
    }

    /**
     * to ensure the signatures for this contract cannot be
     * replayed somewhere else, we add this prefix to the signed hash
     */
    string public signPrefix = "Signed for DonationBag:";

    /**
     * validates if the signature is valid
     * by checking if the correct message was signed
     * which consists of <signPrefix><contractAddress><receiverAddress>
     */
    function isSignatureValid(
        address receiver,
        uint8 v,
        bytes32 r,
        bytes32 s
        ) public constant returns (bool correct) {
        bytes32 mustBeSigned = keccak256(
            signPrefix,
            this,
            receiver
        );
        address signer = ecrecover(
            mustBeSigned,
            v, r, s
        );

        return (signer == owner && receiver == msg.sender);
    }

    /**
     * checks if the signature and message is valid
     * if yes we send some wei to the submitter
     */
    function recieveDonation(
        address receiver,
        uint8 v,
        bytes32 r,
        bytes32 s
        ) public {

        // already recieved donation -> revert
        if (alreadyRecieved[msg.sender] == true) revert();

        // signature not valid -> revert
        if (isSignatureValid(
            receiver,
            v, r, s
        ) == false) {
            revert();
        }

        // all valid -> send wei
        msg.sender.transfer(amountPerDonation);
    }

    /**
     * returns the current contract-balance
     */
    function getBalance() public constant returns (uint256 balance) {
        return this.balance;
    }
}
