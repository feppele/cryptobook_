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




 function Friends(){

    useEffect(() => {onLoad()},[]);

    const [showSad, setShowSad] = useState(false);
    const [addFriendIsOpen, setAddFriendIsOpen ] = useState(false);
    const [friends,setFriends] = useState([]);
    const [searchResult,setSearchResult] = useState([]);
    const [folloFriends,setFollowFriends]= useState([]);

    function openAddFriend(){
        setAddFriendIsOpen(true);
    }
    function closeAddFriend(){
        setAddFriendIsOpen(false);
    }


    // Load Friends Stuff _______________________________________


    // Load Blockchain friends
    useEffect(() => {loadFriendsEasy().then(friendsLoad=>{
            console.log(friendsLoad);
            if( !(friendsLoad.length > 0 )){
                console.log("friend === null");
                setShowSad(true);
            }
            var newFormat = [];
            // Set a new Dataformat with blockchain= true :  Array- Item:  {friend_name   ,   friend_addr  ,    blockchain:true    }
            for(var j=0;j<friendsLoad.length; j++){
                newFormat.push( {friend_name: friendsLoad[j].friend_name, friend_addr: friendsLoad[j].friend_addr, blockchain:true} );
            }
            setFriends(newFormat);
        })
    },[]);

        // Load Follow Friends
        function WHOdoIFollow(){
            window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
                fetch("/databank",getOptions("WHOdoIFollow",{me: currentUsers[0].toLowerCase()}))
                .then(res => {return res.json()}).then(res=>{
                    var followFriends= res[0];
                    var newFormat =[];
                    for(var i=0;i<followFriends.length; i++){
                        var username;
                        if(followFriends[i].name === null){
                            username="unnamed";
                        }else{
                            username=followFriends[i].name;
                        }
                        newFormat.push( {friend_name: username,friend_addr: followFriends[i].person ,blockchain : false} );
                    }
                    setFollowFriends(newFormat);
                })
            })
        }
        useEffect(() => {WHOdoIFollow()},[]);


        //Combine follow and blockchain an  update searchResult
        useEffect(() => {
            if(folloFriends.length >0 &&  friends.length >0 ){
                setSearchResult([].concat(friends,folloFriends));
            }else if( !folloFriends.length >0){
                setSearchResult(friends);
            }else if(!friends.length >0){
                setSearchResult(folloFriends);
            }

        },[folloFriends,friends])



        // Load Friends Stuff ______________^^^^^^^^^^^^^^^^^^^^^^^^^


        // SEARCHING STUFF ____________________________________________
        function filter(){

            var bouth = [].concat(friends,folloFriends);
            var results =[];
            for(var i=0;i<bouth.length;i++){

               if(bouth[i].blockchain === true ){
                    results.push(bouth[i]);
                }
            }
            setSearchResult(results);


        }
        function search(){
            const searchName = document.getElementById("searchInput").value;
            var bouth = [].concat(friends,folloFriends)
            var results =[];
            for(var i=0;i<bouth.length;i++){

               if((bouth[i].friend_name.search(searchName) !== -1) || (bouth[i].friend_addr.search(searchName) !== -1) ){
                    results.push(bouth[i]);
                }
            }
            setSearchResult(results);
        }
        // SEARCHING STUFF ____________________________________________^^








    return (
        <div className={classes.container}>



            <div className={classes.stripe}></div>

            {/* LEFT SIDE */}
            <div className={classes.menu}>



                <div className={classes.haederWrapper}>
                    <h className={classes.header}> friends </h>
                </div>

                <div className={classes.box}>

                    {  addFriendIsOpen && <AddPopupFenster />}
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