import classes from './FriendListElement.module.css';
import React, { Component,useContext } from 'react';
import {useState,useEffect,useRef,useLayoutEffect} from 'react';
import {getProfilePicURL} from '../../node/images'
import {getLatestMessage} from '../../node/cryptoMessages'

//material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

// props: {friend_name:String, friend_addr:String, blockchain:Boolean}
 function FriendListElement(props){

        // Night Mode
        const nightMode = useContext(NightContext)
        const [theme,setTheme] =useState(themes.bright)
        const [pic,setPic] =useState("")
        const [latestMessage,setLatestMessage] =useState({message:""})

        useEffect(()=>{
            if(nightMode){
                setTheme(themes.dark)
            }else{
                setTheme(themes.bright)
            }
        },[nightMode])

        async function loadPic(){
           const res=  await getProfilePicURL(props.friend.friend_addr)
           if(res.length>0){
            setPic(res)
           }
        }

        useLayoutEffect(() => {
            loadPic()
        },[])

        async function loadLatestMessage(){
            setLatestMessage(await getLatestMessage(props.friend.friend_addr) )
        }

        useLayoutEffect(() => {
            loadLatestMessage()
        },[])

        //console.log(latestMessage.message)

        
    return(
        <div onClick={()=>props.onClick(pic)} style={{borderBottom:theme.border}} className={classes.container}>

            <Avatar sx={{height:'33px',width:'33px',marginLeft:'10px',marginRight:'10px'}} src={pic} />


            <div className={classes.wrapper1}>

                <div style={{fontWeight:'bold',fontSize:'11px',color:theme.font}}>{props.friend.friend_name}</div>
                <div style={{fontSize:'11px',color:theme.font}}>{latestMessage.message} </div>

            </div>


            <div style={{color:theme.font}} className={classes.date}>
                {latestMessage.date}
            </div>




        </div>

    );
}

export default FriendListElement;