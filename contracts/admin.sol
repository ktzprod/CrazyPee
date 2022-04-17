// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Admin is Ownable {

    mapping (address => bool) private admins;

    event NewAdmin(address indexed addr);
    event RevokedAdmin(address indexed addr);

    constructor() {
        admins[msg.sender] = true;
    }

    modifier isAdmin() {
        require(admins[msg.sender]);
        _;
    }

    function addNewAdmin(address _addr) external onlyOwner() {
        emit NewAdmin(_addr);
        admins[_addr] = true;
    }

    function revokeFromAdmins(address _addr) external onlyOwner() {
        emit RevokedAdmin(_addr);
        admins[_addr] = false;
    }
}