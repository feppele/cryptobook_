import classes from './Impressum.module.css';
import {useState} from 'react'

import {useHistory} from 'react-router-dom';
import logo from '../../../images/logo.png';
import gitImg from '../../../images/git2.png';
import telegramImg from '../../../images/telegram.png';
import mailImg from '../../../images/mail.png';
import gitbook from '../../../images/gitbook.png';
import LogoMini from '../../homePages/LogoMini'

import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

//popup
import PopupFenster from '../../PopupFenster/PopupFenster'
import LoginIntegration from '../../PopupFenster/LoginIntegration'

function Impressum(){

    const history = useHistory()

    const [loginPageIsOpen,setloginPageIsOpen] = useState(false)

    function checkIfLogin(){
        const userdata = JSON.parse(sessionStorage.getItem("userdata"))
        return userdata !== null
    }

    function openProfile(){
        if(!checkIfLogin()){ // if not login
            setloginPageIsOpen(true)
            return
        }
        history.push("/me");
    }
    function openFriends(){
        if(!checkIfLogin()){ // if not login
            setloginPageIsOpen(true)
            return
        }
        history.push("/friends");
    }
    function openMyNFT(){
        if(!checkIfLogin()){ // if not login
            setloginPageIsOpen(true)
            return
        }
        history.push("/mynft");
    }
    function openMarketplace(){
        history.push("/marketplace");
    }
    function openCreateNFT(){
        history.push("/createNFT");
    }
    

    function openTelegram(){
        window.open("https://t.me/mycryptobookio")
    }
    function openGit(){
        window.open("https://github.com/feppele/cryptobook_")
    }
    function openGitBook(){
        window.open("https://mycryptobook.gitbook.io/untitled/")
    }
    function openMail(){
    }
    function openTwitter(){
    }
    function openWhitepaper(){
    }


    function openCryptoChat(){
        if(!checkIfLogin()){ // if not login
            setloginPageIsOpen(true)
            return
        }
        history.push("/chats");

    }
    function openWallet(){
 
    }

    return (

        <div className={classes.container}>

           { loginPageIsOpen && <PopupFenster integration={<LoginIntegration nextPage={"/home"}/>} onCloseClicked={()=>{setloginPageIsOpen(false)}} text={"Connect Wallet"}/>   }


            <div className={classes.container2}> 

                <div className={classes.box}>
                    <div className={classes.logoWrapper}>
                         <LogoMini />
                        <div className={classes.header}> MyCryptoBook </div>
                    </div>
                    <div className={classes.text}>make the first step into the connected Blockchain World</div>

                </div>

                <div className={classes.box2}>
                    <div className={classes.h2}> My Account </div>
                    <div className={classes.h3} onClick={openProfile} >Profile</div>
                    <div className={classes.h3} onClick={openFriends}>Friends</div>
                    <div className={classes.h3} onClick={openMyNFT}>NFTs</div>
                    <div className={classes.h3} onClick={openCryptoChat}>Crypto-Chat</div>
                    <div className={classes.h3} onClick={openWallet}>Wallet</div>
                </div>

                <div className={classes.box2}>
                    <div className={classes.h2}> NFTs </div>
                    <div className={classes.h3} onClick={openMarketplace}>Marketplace</div>
                    <div className={classes.h3} onClick={openMarketplace}>Sinlge</div>
                    <div className={classes.h3} onClick={openMarketplace}>Collections</div>
                    <div className={classes.h3} onClick={openCreateNFT}>Create NFT</div>

                </div>

                <div className={classes.box2}>
                    <div className={classes.h2}> Developers </div>
                    <div className={classes.h3} onClick={openGit}>GitHub</div>
                    <div className={classes.h3} onClick={openGitBook}>GitBook</div>
                    <div className={classes.h3} onClick={openWhitepaper}>Whitepaper</div>
                </div>


            </div>


            <div className={classes.bottom}>

            <div className={classes.iconsWrapper}> 
                    <div onClick={openTwitter} className={classes.icon}>
                    <TwitterIcon sx={{color:'white'}}/>
                    </div>
                    <div onClick={openGitBook} className={classes.icon}>
                    <img src={gitbook} style={{width:'22px'}}></img>
                    </div>
                    <div onClick={openTelegram} className={classes.icon}>
                    <TelegramIcon sx={{color:'white'}}/>
                    </div>
                    <div onClick={openMail} className={classes.icon}>
                    <MailOutlineIcon sx={{color:'white'}}/>
                    </div>
                </div>

                <div className={classes.h4}> Copyright © 2022 MyCryptoBook. All rights reserved. </div>
            </div>
        </div>




    );


}

export default Impressum;