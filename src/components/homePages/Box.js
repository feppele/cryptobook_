import classes from './Box.module.css';
import { useHistory } from "react-router-dom";
import{useState,useEffect,useContext} from 'react';
import NFTFormatEasyOnePage from '../NFT/NFTFormatEasyOnePage';

//material ui
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'


function Box(props){

    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])


    function scrollDown(){
        window.scrollTo({top:500,behavior: 'smooth'})

    }


    return (

        <div style={{backgroundColor:theme.barkBlue}} className={classes.box}>



            { !props.dot && <div className={classes.line}>
            </div>}

            { props.dot &&<div onClick={scrollDown} className={classes.dot}>
            </div>}

            { props.bottomdot &&<div onClick={scrollDown} className={classes.bottomdot}>
            </div>}

            <div className={classes.header}>
                <h1>{props.header}</h1>
            </div>

            <div className={classes.body}>
            {props.body}

            </div>

            <div className={classes.NFTWrapper}>
                {props.img}
            </div>

            <div className={classes.buttonWrapper}>
               { props.buttons}
            </div>


        </div>
    );
}

export default Box;