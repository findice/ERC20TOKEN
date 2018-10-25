pragma solidity ^0.4.23;

import "./Registry.sol";

contract UpgradeabilityStorage {

    Registry internal register;
    address internal owner;
    address internal _implementation;
    string internal _version;


    modifier OnlyOwner() {
        require(msg.sender == owner);
        _;
    }
    function version() public view returns (string) {
      return _version;
    }

    function implementation() public view returns (address) {
        return _implementation;
    }

    event Upgraded(string version, address implementation);

}


contract Upgradeable is UpgradeabilityStorage{
    uint256 public totalSupply;

    function balanceOf(address _owner) public view returns (uint256 balance);

    function transfer(address _to, uint256 _value) public returns (bool success);

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);

    function approve(address _spender, uint256 _value) public returns (bool success);

    function allowance(address _owner, address _spender) public view returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}
