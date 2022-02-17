import classes from './Friends.module.css';
import React, { Component } from 'react';
import {useState,useEffect} from 'react';

import FriendElement from './FriendElement';
import BasicButton from '../standart/BasicButton';
import BasicButton2 from '../standart/BasicButton2';
import FriendElementCreator from './FriendElementCreator';

import {loadFriends,loadFriendsEasy,shortAddr,onLoad} from '../../web3/LoadingFunctions';

//modals
import AddFriendModal from './addFriendModal/AddFriendModal';
import AddFriendBackdrop from './addFriendModal/AddFriendBackdrop';
import NoFriendsSign from './NoFriendsSign';
import addImg from '../../images/add-user.png'
import saveFriend from '../../images/saveFriend2.png';
import searchPeople from '../../images/searchPeople.png';


import Button3 from '../standart/Button3';
import Button7Breit from '../standart/Button7Breit';


 function Friends(){

    useEffect(() => {onLoad()},[]);

    const [showSad, setShowSad] = useState(false);
    const [addFriendIsOpen, setAddFriendIsOpen ] = useState(false);
    const [friends,setFriends] = useState([]);
    const [searchResult,setSearchResult] = useState([]);
    function openAddFriend(){
        setAddFriendIsOpen(true);
    }
    function closeAddFriend(){
        setAddFriendIsOpen(false);
    }


    useEffect(() => {loadFriendsEasy().then(friends=>{
            console.log(friends);
            if( !(friends.length > 0 )){
                console.log("friend === null");
                setShowSad(true);
            }
            setFriends(friends);
            setSearchResult(friends);
        })

    },[]);


    function filter(){

    }
    function search(){

        const searchName = document.getElementById("searchInput").value;
        var results =[];

        for(var i=0;i<friends.length;i++){

            if((friends[i].friend_name.search(searchName) !== -1) || (friends[i].friend_addr.search(searchName) !== -1) ){
                console.log(friends[i].friend_name);
                results.push(friends[i]);
            }
        }
        setSearchResult(results);
    }


    return (
        <div className={classes.container}>

            <div className={classes.stripe}></div>

            {/* LEFT SIDE */}
            <div className={classes.menu}>



                <div className={classes.haederWrapper}>
                    <h className={classes.header}> friends </h>
                </div>

                <div className={classes.box}>

                    {  addFriendIsOpen && <AddFriendModal />}
                    {  addFriendIsOpen && <AddFriendBackdrop  onBackDropClicked={closeAddFriend} />  }


                    <div className={classes.buttonWrapper}>
                        <Button3 onButtonClicked={openAddFriend} img={addImg} popupText={"new friend"}/>
                        <Button3 onButtonClicked={filter} img={saveFriend} popupText={"filter"}/>
                    </div>

                    <div className={classes.searchWrapper}>
                        <input id="searchInput" type="text" placeholder="name or address" className={classes.searchInput}></input>
                        <Button7Breit onButtonClicked={search} img={searchPeople} popupText={"search"}/>
                    </div>

                </div>




            </div>{/* LEFT SIDE */}

            {/* LRIGHT SIDE */}
            <div className={classes.friendsListSite}>

                {showSad && <NoFriendsSign text= "no friends yet"/>}

                <div id="friendList" className={classes.friendList}>
                    <FriendElementCreator friends ={searchResult}/>
                </div>


            </div>{/* LRIGHT SIDE */}


    </div>

    );


}

export default Friends;