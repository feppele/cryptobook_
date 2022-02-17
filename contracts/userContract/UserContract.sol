// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract User{

    address [] private _user;

    struct Friend{  
        address friend_addr;
        string friend_name;
    }

    mapping(address => Friend[]) private _myFriends;

    constructor(){}

    function getMyFriends() public view returns ( Friend [] memory ){
        return _myFriends[msg.sender];
    }

    function getFriendsFrom(address from) public view returns (Friend [] memory){
        return _myFriends[from];
    }
  
    function updateFriends(string memory friend_name, address friend_addr) public{

        Friend memory myFriend = Friend(friend_addr,friend_name);
        _myFriends[msg.sender].push(myFriend);
    }

    function deleteFriend(address friend_addr) public{

        for(uint256 i=0; i< _myFriends[msg.sender].length; i++){
            if(_myFriends[msg.sender][i].friend_addr == friend_addr ){

                _myFriends[msg.sender][i] = _myFriends[msg.sender][_myFriends[msg.sender].length - 1];
                _myFriends[msg.sender].pop();
                break;
            }
        }
    }
    
}

