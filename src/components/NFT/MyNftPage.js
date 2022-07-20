import classes from './MyNftPage.module.css';
import NftCollection from './NftCollection';
import React, { Component,useContext } from 'react';
import {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import explorePic from '../../images/adventurer.png';
import createPic from '../../images/paint.png'

//material UI 
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

//User Context
import {UserContext} from '../../UserProvider'


function MyNftPage(){
        const userData = useContext(UserContext)
        // Night Mode
        const nightMode = useContext(NightContext)
        const [theme,setTheme] =useState(themes.bright)
        useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    //const [myAddress,setMyAddress] = useState(userData.address)

    const history = useHistory();

    function openCreatePage(){
        history.push("/createNFT");
    }
    function openExplore(){
        history.push("/marketplace");
    }


    return (

        <div style={{backgroundColor:theme.color1}} className={classes.container}>

            <NftCollection header={"myNFTs"} from={userData.address}/>

        </div>
    );


}

export default MyNftPage;
