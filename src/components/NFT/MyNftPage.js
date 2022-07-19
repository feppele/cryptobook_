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

function MyNftPage(){

        // Night Mode
        const nightMode = useContext(NightContext)
        const [theme,setTheme] =useState(themes.bright)
        useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    const [myAddress,setMyAddress] = useState("")
    const [address,setAddress] =useState(false)

    const history = useHistory();

    function openCreatePage(){
        history.push("/createNFT");
    }
    function openExplore(){
        history.push("/marketplace");
    }


    useEffect(() => {

        window.ethereum.request({method: 'eth_accounts'}).then(acc =>{
            setMyAddress(acc[0].toString());
            setAddress(true)
        })


    },[])


    console.log(myAddress)
    return (

        <div style={{backgroundColor:theme.color1}} className={classes.container}>

                { address && <NftCollection header={"myNFTs"} from={myAddress}/>}

        </div>
    );


}

export default MyNftPage;
