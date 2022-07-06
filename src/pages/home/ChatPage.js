import classes from './ChatPage.module.css';
import React, {useState,useEffect,useContext} from 'react';
import {useParams} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {getAllFriendsPromise} from '../../web3/GetAllFriends'
import FriendListElement from '../../components/chatPage/FriendListElement'

import PopupFenser from '../../components/PopupFenster/PopupFenster'



//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

function ChatPage(){

    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    const [friends,setFriends] = useState([])
    useEffect(()=>{
        if(nightMode){
            setTheme(themes.dark)
        }else{
            setTheme(themes.bright)
        }
    },[nightMode])


    async function loadFriends(){
        setFriends( await getAllFriendsPromise() )// return [{friend_name:String, friend_addr:String, blockchain:Boolean} ]

    }

    useEffect(() => {
        loadFriends()
    })

    
    return (

        <div style={{backgroundColor:theme.color1}} className={classes.container}>

            <div style={{backgroundColor:theme.color1,border:theme.border}}  className={classes.container2}>

                {/*Menu */}
                <div style={{borderRight:theme.border}}className={classes.menu}>

                    {friends.map(friend =><FriendListElement friend={friend}/>)}

                </div>

                {/*ChatFenster */}
                <div className={classes.chatWindow}>


                </div>

            </div>

        </div>

    );


}

export default ChatPage;