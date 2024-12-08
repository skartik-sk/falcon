// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LocalGovernancePlatform is Ownable, ReentrancyGuard {
    // Structs with Optimized Storage
    struct User {
        address walletAddress;
        uint64 pinCode;
        bool isVerified;
        string name;
        string email;
        string physicalAddress;
    }

    struct Post {
        uint256 id;
        address creator;
        string title;
        string description;
        string imageUrl;
        PostStatus status;
        uint256 createdAt;
    }

    struct Suggestion {
        uint256 id;
        address creator;
        uint256 postId;
        string description;
        SuggestionStatus status;
        uint256 createdAt;
    }

    // Enums
    enum PostStatus {
        Pending,
        UnderReview,
        Resolved,
        Rejected
    }

    enum SuggestionStatus {
        Pending,
        Accepted,
        Rejected,
        Implemented
    }

    // Mappings with Efficient Design
    mapping(address => User) public users;
    mapping(uint256 => Post) public posts;
    mapping(uint256 => Suggestion) public suggestions;
    
    // Like/Dislike Tracking
    mapping(uint256 => mapping(address => bool)) public postLikes;
    mapping(uint256 => mapping(address => bool)) public postDislikes;
    mapping(uint256 => mapping(address => bool)) public suggestionLikes;
    mapping(uint256 => mapping(address => bool)) public suggestionDislikes;
    
    // Additional Control Mappings
    mapping(address => bool) public admins;
    mapping(uint256 => mapping(address => bool)) public postSuggestionSubmitted;
    mapping(address => uint256) public lastPostTimestamp;

    // Counters
    uint256 public postCounter;
    uint256 public suggestionCounter;

    // Constants
    uint256 private constant POST_COOLDOWN = 1 hours;
    uint256 private constant MAX_NAME_LENGTH = 50;
    uint256 private constant MAX_DESCRIPTION_LENGTH = 500;

    // Events
    event UserRegistered(address indexed userAddress, string name);
    event PostCreated(uint256 indexed postId, address indexed creator);
    event SuggestionAdded(uint256 indexed suggestionId, uint256 indexed postId, address indexed creator);
    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);

    // Modifiers
    modifier onlyRegisteredUser() {
        require(bytes(users[msg.sender].name).length != 0, "User not registered");
        _;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    modifier postExists(uint256 _postId) {
        require(_postId > 0 && _postId <= postCounter, "Post does not exist");
        _;
    }

    modifier suggestionExists(uint256 _suggestionId) {
        require(_suggestionId > 0 && _suggestionId <= suggestionCounter, "Suggestion does not exist");
        _;
    }

    constructor() Ownable(msg.sender) {
        // No additional initialization needed
    }

    // User Management
    function registerUser(
        string memory _name,
        string memory _pinCode,
        string memory _email,
        string memory _physicalAddress
    ) public {
        require(bytes(users[msg.sender].name).length == 0, "User already registered");
        require(bytes(_name).length > 0 && bytes(_name).length <= MAX_NAME_LENGTH, "Invalid name");
        require(_validateEmail(_email), "Invalid email");

        users[msg.sender] = User({
            walletAddress: msg.sender,
            pinCode: _stringToUint64(_pinCode),
            isVerified: false,
            name: _name,
            email: _email,
            physicalAddress: _physicalAddress
        });

        emit UserRegistered(msg.sender, _name);
    }

    function updateUserProfile(
        string memory _name,
        string memory _pinCode,
        string memory _email,
        string memory _physicalAddress
    ) public onlyRegisteredUser {
        require(
            bytes(_name).length > 0 && 
            bytes(_name).length <= MAX_NAME_LENGTH &&
            bytes(_email).length > 0 && 
            _validateEmail(_email),
            "Invalid input"
        );

        User storage user = users[msg.sender];
        user.name = _name;
        user.pinCode = _stringToUint64(_pinCode);
        user.email = _email;
        user.physicalAddress = _physicalAddress;
    }

    // Post Creation with Rate Limiting
    function createPost(
        string memory _title,
        string memory _description,
        string memory _imageUrl
    ) public onlyRegisteredUser nonReentrant returns (uint256) {
        require(
            block.timestamp >= lastPostTimestamp[msg.sender] + POST_COOLDOWN, 
            "Post cooldown active"
        );
        require(
            bytes(_title).length > 0 && 
            bytes(_description).length > 0 && 
            bytes(_description).length <= MAX_DESCRIPTION_LENGTH,
            "Invalid post content"
        );

        postCounter++;
        lastPostTimestamp[msg.sender] = block.timestamp;

        posts[postCounter] = Post({
            id: postCounter,
            creator: msg.sender,
            title: _title,
            description: _description,
            imageUrl: _imageUrl,
            status: PostStatus.Pending,
            createdAt: block.timestamp
        });

        emit PostCreated(postCounter, msg.sender);
        return postCounter;
    }

    // Efficient Like/Dislike Mechanisms
    function likePost(uint256 _postId) public onlyRegisteredUser postExists(_postId) {
        require(!postLikes[_postId][msg.sender], "Already liked");
        
        postLikes[_postId][msg.sender] = true;
        postDislikes[_postId][msg.sender] = false;
    }

    function dislikePost(uint256 _postId) public onlyRegisteredUser postExists(_postId) {
        require(!postDislikes[_postId][msg.sender], "Already disliked");
        
        postDislikes[_postId][msg.sender] = true;
        postLikes[_postId][msg.sender] = false;
    }

    // Suggestion Management with Duplicate Prevention
    function addSuggestion(
        uint256 _postId,
        string memory _description
    ) public onlyRegisteredUser postExists(_postId) returns (uint256) {
        require(
            !postSuggestionSubmitted[_postId][msg.sender], 
            "Already submitted suggestion"
        );
        require(
            bytes(_description).length > 0 && 
            bytes(_description).length <= MAX_DESCRIPTION_LENGTH,
            "Invalid suggestion description"
        );

        suggestionCounter++;
        postSuggestionSubmitted[_postId][msg.sender] = true;

        suggestions[suggestionCounter] = Suggestion({
            id: suggestionCounter,
            creator: msg.sender,
            postId: _postId,
            description: _description,
            status: SuggestionStatus.Pending,
            createdAt: block.timestamp
        });

        emit SuggestionAdded(suggestionCounter, _postId, msg.sender);
        return suggestionCounter;
    }

    // Admin Functions
    function addAdmin(address _admin) public onlyOwner {
        require(_admin != address(0), "Invalid admin address");
        admins[_admin] = true;
        emit AdminAdded(_admin);
    }

    function removeAdmin(address _admin) public onlyOwner {
        require(admins[_admin], "Not an admin");
        admins[_admin] = false;
        emit AdminRemoved(_admin);
    }

    // Status Update with Enhanced Control
    function updatePostStatus(
        uint256 _postId, 
        PostStatus _newStatus
    ) public onlyAdmin postExists(_postId) {
        require(_newStatus != posts[_postId].status, "Same status");
        posts[_postId].status = _newStatus;
    }

    // Utility and View Functions
    function getPaginatedPosts(
        uint256 _page, 
        uint256 _pageSize
    ) public view returns (Post[] memory) {
        uint256 start = (_page - 1) * _pageSize;
        uint256 end = start + _pageSize;
        
        require(start < postCounter, "Page out of bounds");
        
        uint256 resultSize = end > postCounter ? postCounter - start : _pageSize;
        Post[] memory paginatedPosts = new Post[](resultSize);
        
        for (uint256 i = 0; i < resultSize; i++) {
            paginatedPosts[i] = posts[start + i + 1];
        }
        
        return paginatedPosts;
    }

    // Internal Utility Functions
    function _validateEmail(string memory _email) internal pure returns (bool) {
        bytes memory byteEmail = bytes(_email);
        return byteEmail.length > 3 && 
               bytes(_email)[0] != '@' && 
               bytes(_email)[byteEmail.length - 1] != '@';
    }

    function _stringToUint64(string memory _value) internal pure returns (uint64) {
        return uint64(stringToUint(_value));
    }

    function stringToUint(string memory _value) internal pure returns (uint256) {
        bytes memory bytesValue = bytes(_value);
        uint256 result = 0;
        
        for (uint256 i = 0; i < bytesValue.length; i++) {
            uint256 digit = uint256(uint8(bytesValue[i]));
            
            if (digit >= 48 && digit <= 57) {
                result = result * 10 + (digit - 48);
            } else {
                revert("Invalid number string");
            }
        }
        
        return result;
    }
}