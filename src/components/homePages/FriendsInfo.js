import classes from './FriendsInfo.module.css';
import { useHistory } from "react-router-dom";
import{useState,useEffect,useContext} from 'react';

//material ui
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

//popup
import PopupFenster from '../PopupFenster/PopupFenster'
import LoginIntegration from '../PopupFenster/LoginIntegration'

function FriendsInfo(){

    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    const [loginPageIsOpen,setloginPageIsOpen] = useState(false)

    function checkIfLogin(){
        const userdata = JSON.parse(sessionStorage.getItem("userdata"))
        return userdata !== null
    }

    const history = useHistory();

    async function goToFriends(){
        if(!checkIfLogin()){ // if not login
            setloginPageIsOpen(true)
            return
        }
        history.push("/friends")
    }

    function openFriendsDocs(){
        window.open("https://github.com/feppele/MyCryptoBookDocs/wiki/Friends")
    }



    return (

        <div className={classes.container}>

           { loginPageIsOpen && <PopupFenster integration={<LoginIntegration nextPage={"/home"}/>} onCloseClicked={()=>{setloginPageIsOpen(false)}} text={"Connect Wallet"}/>   }

            <div style={{color: theme.font}} className={classes.friends}> Never use public addresses again</div>

            <div style={{color: theme.font}} className={classes.text}> instead - send crypto by using names. Your friends name and address is interconnected in Smart Contracts on the Blockchain, so no one can can change it maliciously</div>

            <div className={classes.buttonWrapper}>

                <Button onClick={goToFriends } variant="contained"> add friends </Button>
                <Button onClick={openFriendsDocs } variant="outlined"> learn more </Button>
                {/*}
                <BasicButton onButtonClicked={goToFriends} text ="add friends"/>
                <BasicButton2 onButtonClicked={openFriendsDocs}  text ="learn more"/>
                */}
            </div>

        </div>
    );
}

export default FriendsInfo;