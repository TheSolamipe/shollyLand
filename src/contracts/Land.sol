// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Land is ERC721 {
    uint256 public cost = 1 ether;
    uint256 public maxSupply = 15;
    uint256 public totalSupply = 0;

    struct Building {
        string name;
        address owner;
        int256 posX;
        int256 posY;
        int256 posZ;
        uint256 sizeX;
        uint256 sizeY;
        uint256 sizeZ;
    }

    Building[] public buildings;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _cost
    ) ERC721(_name, _symbol) {
        cost = _cost;
        buildings.push(Building("City Hall", address(0x0), 0, 0, 0, 10, 5, 10));
        buildings.push(
            Building("Darc Galleria", address(0x0), 0, 10, 0, 10, 10, 3)
        );
        buildings.push(
            Building("Allfather Arena", address(0x0), 0, -10, 0, 5, 10, 5)
        );
        buildings.push(
            Building("Doom Eternal Hub", address(0x0), 10, 0, 0, 10, 25, 10)
        );
        buildings.push(
            Building("High-tech Space", address(0x0), -10, 0, 0, 10, 5, 8)
        );
        buildings.push(
            Building("Learning Hub", address(0x0), 20, 0, 0, 25, 10, 10)
        );
        buildings.push(
            Building("Shopping Mall", address(0x0), 0, 20, 0, 5, 10, 15)
        );
        buildings.push(
            Building("Bio-refinery", address(0x0), 0, -20, 0, 15, 10, 20)
        );
        buildings.push(
            Building("Astra-research Hub", address(0x0), -20, 0, 0, 3, 10, 8)
        );
    }

    function mint(uint256 _id) public payable {
        uint256 supply = totalSupply;
        require(supply <= maxSupply);
        require(buildings[_id - 1].owner == address(0x0));
    }
}
