pragma solidity 0.4.21;
pragma experimental ABIEncoderV2;


/**
 * this contract is used in the on-chain-judge-tutorial under ./tutorials/on-chain-judge.md
 */
contract OnChainJudge {

    /**
     * to ensure the signatures for this contract cannot be
     * replayed somewhere else, we add this prefix to the signed hash
     */
    string public signPrefix = "Signed for OnChainJudge:";

    // if a voting is older than this limit, it will be closeable
    uint public timeLimit = 60 * 60 * 24; // 1 day

    /**
     * contains every board-member that is allowed to participate in votings
     * memberAddress -> registerTime
     */
    mapping (address => uint) public boardMembers;
    address[] boardMemberList;

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

        /**
         * if the voting is successful
         * this address benefits by becoming boardMember or receiving the donation
         */
        address beneficiary;
        // 0 for boardMember-votings, else contains the donationAmount
        uint amount;


        /**
         * state of the voting
         * 0 -> open
         * 1 -> closed with probably correct result
         * 2 -> on-chain voting enforced
         * 3 -> closed with end-result
         */
        uint state;
        // time of the last state-change
        uint stateChange;

        bool result;

        mapping (address => bool) voters;
        uint votesTrue;
        uint votesFalse;
    }

    // constructor
    function OnChainJudge() public {
        // add owner to boardMembers
        addToBoardMember(msg.sender);
    }

    function addToBoardMember(address member) private {
        boardMembers[member] = block.timestamp;
        boardMemberList.push(member);
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

    function setVotingState(Voting voting, uint newState) private {
        voting.state = newState;
        voting.stateChange = block.timestamp;
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
            beneficiary: beneficiary,
            amount: amount,
            state: 0,
            stateChange: block.timestamp,
            result: false,
            votesTrue: 0,
            votesFalse: 0
        });
    }

    function submitOffChainResult (
        uint votingId,
        bool outcome // if true, voting succeeded
    ) public onlyBoardMember {
        Voting storage voting = votingById[votingId];

        // time not passed
        if ((voting.stateChange + timeLimit) < block.timestamp) revert();

        // already closed
        if (voting.state != 0) revert();

        setVotingState(voting, 1);

        voting.result = outcome;
    }

    function enforceOnChainVoting (
        uint votingId,
        bool vote
    ) public onlyBoardMember {
        Voting storage voting = votingById[votingId];

        // only from state 1 or 2
        if (voting.state != 1 && voting.state != 2) revert();

        if (voting.state == 1) {
            setVotingState(voting, 2);
        }

        // already voted
        if (voting.voters[msg.sender] == true) revert();

        // set own voting
        voting.voters[msg.sender] = true;
        if (vote == true) voting.votesTrue++;
        else {
            voting.votesFalse++;
        }
    }

    function endResult (
        uint votingId
    ) public onlyBoardMember {
        Voting storage voting = votingById[votingId];

        // time not passed
        if ((voting.stateChange + timeLimit) < block.timestamp) revert();

        // only from state 1 or 2
        if (voting.state != 1 && voting.state != 2) revert();

        setVotingState(voting, 3);

        if (voting.state == 1) {
            // use off-chain result
        } else {
            // use on-chain result
            if (voting.votesTrue > voting.votesFalse) {
                voting.result = true;
            } else {
                voting.result = false;
            }
        }

        if (voting.result == true) {
            if (voting.votingType == true) {
                // add to boardMembers
                addToBoardMember(voting.beneficiary);
            } else {
                // send money
                voting.beneficiary.transfer(voting.amount);
            }
        }
    }
}
