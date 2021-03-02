// SPDX-License-Identifier: GPL
pragma solidity 0.7.1;

import "./StorageLayout.sol";

contract NewFacet is StorageLayout {
    function sayHello(string calldata name) external pure returns (string memory) {
        return string(abi.encodePacked("hello modified : ", name));
    }

    function sayHello2(string calldata name) external pure returns (string memory) {
        return string(abi.encodePacked("hello2 : ", name));
    }
}
