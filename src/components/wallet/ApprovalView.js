import * as React from 'react';

import {useEffect,useRef,useState,useContext} from 'react'
import classes from './ApprovalView.module.css'

import {getProfilePicURL} from '../../node/images'
import {shortAddr} from '../../web3/LoadingFunctions'
import etherSign from '../../images/ethereum.png'

//material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';


//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

//User Context
import {UserContext} from '../../UserProvider'

import {sendEtherInfura} from '../../web3/SendEtherInfura'


import {_web3} from '../../web3/Web3'
var web3 = _web3.mcbWallet
var userdata = JSON.parse(sessionStorage.getItem("userdata"))
console.log(userdata)
if(userdata !== null){
    userdata.metamask === true ? web3 = _web3.metamask : web3 = _web3.mcbWallet
}


function ApprovalView(props) {
    
    userdata = JSON.parse(sessionStorage.getItem("userdata"))
    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])


    async function approve(){
        props.approveClicked()
    }

    async function cancel(){
        props.cancelClicked()
    }


  return (
        <div className={classes.integration}>
            {/*totalAmount*/}
            <div style={{backgroundColor:theme.color2,border:theme.border}} className={classes.box}>

                <div style={{borderBottom: theme.border,fontSize:'20px'}} className={classes.action}>
                    {props.text}
                </div>

                <div style={{borderBottom: theme.border}} className={classes.details}>

                </div>

                <div className={classes.approve}>

                    <Button onClick={cancel} sx={{width:'90px'}} variant="outlined"> Cancel</Button>
                    <Button onClick={approve} sx={{width:'90px'}} variant="contained">  Approve</Button>

                </div>

            </div>

        </div>
  );
}


export default ApprovalView;