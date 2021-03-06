import classes from './Impressum.module.css';
import {useState} from 'react'

import {useHistory} from 'react-router-dom';
import logo from '../../../images/logo.png';
import gitImg from '../../../images/git2.png';
import telegramImg from '../../../images/telegram.png';
import mailImg from '../../../images/mail.png';

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

    function openTelegram(){
        window.open("https://t.me/mycryptobookio")
    }
    function openGit(){
        window.open("https://github.com/feppele/cryptobook_")
    }
    function openMail(){

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
                        <img src={logo} className={classes.logo}></img>
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
                </div>

                <div className={classes.gitBox}>

                        <div className={classes.gitWrapper}>
                            <img onClick={openTelegram} src={telegramImg} className={classes.git}></img>
                            <div className={classes.gitText}> Join our Telegram-Channel</div>
                        </div>
                        <div className={classes.gitWrapper}>
                            <img onClick={openGit} src={gitImg} className={classes.git}></img>
                            <div className={classes.gitText}> Git-Reposetory</div>
                        </div>
                        <div className={classes.gitWrapper}>
                            <img onClick={openMail} src={mailImg} className={classes.git}></img>
                            <div className={classes.gitText}> Get in touch with us</div>
                        </div>

                </div>

            </div>

            <div className={classes.bottom}>

                <div className={classes.h4}> 2022 mycryptobook.io</div>
                <div className={classes.h4}> info@mycryptobook.io</div>

            </div>

        </div>




    );


}

export default Impressum;