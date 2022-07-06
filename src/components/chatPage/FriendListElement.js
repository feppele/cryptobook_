import classes from './FriendListElement.module.css';
import React, { Component,useContext } from 'react';
import {useState,useEffect,useRef,useLayoutEffect} from 'react';
import {getProfilePicURL} from '../../node/images'

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
            console.log(props)
        },[])

        

    return(
        <div style={{borderBottom:theme.border}} className={classes.container}>

            <Avatar sx={{height:'33px',width:'33px',marginLeft:'10px',marginRight:'10px'}} src={pic} />


            <div className={classes.wrapper1}>

                <div style={{fontWeight:'bold',fontSize:'11px',color:theme.font}}>{props.friend.friend_name}</div>
                <div style={{fontSize:'11px',color:theme.font}}>{"Message"}</div>

            </div>


            <div style={{color:theme.font}} className={classes.date}>
                {"27.01.2022"}
            </div>




        </div>

    );
}

export default FriendListElement;