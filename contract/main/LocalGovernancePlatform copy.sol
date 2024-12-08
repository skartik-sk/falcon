// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LocalGovernancePlatform1 {
    // User Structure
    struct User {
        string name;
        uint64 pinCode;
        string email;
        address walletAddress;
        string physicalAddress;
        bool isVerified;
    }

    // Post Structure
    struct Post {
        uint256 id;
        address creator;
        string title;
        string description;
        string imageUrl;
        address[] likedBy;
        address[] dislikedBy;
        uint256[] suggestionIds;
        PostStatus status;
        uint256 createdAt;
    }

    // Suggestion Structure
    struct Suggestion {
        uint256 id;
        address creator;
        uint256 postId;
        string description;
        address[] likedBy;
        address[] dislikedBy;
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

    // Mappings
    mapping(address => User) public users;
    mapping(uint256 => Post) public posts;
    mapping(uint256 => Suggestion) public suggestions;

    // Counters
    uint256 public postCounter;
    uint256 public suggestionCounter;

    // Events
    event UserRegistered(address indexed userAddress, string name);
    event PostCreated(uint256 indexed postId, address indexed creator);
    event SuggestionAdded(uint256 indexed suggestionId, uint256 indexed postId, address indexed creator);
    event PostLiked(uint256 indexed postId, address indexed liker);
    event PostDisliked(uint256 indexed postId, address indexed disliker);
    event SuggestionLiked(uint256 indexed suggestionId, address indexed liker);
    event SuggestionDisliked(uint256 indexed suggestionId, address indexed disliker);

    // Modifiers
    modifier onlyRegisteredUser() {
        require(bytes(users[msg.sender].name).length != 0, "User not registered");

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

    // User Registration
    function registerUser(
        string memory _name,
        uint64  _pinCode,
        string memory _email,
        string memory _physicalAddress
    ) public {
        require(bytes(users[msg.sender].name).length == 0, "User already registered");

        users[msg.sender] = User({
            name: _name,
            pinCode: _pinCode,
            email: _email,
            walletAddress: msg.sender,
            physicalAddress: _physicalAddress,
            isVerified: false
        });

        emit UserRegistered(msg.sender, _name);
    }
    function updateUserProfile(
    string memory _name,
    uint64  _pinCode,
    string memory _email,
    string memory _physicalAddress
) public onlyRegisteredUser {
    require(
        bytes(_name).length > 0 && 
        _pinCode > 0 && 
        bytes(_email).length > 0 && 
        bytes(_physicalAddress).length > 0, 
        "All fields must be non-empty"
    );

    User storage user = users[msg.sender];
    user.name = _name;
    user.pinCode = _pinCode;
    user.email = _email;
    user.physicalAddress = _physicalAddress;
}

    // Create a Post
    function createPost(
        string memory _title,
        string memory _description,
        string memory _imageUrl
    ) public onlyRegisteredUser returns (uint256) {
        postCounter++;

        Post storage newPost = posts[postCounter];
        newPost.id = postCounter;
        newPost.creator = msg.sender;
        newPost.title = _title;
        newPost.description = _description;
        newPost.imageUrl = _imageUrl;
        newPost.status = PostStatus.Pending;
        newPost.createdAt = block.timestamp;

        emit PostCreated(postCounter, msg.sender);
        return postCounter;
    }

    // Like a Post
    function likePost(uint256 _postId) public onlyRegisteredUser postExists(_postId) {
        Post storage post = posts[_postId];
        
        // Remove from disliked if previously disliked
        _removeFromDislikedBy(post.dislikedBy, msg.sender);
        
        // Add to likedBy if not already liked
        if (!_isAddressInArray(post.likedBy, msg.sender)) {
            post.likedBy.push(msg.sender);
            emit PostLiked(_postId, msg.sender);
        }
    }

    // Dislike a Post
    function dislikePost(uint256 _postId) public onlyRegisteredUser postExists(_postId) {
        Post storage post = posts[_postId];
        
        // Remove from likedBy if previously liked
        _removeFromLikedBy(post.likedBy, msg.sender);
        
        // Add to dislikedBy if not already disliked
        if (!_isAddressInArray(post.dislikedBy, msg.sender)) {
            post.dislikedBy.push(msg.sender);
            emit PostDisliked(_postId, msg.sender);
        }
    }

    // Add Suggestion to a Post
    function addSuggestion(
        uint256 _postId,
        string memory _description
    ) public onlyRegisteredUser postExists(_postId) returns (uint256) {
        suggestionCounter++;

        Suggestion storage newSuggestion = suggestions[suggestionCounter];
        newSuggestion.id = suggestionCounter;
        newSuggestion.creator = msg.sender;
        newSuggestion.postId = _postId;
        newSuggestion.description = _description;
        newSuggestion.status = SuggestionStatus.Pending;
        newSuggestion.createdAt = block.timestamp;

        // Add suggestion ID to post's suggestions
        posts[_postId].suggestionIds.push(suggestionCounter);

        emit SuggestionAdded(suggestionCounter, _postId, msg.sender);
        return suggestionCounter;
    }

    // Like a Suggestion
    function likeSuggestion(uint256 _suggestionId) public onlyRegisteredUser suggestionExists(_suggestionId) {
        Suggestion storage suggestion = suggestions[_suggestionId];
        
        // Remove from disliked if previously disliked
        _removeFromDislikedBy(suggestion.dislikedBy, msg.sender);
        
        // Add to likedBy if not already liked
        if (!_isAddressInArray(suggestion.likedBy, msg.sender)) {
            suggestion.likedBy.push(msg.sender);
            emit SuggestionLiked(_suggestionId, msg.sender);
        }
    }

    // Dislike a Suggestion
    function dislikeSuggestion(uint256 _suggestionId) public onlyRegisteredUser suggestionExists(_suggestionId) {
        Suggestion storage suggestion = suggestions[_suggestionId];
        
        // Remove from likedBy if previously liked
        _removeFromLikedBy(suggestion.likedBy, msg.sender);
        
        // Add to dislikedBy if not already disliked
        if (!_isAddressInArray(suggestion.dislikedBy, msg.sender)) {
            suggestion.dislikedBy.push(msg.sender);
            emit SuggestionDisliked(_suggestionId, msg.sender);
        }
    }

    // Retrieve Post Details with Likes and Suggestions
    function getPostDetails(uint256 _postId) public view postExists(_postId) returns (
        address creator,
        string memory title,
        string memory description,
        string memory imageUrl,
        uint256 likes,
        uint256 dislikes,
        uint256[] memory suggestionIds,
        PostStatus status
    ) {
        Post storage post = posts[_postId];
        return (
            post.creator,
            post.title,
            post.description,
            post.imageUrl,
            post.likedBy.length,
            post.dislikedBy.length,
            post.suggestionIds,
            post.status
        );
    }

    // Retrieve Suggestion Details with Likes
    function getSuggestionDetails(uint256 _suggestionId) public view returns (
        address creator,
        uint256 postId,
        string memory description,
        uint256 likes,
        uint256 dislikes,
        SuggestionStatus status
    ) {
        Suggestion storage suggestion = suggestions[_suggestionId];
        return (
            suggestion.creator,
            suggestion.postId,
            suggestion.description,
            suggestion.likedBy.length,
            suggestion.dislikedBy.length,
            suggestion.status
        );
    }
 function getAllPosts() public view returns (Post[] memory) {
        Post[] memory allPosts = new Post[](postCounter);
        for (uint256 i = 1; i <= postCounter; i++) {
            allPosts[i - 1] = posts[i];
        }
        return allPosts;
    }
    // Internal utility functions for like/dislike management
    function _isAddressInArray(address[] storage _array, address _address) internal view returns (bool) {
        for (uint256 i = 0; i < _array.length; i++) {
            if (_array[i] == _address) {
                return true;
            }
        }
        return false;
    }

    function _removeFromLikedBy(address[] storage _likedBy, address _address) internal {
        for (uint256 i = 0; i < _likedBy.length; i++) {
            if (_likedBy[i] == _address) {
                _likedBy[i] = _likedBy[_likedBy.length - 1];
                _likedBy.pop();
                break;
            }
        }
    }

    function _removeFromDislikedBy(address[] storage _dislikedBy, address _address) internal {
        for (uint256 i = 0; i < _dislikedBy.length; i++) {
            if (_dislikedBy[i] == _address) {
                _dislikedBy[i] = _dislikedBy[_dislikedBy.length - 1];
                _dislikedBy.pop();
                break;
            }
        }
    }

    // Status Update Functions (with potential access control)
    function updatePostStatus(uint256 _postId, PostStatus _newStatus) public postExists(_postId) {
        posts[_postId].status = _newStatus;
    }

    function updateSuggestionStatus(uint256 _suggestionId, SuggestionStatus _newStatus) public suggestionExists(_suggestionId) {
        suggestions[_suggestionId].status = _newStatus;
    }
}