// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.19;

/**
 * @title ERC20 Faucet for CBiomaH token
 * @notice Simple faucet funded with tokens that allows periodic claims
 */
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address who) external view returns (uint256);
    function decimals() external view returns (uint8);
}

contract Faucet {

    address public owner;
    modifier onlyOwner() { require(msg.sender == owner, "Faucet/not-owner"); _; }
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    IERC20  public immutable token;
    uint256 public claimAmount;
    uint256 public cooldown;
    bool    public enabled;

    mapping(address => uint256) public lastClaim;

    event Claimed(address indexed to, uint256 amount);
    event ParametersUpdated(uint256 claimAmount, uint256 cooldown, bool enabled);
    event Withdrawn(address indexed to, uint256 amount);

    constructor(address _token) {
        require(_token != address(0), "Faucet/token-zero");
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
        token = IERC20(_token);
        claimAmount = 1000 * 1e18; // default 1,000 tokens
        cooldown = 1 days;         // default 24h
        enabled = true;
    }

    function setParameters(uint256 _claimAmount, uint256 _cooldown, bool _enabled) external onlyOwner {
        claimAmount = _claimAmount;
        cooldown = _cooldown;
        enabled = _enabled;
        emit ParametersUpdated(_claimAmount, _cooldown, _enabled);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Faucet/newOwner-zero");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function withdraw(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Faucet/to-zero");
        require(token.transfer(to, amount), "Faucet/withdraw-failed");
        emit Withdrawn(to, amount);
    }

    function claim() external {
        require(enabled, "Faucet/disabled");
        uint256 last = lastClaim[msg.sender];
        require(block.timestamp >= last + cooldown, "Faucet/cooldown");
        require(token.balanceOf(address(this)) >= claimAmount, "Faucet/insufficient-balance");

        lastClaim[msg.sender] = block.timestamp;
        require(token.transfer(msg.sender, claimAmount), "Faucet/transfer-failed");
        emit Claimed(msg.sender, claimAmount);
    }
}
