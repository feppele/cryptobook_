import classes from './Friends.module.css';
import React, { Component } from 'react';
import {useState,useEffect} from 'react';
import FriendElement from './FriendElement';
import BasicButton from '../standart/BasicButton';
import BasicButton2 from '../standart/BasicButton2';
import FriendElementCreator from './FriendElementCreator';
import {loadFriends,loadFriendsEasy,shortAddr,onLoad} from '../../web3/LoadingFunctions';
//modals
import AddPopupFenster from './addFriendModal/AddPopupFenster';
import AddFriendModal from './addFriendModal/AddFriendModal';
import AddFriendBackdrop from './addFriendModal/AddFriendBackdrop';
import NoFriendsSign from './NoFriendsSign';
import addImg from '../../images/add-user.png'
import saveFriend from '../../images/saveFriend2.png';
import searchPeople from '../../images/searchPeople.png';
import {getOptions} from '../../node/databank';
import Button3 from '../standart/Button3';
import Button7Breit from '../standart/Button7Breit';
import {getAllFriendsPromise} from  '../../web3/GetAllFriends';

 function Friends(){

    //useEffect(() => {onLoad()},[]);

    const [showSad, setShowSad] = useState(false);
    const [addFriendIsOpen, setAddFriendIsOpen ] = useState(false);
    const [searchResult,setSearchResult] = useState([]);
    const [allFriends,setAllFriends] = useState([]);

    function openAddFriend(){
        setAddFriendIsOpen(true);
    }
    function closeAddFriend(){
        setAddFriendIsOpen(false);
    }


    // Load Friends Stuff
    useEffect(() => {
        getAllFriendsPromise().then(res => {
            setSearchResult(res);
            setAllFriends(res);
            if(res.length <1 ){
                setShowSad(true);
            }
        })
    },[])


    // Search stuff
    function filter(){
        var results =[];
        for(var i=0;i<allFriends.length;i++){

            if(allFriends[i].blockchain === true ){
                results.push(allFriends[i]);
            }
        }
        setSearchResult(results);
    }

    function search(){
        const searchName = document.getElementById("searchInput").value;
        var results =[];
        for(var i=0;i<allFriends.length;i++){
            if((allFriends[i].friend_name.search(searchName) !== -1) || (allFriends[i].friend_addr.search(searchName) !== -1) ){
                results.push(allFriends[i]);
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

                    {  addFriendIsOpen && <AddPopupFenster onCloseClicked={closeAddFriend}/>}
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
                    <FriendElementCreator friends ={searchResult} />
                </div>

            </div>{/* LRIGHT SIDE */}
        </div>
    );
}

export default Friends;