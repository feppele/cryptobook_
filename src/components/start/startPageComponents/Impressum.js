import classes from './Impressum.module.css';

import {useHistory} from 'react-router-dom';
import logo from '../../../images/logo.png';
import gitImg from '../../../images/git2.png';
import telegramImg from '../../../images/telegram.png';
import mailImg from '../../../images/mail.png';

function Impressum(){

    const history = useHistory()

    function openProfile(){
        history.push("/me");
    }
    function openFriends(){
        history.push("/friends");
    }
    function openMyNFT(){
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

    return (

        <div className={classes.container}>

            <div className={classes.container2}> 


                <div className={classes.box}>
                    <div className={classes.logoWrapper}>
                        <img src={logo} className={classes.logo}></img>
                        <div className={classes.header}> My Cryptobook </div>
                    </div>
                    <div className={classes.text}>make the first step into the connected Blockchain World</div>

                </div>


                <div className={classes.box2}>
                    <div className={classes.h2}> My Account </div>
                    <div className={classes.h3} onClick={openProfile} >Profile</div>
                    <div className={classes.h3} onClick={openFriends}>Friends</div>
                    <div className={classes.h3} onClick={openMyNFT}>NFTs</div>
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