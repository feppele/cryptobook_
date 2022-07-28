import classes from './HomePage.module.css';
import { useHistory } from "react-router-dom";

import{useState,useEffect,useRef, useLayoutEffect,useContext} from 'react';
import FriendsInfo from './FriendsInfo';
import NFTFormatEasyOnePage from '../NFT/NFTFormatEasyOnePage';
import Impressum from '../start/startPageComponents/Impressum'
import Box from './Box'
import LogoMini from './LogoMini'

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


function HomePage(){

    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    const [loginPageIsOpen,setloginPageIsOpen] = useState(false)


    const history = useHistory();


    function checkIfLogin(){
        const userdata = JSON.parse(sessionStorage.getItem("userdata"))
        return userdata !== null
    }


    async function openCreatePage(){
        if(!checkIfLogin()){ // if not login
            setloginPageIsOpen(true)
            return
        }
        history.push("/createnft");
    }

    async function openChat(){
        if(!checkIfLogin()){ // if not login
            setloginPageIsOpen(true)
            return
        }
        history.push("/chats");
    }

    async function openExplore(){
        history.push("/marketplace");
    }
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



    function openMCBNFTDocs(){
        window.open("https://github.com/feppele/MyCryptoBookDocs/wiki/MyCryptoBook-NFTs-(MCBNFT)")
    }


    function openChatDocs(){
        window.open("https://github.com/feppele/MyCryptoBookDocs/wiki/Crypto-Chat")
    }

    const dots = Array.from(Array(75).keys())

    return (

        <div style={{backgroundColor: theme.startPage}} className={classes.container}>

           { loginPageIsOpen && <PopupFenster integration={<LoginIntegration nextPage={"/home"}/>} onCloseClicked={()=>{setloginPageIsOpen(false)}} text={"Connect Wallet"}/>   }



           <Box 
            header ={"Send encrypted Messages"}
            body ={"Since MyCryptoBook is open Source, you are able to verify, that messages are 100% encrypted. Therefore we use the same key, which protects your cryptocurrencies."}
            buttons =   {[ <Button variant="contained" onClick={openChat} > Crypto-Chat </Button>,
                            <Button variant="outlined" onClick={openChatDocs} > learn more </Button>
                        ]}
            dot={true}
            />



            <Box 
            header ={"Discover, create and sell your Art as NFTs"}
            body ={"... and thats not everything. Show your collection in your profile or explore those of your friends. Sell, buy them or just send them as a gift. Create your Art on or off chain, and just upgrade them to the Blockchain when someone is buying it"}
            buttons =   {[      <Button onClick={openExplore} variant="contained" >Explore</Button>,
                                <Button onClick={openCreatePage} variant="outlined" >Create</Button>,
                                <Button onClick={openMCBNFTDocs} variant="outlined"  >Learn more</Button>
                        ]}
            img= {<NFTFormatEasyOnePage  tokenId={"1186057012317243477983756935648904218"}/> }
           />

            <Box 
            header ={"Never use public addresses again"}
            body ={"instead - send crypto by using names. Your friends name and address is interconnected in Smart Contracts on the Blockchain, so no one can can change it maliciously"}
            buttons =   {[  <Button onClick={goToFriends } variant="contained"> add friends </Button>,
                            <Button onClick={openFriendsDocs } variant="outlined"> learn more </Button>
                            ]}
            bottomdot={true}
           />

        <Impressum />

        </div>
    );
}

export default HomePage;