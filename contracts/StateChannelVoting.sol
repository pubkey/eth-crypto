pragma solidity 0.4.21;
pragma experimental ABIEncoderV2;


/**
 * this contract is used in the state-channel-tutorial under ./tutorials/state-channel.md
 */
contract StateChannelVoting {

    /**
     * to ensure the signatures for this contract cannot be
     * replayed somewhere else, we add this prefix to the signed hash
     */
    string public signPrefix = "Signed for StateChannelVoting:";

    // if a voting is older than this limit, it will be closeable
    uint public timeLimit = 60 * 60 * 24; // 1 day

    /**
     * contains every board-member that is allowed to participate in votings
     * memberAddress -> registerTime
     */
    mapping (address => uint) public boardMembers;

    modifier onlyBoardMember() {
        require(boardMembers[msg.sender] > 0);
        _;
    }

    uint public lastVotingId = 0;
    mapping (uint => Voting) votingById;

    struct Voting {
        // id of the voting
        uint id;

        /**
         * if true -> we vote to add someone to the boardmembers
         * if false -> we vote to send a part of the donations to the receiver
         */
        bool votingType;

        // the address that created the voting
        address creator;

        // title of the voting so voters can identify it
        string title;

        // time when the voting was created
        uint time;

        /**
         * if the voting is successful
         * this address benefits by becoming boardMember or receiving the donation
         */
        address beneficiary;
        // 0 for boardMember-votings, else contains the donationAmount
        uint amount;


        uint closeTime; // if 0, not closed
        bool closeOutcome;

        mapping (address => bool) votes;
    }

    // constructor
    function StateChannelVoting() public {
        // add owner to boardMembers
        boardMembers[msg.sender] = block.timestamp;
    }

    /**
     * default function
     * Whenever ether is send to the contract without
     * transaction data, the default function is called.
     * If you do not have a default-function and send ether to this contract,
     * the transaction will be reverted with 'VM Exception while processing transaction: revert'
     */
    function() public payable {
        // got money
    }

    /**
     * returns true if the given address is a registered voter
     */
    function isVoter(address voter) public view returns (bool) {
        if (boardMembers[voter] > 0) return true;
        else {
            return false;
        }
    }

    /**
     * creates a new voting
     */
    function createVoting (
        bool votingType,
        string title,
        address beneficiary,
        uint amount
        ) public onlyBoardMember {
        uint id = lastVotingId++;
        votingById[id] = Voting({
            id: id,
            votingType: votingType,
            creator: msg.sender,
            title: title,
            time: block.timestamp,
            beneficiary: beneficiary,
            amount: amount,
            closeTime: 0,
            closeOutcome: false
        });
    }

    function closeVoting (
        uint votingId,
        bool outcome // if true, voting succeeded
    ) public onlyBoardMember {
        Voting storage voting = votingById[votingId];

        // time not passed
        if ((voting.time + timeLimit) < block.timestamp) revert();

        // already closed
        if (voting.closeTime != 0) revert();

        voting.closeTime = block.timestamp;
        voting.closeOutcome = outcome;
    }
}
