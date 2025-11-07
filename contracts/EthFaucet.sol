// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.19;

/**
 * @title ETH Sepolia Faucet
 * @notice Simple faucet funded with ETH that allows periodic claims of 0.001 ETH every 24 hours
 */
contract EthFaucet {

    address public owner;
    modifier onlyOwner() { require(msg.sender == owner, "EthFaucet/not-owner"); _; }
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    uint256 public constant CLAIM_AMOUNT = 0.001 ether; // 0.001 ETH
    uint256 public constant COOLDOWN = 24 hours;        // 24 hours
    bool public enabled;

    mapping(address => uint256) public lastClaim;

    event Claimed(address indexed to, uint256 amount);
    event ParametersUpdated(bool enabled);
    event Withdrawn(address indexed to, uint256 amount);

    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
        enabled = true;
    }

    function setEnabled(bool _enabled) external onlyOwner {
        enabled = _enabled;
        emit ParametersUpdated(_enabled);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "EthFaucet/newOwner-zero");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function withdraw(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "EthFaucet/to-zero");
        require(amount <= address(this).balance, "EthFaucet/insufficient-balance");
        payable(to).transfer(amount);
        emit Withdrawn(to, amount);
    }

    function claim() external {
        require(enabled, "EthFaucet/disabled");
        uint256 last = lastClaim[msg.sender];
        require(block.timestamp >= last + COOLDOWN, "EthFaucet/cooldown");
        require(address(this).balance >= CLAIM_AMOUNT, "EthFaucet/insufficient-balance");

        lastClaim[msg.sender] = block.timestamp;
        payable(msg.sender).transfer(CLAIM_AMOUNT);
        emit Claimed(msg.sender, CLAIM_AMOUNT);
    }

    function getClaimTimeRemaining(address user) external view returns (uint256) {
        uint256 last = lastClaim[user];
        if (last == 0) return 0;
        uint256 nextClaimTime = last + COOLDOWN;
        if (block.timestamp >= nextClaimTime) return 0;
        return nextClaimTime - block.timestamp;
    }

    function canClaim(address user) external view returns (bool) {
        uint256 last = lastClaim[user];
        return block.timestamp >= last + COOLDOWN;
    }

    receive() external payable {}
}