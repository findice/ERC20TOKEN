pragma solidity ^0.4.4;

library SafeMath {

    function sub(uint256 a, uint256 b) internal pure returns (uint256 remain) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256 sum) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }
}
