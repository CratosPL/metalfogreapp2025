// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MetalForgeBadges is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    
    mapping(address => uint256) public bandCount;
    mapping(address => bool) public hasBronzeBadge;
    
    event BadgeMinted(address indexed user, uint256 tokenId);
    event BandCountUpdated(address indexed user, uint256 newCount);
    
    constructor() 
        ERC721("MetalForge Badges", "MFB") 
        Ownable() {}
    
    function updateBandCount(address user, uint256 newCount) external 
onlyOwner {
        bandCount[user] = newCount;
        emit BandCountUpdated(user, newCount);
        
        if (newCount >= 1 && !hasBronzeBadge[user]) {
            _mintBadge(user);
        }
    }
    
    function _mintBadge(address user) internal {
        uint256 tokenId = _tokenIdCounter++;
        _mint(user, tokenId);
        hasBronzeBadge[user] = true;
        
        emit BadgeMinted(user, tokenId);
    }
    
    function getUserBandCount(address user) external view returns 
(uint256) {
        return bandCount[user];
    }
    
    function tokenURI(uint256 tokenId) public pure override returns 
(string memory) {
        return 
"https://metalfogreapp2025-6fur.vercel.app/api/badge-metadata/bronze";
    }
}

