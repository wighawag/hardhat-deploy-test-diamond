// SPDX-License-Identifier: GPL
pragma solidity 0.7.1;

import "./StorageLayout.sol";

contract TestFacet is StorageLayout {
    function saveNumber(uint256 v) external {
        _value = v;
    }

    function getNumber() external view returns (uint256) {
        return _value;
    }
}
