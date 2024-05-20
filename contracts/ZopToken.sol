// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract Zoppel is ERC20, Ownable, ERC20Permit {
    uint256 public MAX_SUPPLY = 21_000_000 ether;
    constructor(address initialOwner)
        ERC20("Zoppel", "ZOP")
        Ownable(initialOwner)
        ERC20Permit("Zoppel")
    {
        _mint(msg.sender, MAX_SUPPLY);
    }
}
