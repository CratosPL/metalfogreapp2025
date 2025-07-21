// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
// USUŃ: import "@openzeppelin/contracts/utils/Counters.sol";

contract MetalForgeRegistry is Ownable, ReentrancyGuard {
    // ZMIEŃ: Usuń Counters, użyj zwykłego uint256
    // using Counters for Counters.Counter;
    // Counters.Counter private _bandIds;
    
    uint256 private _bandIdCounter = 0; // NOWE: Prosty counter
    
    struct Band {
        uint256 id;
        string name;
        string genre;
        string country;
        uint256 yearFormed;
        address addedBy;
        uint256 addedAt;
        bool isVerified;
        address verifier;
        uint256 reputation;
        string metadataURI; // For future IPFS integration
    }
    
    struct UserStats {
        uint256 totalBands;
        uint256 verifiedBands;
        uint256 reputation;
        uint256 joinDate;
        bool exists;
    }
    
    // Mappings
    mapping(uint256 => Band) public bands;
    mapping(address => uint256[]) public userBands;
    mapping(address => UserStats) public userStats;
    mapping(string => bool) public bandExists; // To prevent duplicates
    mapping(address => bool) public verifiers; // Authorized verifiers
    
    // Events
    event BandAdded(
        uint256 indexed bandId, 
        string name, 
        string genre, 
        address indexed addedBy,
        uint256 timestamp
    );
    
    event BandVerified(
        uint256 indexed bandId, 
        address indexed verifier,
        uint256 timestamp
    );
    
    event ReputationUpdated(
        address indexed user, 
        uint256 newReputation,
        string reason
    );
    
    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);
    
    // Constants for reputation system
    uint256 public constant POINTS_PER_BAND = 5;
    uint256 public constant POINTS_PER_VERIFICATION = 10;
    uint256 public constant POINTS_GENRE_DIVERSITY = 15;
    uint256 public constant MIN_YEAR = 1960;
    
    constructor() Ownable(msg.sender) {
        verifiers[msg.sender] = true; // Owner is initial verifier
    }
    
    // Modifiers
    modifier onlyVerifier() {
        require(verifiers[msg.sender] || msg.sender == owner(), "Not authorized verifier");
        _;
    }
    
    modifier validBandData(string memory _name, string memory _genre, uint256 _yearFormed) {
        require(bytes(_name).length > 0, "Band name required");
        require(bytes(_genre).length > 0, "Genre required");
        require(_yearFormed >= MIN_YEAR && _yearFormed <= block.timestamp / 365 days + 1970, "Invalid year");
        require(!bandExists[_name], "Band already exists");
        _;
    }
    
    /**
     * @dev Add a new band to the registry
     * @param _name Band name
     * @param _genre Music genre
     * @param _country Country of origin
     * @param _yearFormed Year the band was formed
     */
    function addBand(
        string memory _name,
        string memory _genre,
        string memory _country,
        uint256 _yearFormed
    ) external validBandData(_name, _genre, _yearFormed) nonReentrant {
        // ZMIEŃ: Użyj prostego incrementu zamiast Counters
        _bandIdCounter++;
        uint256 newBandId = _bandIdCounter;
        
        // Create band
        bands[newBandId] = Band({
            id: newBandId,
            name: _name,
            genre: _genre,
            country: _country,
            yearFormed: _yearFormed,
            addedBy: msg.sender,
            addedAt: block.timestamp,
            isVerified: false,
            verifier: address(0),
            reputation: 0,
            metadataURI: ""
        });
        
        // Mark band as existing
        bandExists[_name] = true;
        
        // Update user data
        userBands[msg.sender].push(newBandId);
        _updateUserStats(msg.sender);
        _awardReputation(msg.sender, POINTS_PER_BAND, "Band Added");
        
        emit BandAdded(newBandId, _name, _genre, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Verify a band (only by authorized verifiers)
     * @param _bandId ID of the band to verify
     */
    function verifyBand(uint256 _bandId) external onlyVerifier nonReentrant {
        // ZMIEŃ: Użyj _bandIdCounter zamiast _bandIds.current()
        require(_bandId > 0 && _bandId <= _bandIdCounter, "Invalid band ID");
        require(!bands[_bandId].isVerified, "Band already verified");
        
        bands[_bandId].isVerified = true;
        bands[_bandId].verifier = msg.sender;
        
        // Award reputation to original adder
        address adder = bands[_bandId].addedBy;
        _awardReputation(adder, POINTS_PER_VERIFICATION, "Band Verified");
        _updateUserStats(adder);
        
        emit BandVerified(_bandId, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Get band details by ID
     * @param _bandId Band ID
     * @return Band struct
     */
    function getBand(uint256 _bandId) external view returns (Band memory) {
        require(_bandId > 0 && _bandId <= _bandIdCounter, "Invalid band ID");
        return bands[_bandId];
    }
    
    /**
     * @dev Get all bands added by a user
     * @param _user User address
     * @return Array of band IDs
     */
    function getUserBands(address _user) external view returns (uint256[] memory) {
        return userBands[_user];
    }
    
    /**
     * @dev Get user statistics
     * @param _user User address
     * @return UserStats struct
     */
    function getUserStats(address _user) external view returns (UserStats memory) {
        return userStats[_user];
    }
    
    /**
     * @dev Get total number of bands
     * @return Total bands count
     */
    function getTotalBands() external view returns (uint256) {
        // ZMIEŃ: Zwróć _bandIdCounter zamiast _bandIds.current()
        return _bandIdCounter;
    }
    
    /**
     * @dev Get verified bands count
     * @return Verified bands count
     */
    function getVerifiedBandsCount() external view returns (uint256) {
        uint256 count = 0;
        // ZMIEŃ: Użyj _bandIdCounter zamiast _bandIds.current()
        for (uint256 i = 1; i <= _bandIdCounter; i++) {
            if (bands[i].isVerified) {
                count++;
            }
        }
        return count;
    }
    
    /**
     * @dev Add new verifier (only owner)
     * @param _verifier Address to add as verifier
     */
    function addVerifier(address _verifier) external onlyOwner {
        require(_verifier != address(0), "Invalid verifier address");
        verifiers[_verifier] = true;
        emit VerifierAdded(_verifier);
    }
    
    /**
     * @dev Remove verifier (only owner)
     * @param _verifier Address to remove from verifiers
     */
    function removeVerifier(address _verifier) external onlyOwner {
        require(_verifier != owner(), "Cannot remove owner");
        verifiers[_verifier] = false;
        emit VerifierRemoved(_verifier);
    }
    
    /**
     * @dev Internal function to update user statistics
     * @param _user User address
     */
    function _updateUserStats(address _user) internal {
        if (!userStats[_user].exists) {
            userStats[_user].joinDate = block.timestamp;
            userStats[_user].exists = true;
        }
        
        uint256[] memory userBandIds = userBands[_user];
        uint256 verified = 0;
        
        for (uint256 i = 0; i < userBandIds.length; i++) {
            if (bands[userBandIds[i]].isVerified) {
                verified++;
            }
        }
        
        userStats[_user].totalBands = userBandIds.length;
        userStats[_user].verifiedBands = verified;
    }
    
    /**
     * @dev Internal function to award reputation
     * @param _user User address
     * @param _points Points to award
     * @param _reason Reason for reputation award
     */
    function _awardReputation(address _user, uint256 _points, string memory _reason) internal {
        userStats[_user].reputation += _points;
        emit ReputationUpdated(_user, userStats[_user].reputation, _reason);
    }
    
    /**
     * @dev Get bands by genre (view function for filtering)
     * @param _genre Genre to filter by
     * @return Array of band IDs
     */
    function getBandsByGenre(string memory _genre) external view returns (uint256[] memory) {
        // ZMIEŃ: Użyj _bandIdCounter zamiast _bandIds.current()
        uint256[] memory result = new uint256[](_bandIdCounter);
        uint256 counter = 0;
        
        for (uint256 i = 1; i <= _bandIdCounter; i++) {
            if (keccak256(bytes(bands[i].genre)) == keccak256(bytes(_genre))) {
                result[counter] = i;
                counter++;
            }
        }
        
        // Resize array to actual size
        uint256[] memory resizedResult = new uint256[](counter);
        for (uint256 i = 0; i < counter; i++) {
            resizedResult[i] = result[i];
        }
        
        return resizedResult;
    }
}
