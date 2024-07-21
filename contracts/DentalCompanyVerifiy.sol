// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract DentalInsuranceVerifier {
    address public owner;

    struct Business {
        bool isVerified;
        string name;
        string location;
    }

    mapping(address => Business) public businesses;

    event BusinessVerified(address indexed businessAddress, string name, string location);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function verifyBusiness(address _businessAddress, string memory _name, string memory _location) public onlyOwner {
        businesses[_businessAddress] = Business(true, _name, _location);
        emit BusinessVerified(_businessAddress, _name, _location);
    }

    function isBusinessVerified(address _businessAddress) public view returns (bool) {
        return businesses[_businessAddress].isVerified;
    }
}
