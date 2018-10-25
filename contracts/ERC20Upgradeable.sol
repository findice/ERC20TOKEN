pragma solidity ^0.4.23;

import "./SafeMath.sol";
import "./Upgradeable.sol";

contract ERC20Upgradeable is Upgradeable{

    using SafeMath for uint256;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    bool transanctionPaused = false;
    mapping (address => bool) public blacklisted;


    constructor ( uint256 _initialAmount) public {
        owner = msg.sender;
        balances[msg.sender] = _initialAmount;
        totalSupply = _initialAmount;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(!(transanctionPaused));
        require(!(blacklisted[msg.sender]));
        require(!(blacklisted[_to]));
        require(balances[msg.sender] >= _value);
        require(_to != address(0));
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance){
        return balances[_owner];
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(!(transanctionPaused));
        require(!(blacklisted[msg.sender]));
        require(!(blacklisted[_to]));
        require(allowed[_from][msg.sender] >= _value);
        require(_to != address(0));
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);

        emit Transfer (_from, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success){
        require(!(transanctionPaused));
        require(!(blacklisted[msg.sender]));
        require(!(blacklisted[_spender]));
        require(_spender != address(0));
        allowed[msg.sender][_spender] = _value;

        emit Approval ( msg.sender, _spender, _value);

        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining){
        return allowed[_owner][_spender];
    }

    function pauseAllTransactions(bool _pause) external OnlyOwner {
        transanctionPaused = _pause;
    }

    function blacklist(address _from,address _to, bool blocked) external OnlyOwner {
        blacklisted[_from] = blocked;
        blacklisted[_to] = blocked;
    }
}
