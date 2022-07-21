import classes from './HomePage.module.css';
import { useHistory } from "react-router-dom";

import{useState,useEffect,useRef, useLayoutEffect,useContext} from 'react';
import FriendsInfo from './FriendsInfo';
import NFTFormatEasyOnePage from '../NFT/NFTFormatEasyOnePage';
import Impressum from '../start/startPageComponents/Impressum'

//material ui
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'


function HomePage(){

    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])


    console.log(JSON.parse(sessionStorage.getItem("userdata")))
    // for ease In animation
    const NFTtextRef = useRef(null)

    useLayoutEffect(()=>{
        const y = NFTtextRef.current.getBoundingClientRect().top
        if(y <= 350){
            // element transition
            NFTtextRef.current.className= classes.easebox
    }
        document.addEventListener("scroll",()=>{
        const y = NFTtextRef.current.getBoundingClientRect().top
        if(y <= 350){
                // element transition
                NFTtextRef.current.className= classes.easebox
        }
        })
    })



    const history = useHistory();

    const [loginModal,setLoginModal] = useState(false);

    async function openCreatePage(){

        history.push("/createnft");

    }

    function closeLogin(){
        setLoginModal(false)
    }


    async function openExplore(){
        history.push("/marketplace");
    }

    function openMCBNFTDocs(){
        window.open("https://github.com/feppele/MyCryptoBookDocs/wiki/MyCryptoBook-NFTs-(MCBNFT)")
    }
    async function openChat(){
        history.push("/chats");
    }

    function openChatDocs(){
        window.open("https://github.com/feppele/MyCryptoBookDocs/wiki/Crypto-Chat")
    }

    return (

        <div style={{backgroundColor: theme.color1}} className={classes.container}>


            <div style={{backgroundColor: theme.color2}} className={classes.cryptochat}>



                <div style={{color: theme.font}} className={classes.nftText}>
                    Encrypt messages with your private key
                </div>

                <div style={{color: theme.font}} className={classes.cryptoText}>
                    Since MyCryptoBook is open Source, you are able to verify, that messages are 100% encrypted and signed with private keys.
                </div>

            <div className={classes.buttonWrapper}>

                <Button variant="contained" onClick={openChat}> Crypto-Chat </Button>
                <Button variant="outlined" onClick={openChatDocs}> learn more </Button>
            </div>



            </div>


            <div className={classes.top}>

                <div  className={classes.NFTwrapper}>
                    <NFTFormatEasyOnePage  tokenId={"956886101373974921071286911279360404"}/>
                </div>


                <div ref={NFTtextRef} id="box" className={classes.box}>

                    <p style={{color: theme.font}} className={classes.nftText}> Discover, create and sell your Art as NFTs</p>

                    <p style={{color: theme.font}} className={classes.text}> ... and thats not everything. show your collection in your profile or explore those of your friends. Sell, buy them or just send them as a present. <big>Create </big> your Art on or off chain, and just upgrade them to the Blockchain when someone is buying</p>


                    <div className={classes.buttonWrapper}>

                        <Button onClick={openExplore} variant="contained">Explore</Button>
                        <Button onClick={openCreatePage} variant="outlined">Create</Button>
                        <Button onClick={openMCBNFTDocs} variant="outlined">Learn more</Button>

                        {/*
                        <BasicButton onButtonClicked={openExplore} text ="Explore"/>
                        <BasicButton2 onButtonClicked={openCreatePage} text ="Create"/>
                        <BasicButton2 onButtonClicked={openMCBNFTDocs} text ="Learn more"/>
                        */}
                    </div>


                </div>



            </div>


            <div style={{backgroundColor: theme.color2}} className={classes.bottom}>


                <FriendsInfo />


            </div>

        <Impressum/>

        </div>
    );
}

export default HomePage;