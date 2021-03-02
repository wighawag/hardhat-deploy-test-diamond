// SPDX-License-Identifier: GPL
pragma solidity 0.7.1;

contract FacetToDelete {
    function sayHello(string calldata name) external pure returns (string memory) {
        return string(abi.encodePacked("hello : ", name));
    }

    function sayHello1(string calldata name) external pure returns (string memory) {
        return string(abi.encodePacked("hello1 : ", name));
    }
}
