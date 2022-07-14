import classes from './Message.module.css';
import React, { Component,useContext } from 'react';
import {useState,useEffect,useRef,useLayoutEffect} from 'react';

//material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

// props: date, message, person

 function Message(props){

        // Night Mode
        const nightMode = useContext(NightContext)
        const [theme,setTheme] =useState(themes.bright)
        useEffect(()=>{
            if(nightMode){
                setTheme(themes.dark)
            }else{
                setTheme(themes.bright)
            }
        },[nightMode])



        var alignStyle="start"
        var background='rgba(0, 0, 0, 0.051)'
        if(props.person==="me"){
            alignStyle = "end"
            var background='rgba(0, 110, 253, 0.151)'
        }


    return(
        <div className={classes.container} style={{border:theme.border,alignSelf:alignStyle,backgroundColor:background}}>

            <div className={classes.top} style={{borderBottom:theme.border,color:theme.font}}>

                {props.person==="me" ? "me": props.person} {"on " +props.date}

            </div>

            <div className={classes.bottom} style={{color:theme.font}}>

                <div>  {props.message}  </div>

            </div>


        </div>

    );
}

export default Message;