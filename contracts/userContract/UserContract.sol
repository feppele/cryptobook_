// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Person{

    address [] public _user;


    struct Friend{  
        address friend_addr;
        string friend_name;
    }

    
    mapping(address => Friend[]) public myFriends;


    function getMyFriends() public view returns ( Friend [] memory ){
        return myFriends[msg.sender];
    }

    function getFriendsFrom(address from) public view returns (Friend [] memory){
        return myFriends[from];
    }
  



    function updateFriends(string memory friend_name, address friend_addr) public{


        Friend memory myFriend = Friend(friend_addr,friend_name);
        
        myFriends[msg.sender].push(myFriend);


    }
    
    constructor(){

    }










}

