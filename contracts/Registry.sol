pragma solidity ^0.4.24;


// ownership transfer and version check using registry contract to manage contract addresses and to bind contracts to their state
contract Registry {

    mapping (string => address) internal versions;

    string internal latestVersion;

    address internal owner ;

    event VersionAdded(string version, address implementation);


    modifier OnlyOwner() {
        require(msg.sender == owner);
        _;

    }
    constructor () public{
        owner = msg.sender;
    }
    function transferOwnership(address newOwner) public OnlyOwner {
            owner = newOwner;
        }


  function addVersion(string version, address implementation) public OnlyOwner{
        require(versions[version] == 0x0);
        versions[version] = implementation;
        emit VersionAdded(version, implementation);
    }

    function getVersion(string version) public view returns (address) {
        return versions[version];
    }

    function getLatestVersion() external view OnlyOwner returns (string){
        return latestVersion;
    }

}
