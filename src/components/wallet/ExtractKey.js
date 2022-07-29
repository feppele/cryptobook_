import * as React from 'react';

import {useEffect,useRef,useState,useContext} from 'react'
import classes from './ExtractKey.module.css'

import {getProfilePicURL} from '../../node/images'
import {shortAddr} from '../../web3/LoadingFunctions'
import etherSign from '../../images/ethereum.png'
import HistoryView from './HistoryView'

//material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';

import {loginDB,PWdecrypt} from '../../node/username'


//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

import { ethers } from "ethers";


import {_web3} from '../../web3/Web3'
var web3 = _web3.mcbWallet
var userdata = JSON.parse(sessionStorage.getItem("userdata"))
console.log(userdata)
if(userdata !== null){
    userdata.metamask === true ? web3 = _web3.metamask : web3 = _web3.mcbWallet
}



function ExtractKey(props) {
    userdata = JSON.parse(sessionStorage.getItem("userdata"))
    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])


    const [password,setPassword] = useState("")
    const [key,setKey] = useState("")

    const [loginError,setLoginError] = useState("")
    const [approved,setApproved] = useState(false)


    // check PW and decrypt Private Key
    async function checkPW(){
        const res = await loginDB(userdata.name,password) // not exist: return "error" else: {name:'',pw:'',publickey,privatekey,address}

        console.log(res)
        if( res === "error"){
            setLoginError("unvalid password")
            return false
        }
        return true
    }


    async function approve(){

        // checks if PW correct
        if(! await checkPW()){ 
            return
        }
        const decryptedPrivateKey = PWdecrypt(userdata.privatekey,password)
        setKey(decryptedPrivateKey)
        setApproved(true)
    }
    function cancel(){
    }


  return (
        <div className={classes.integration}>

            {!approved &&
            <div style={{backgroundColor:theme.color2,border:theme.border}} className={classes.box}>

                <div style={{borderBottom: theme.border}} className={classes.approve}>

                    <div className={classes.pwWrapper}>
                        <div style={{color:'red'}}>Don't show your private Key to anyone. The person who has your private Key has accsess to all your funds.</div>
                        <div>Confirm with your Password to show your Private Key. </div>
                        <TextField  value={password} onChange={(e)=>{setPassword(e.target.value);setLoginError("")}} helperText={loginError} error={loginError!==""} label="Password" type="password"  sx={{width:'100%'}}  />
                    </div>

                </div>

                <div className={classes.approve}>

                    <Button onClick={approve} sx={{width:'90px'}} variant="contained">  Approve</Button>

                </div>

            </div>
            }

            {approved &&
            <div style={{backgroundColor:theme.color2,border:theme.border}} className={classes.box}>

                <div style={{borderBottom: theme.border}} className={classes.approve}>

                    <div className={classes.key}>{key}</div>

                </div>

            </div>
            }

        </div>
  );
}


export default ExtractKey