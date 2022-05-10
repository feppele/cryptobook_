import {useState} from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";

//Modals
import LoginFenster from './loginModal/LoginFenster'
import Backdrop2 from './loginModal/Backdrop.js';
//css
import classes from './StartNavBar.module.css';

import {web3} from '../../web3/Web3.js';
import {UserContract} from '../../web3/UserContract.js';

import logomy from '../../images/logo_my.png';

function NavBar(){

    const [ menuIsOpen, setMenuIsOpen ] = useState(false);
    const [ loginPageIsOpen, setLoginIsOpen ] = useState(false);

    function reload(){
        window.location.reload(true);
    }

    function openLogin(){

        setLoginIsOpen(true);

    }
    function closeLogin(){

        setLoginIsOpen(false);
    }


    function loginButtonClicked(){
        //if metamask not install open metamask.io otherwise open Modal
        console.log("loginButtonClicked")
        if(!isMetaMaskInstalled()){
            window.open("https://metamask.io");
            return;
        }
        openLogin();
    }
    const history = useHistory();


    function isMetaMaskInstalled() {
        return Boolean(window.ethereum && window.ethereum.isMetaMask);
    }


    return (

        <div className={classes.container}>



            {  loginPageIsOpen && <LoginFenster nextPage={"/home"} text={"Connect Wallet"} onModalCancelClicked={closeLogin}/>}
            {  loginPageIsOpen && <Backdrop2 onBackDropClicked={closeLogin} />  }

            <button className={classes.logo} onClick={reload}>
                MyCryptoBook
            </button>


            <div className={classes.menuWrapper}>

                <button id="loginButton" className={classes.loginButton} onClick={loginButtonClicked}> login </button>

            </div>

        </div>


    );

}

export default NavBar;