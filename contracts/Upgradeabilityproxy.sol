pragma solidity ^0.4.23;

import "./Proxy.sol";
import "./Upgradeable.sol";

  contract UpgradeabilityProxy is Proxy, UpgradeabilityStorage{

    constructor(address _impl, string _version) public {
        register = Registry(msg.sender);
        owner = msg.sender;
        register.addVersion(_version, _impl);
        _implementation = register.getVersion(_version);
    }


    event Upgraded(string version, address implementation);

    function upgradeTo(string version, address implementation) external OnlyOwner{
        require(_implementation != implementation);
        _version = version;
        _implementation = implementation;
        emit Upgraded(version,implementation);
      }


    function transferOwnership(address _new_owner) external OnlyOwner {
        owner = _new_owner;
        register.transferOwnership(_new_owner);
    }

    function getLatestInstanceVersion() external view OnlyOwner returns (string){
        return register.getLatestVersion();
    }


}
