import classes from './Friends.module.css';
import React, { Component } from 'react';
import {useState} from 'react';

import FriendElement from './FriendElement';
import BasicButton from '../standart/BasicButton';
import BasicButton2 from '../standart/BasicButton2';
import FriendElementCreator from './FriendElementCreator';

import {loadFriends,shortAddr,onLoad} from '../../web3/LoadingFunctions';

//modals
import AddFriendModal from './addFriendModal/AddFriendModal';
import AddFriendBackdrop from './addFriendModal/AddFriendBackdrop';
import NoFriendsSign from './NoFriendsSign';


 function Friends(){

    onLoad();

    const [showSad, setShowSad] = useState(false);
    const [ addFriendIsOpen, setAddFriendIsOpen ] = useState(false);
    function openAddFriend(){

        setAddFriendIsOpen(true);
    }
    function closeAddFriend(){

        setAddFriendIsOpen(false);
    }

    // load --> render NoFriends
    window.addEventListener('load',()=>{
        const friends = localStorage.getItem("friends");
        if(friends === null){
            console.log("friend === null");
            setShowSad(true);
        }
    });


    return (
        <div className={classes.container}>

                {  addFriendIsOpen && <AddFriendModal />}
                {  addFriendIsOpen && <AddFriendBackdrop  onBackDropClicked={closeAddFriend} />  }
                {  showSad && <NoFriendsSign text= "no friends yet"/>}

                <div className={classes.stripe}></div>

                <div className={classes.buttonHaederWrapper}>
                    <h className={classes.header}> friends </h>
                    <div className={classes.buttonWrapper}>
                        <button onClick={openAddFriend} className={classes.addButton}> Add </button>
                        <button onClick={openAddFriend} className={classes.deleteButton}> Delete </button>
                    </div>

                </div>

                <div id="friendList" className={classes.friendList}>

                    <FriendElementCreator/>

                </div>
    </div>

    );


}

export default Friends;