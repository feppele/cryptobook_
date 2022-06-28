import classes from './Friends.module.css';
import React, { Component } from 'react';
import {useState,useEffect,useRef} from 'react';
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
import {getAllFriendsPromise} from  '../../web3/GetAllFriends';

//material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
 function Friends(){

    const searchIn= useRef()

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
        getAllFriendsPromise().then(res => { // return [{friend_name:String, friend_addr:String, blockchain:Boolean} ]
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



    function search(e){
        if(e.key !== "Enter"){
            return
        }

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

                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        <Tooltip title="Add" placement="top" disableInteractive arrow>
                            <Button onClick={openAddFriend} ><img src={addImg} style={{height:'20px',width:'auto'}}></img></Button>
                        </Tooltip>
                        <Tooltip title="filter" placement="top" disableInteractive arrow>
                            <Button onClick={filter} ><img src={saveFriend} style={{height:'20px',width:'auto'}}></img></Button>
                        </Tooltip>
                    </ButtonGroup>

                    </div>

                    <div className={classes.searchWrapper}>
                        <input onKeyDown={search} id="searchInput" type="text" placeholder="search name or address" className={classes.searchInput}></input>
                    </div>

                </div>

            </div>{/* LEFT SIDE */}

            {/* RIGHT SIDE */}
            <div className={classes.friendsListSite}>

                {showSad && <NoFriendsSign text= "no friends yet"/>}

                <div id="friendList" className={classes.friendList}>
                    <FriendElementCreator friends ={searchResult} />
                </div>

            </div>{/* RIGHT SIDE */}
        </div>
    );
}

export default Friends;