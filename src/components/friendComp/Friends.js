import classes from './Friends.module.css';
import React, { Component } from 'react';
import {useState,useEffect,useRef} from 'react';
import FriendElementCreator from './FriendElementCreator';
//modals
import AddPopupFenster from './addFriendModal/AddPopupFenster';
import NoFriendsSign from './NoFriendsSign';
import addImg from '../../images/add-user.png'
import saveFriend from '../../images/saveFriend2.png';
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


                    <ButtonGroup sx={{marginRight:'1px'}}variant="outlined" aria-label="outlined primary button group">
                        <Tooltip title="Add" placement="top" disableInteractive arrow>
                            <Button onClick={openAddFriend} ><img src={addImg} style={{height:'20px',width:'auto'}}></img></Button>
                        </Tooltip>
                        <Tooltip title="filter" placement="top" disableInteractive arrow>
                            <Button onClick={filter} ><img src={saveFriend} style={{height:'20px',width:'auto'}}></img></Button>
                        </Tooltip>
                    </ButtonGroup>

                    <input onKeyDown={search} id="searchInput" type="text" placeholder="  search name or address" className={classes.searchInput}></input>


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