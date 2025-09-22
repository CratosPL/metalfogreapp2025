// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MetalForgeRegistry is Ownable {
    struct Band {
        string name;
        string genre;
        string country;
        uint256 year;
        bool verified;
        uint256 timestamp;
    }
    
    mapping(address => uint256) public userBandCount;
    mapping(address => mapping(uint256 => Band)) public userBands;
    
    event BandAdded(address indexed user, uint256 indexed bandId, string name);
    event BandVerified(address indexed user, uint256 indexed bandId);
    
    constructor() Ownable() {}
    
    function addBand(
        string memory name,
        string memory genre, 
        string memory country,
        uint256 year
    ) external {
        uint256 bandId = userBandCount[msg.sender];
        
        userBands[msg.sender][bandId] = Band({
            name: name,
            genre: genre,
            country: country,
            year: year,
            verified: false,
            timestamp: block.timestamp
        });
        
        userBandCount[msg.sender]++;
        
        emit BandAdded(msg.sender, bandId, name);
    }
    
    function verifyBand(address user, uint256 bandId) external onlyOwner {
        require(bandId < userBandCount[user], "Band does not exist");
        userBands[user][bandId].verified = true;
        
        emit BandVerified(user, bandId);
    }
    
    function getUserBands(address user) external view returns (Band[] memory) {
        uint256 count = userBandCount[user];
        Band[] memory bands = new Band[](count);
        
        for (uint256 i = 0; i < count; i++) {
            bands[i] = userBands[user][i];
        }
        
        return bands;
    }
}
