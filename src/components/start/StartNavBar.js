import {useState} from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";

//Modals

import LoginModal from './loginModal/LoginModal.js';
import Backdrop2 from './loginModal/Backdrop.js';
//css
import classes from './StartNavBar.module.css';

import {web3} from '../../web3/Web3.js';
import {UserContract} from '../../web3/UserContract.js';


//import {onLoad} from '../../web3/LoadingFunctions'

import logomy from '../../images/logo_my.png';





function NavBar(){

    const [ menuIsOpen, setMenuIsOpen ] = useState(false);
    const [ loginPageIsOpen, setLoginIsOpen ] = useState(false);

    function reload(){
        window.location.reload(true);
    }

    function openMenu(){

        setMenuIsOpen(true);
    }
    function closeMenu(){

        setMenuIsOpen(false);
    }
    function openLogin(){

        document.getElementById('loginButton').style.color = "rgb(0,124,255)";
        document.getElementById('loginButton').style.background = "rgba(0, 0, 0, 0.685)";

        setLoginIsOpen(true);

    }
    function closeLogin(){

        document.getElementById('loginButton').style.color = "white";
        document.getElementById('loginButton').style.background = "rgb(6, 29, 42)";

        setLoginIsOpen(false);
    }
    function login(){
        openLogin();
    }
    const history = useHistory();


    function isMetaMaskInstalled() {
        return Boolean(window.ethereum && window.ethereum.isMetaMask);
    }

    function checkMetamaskAvailable(){

    }

    async function loginMetamask(){

        console.log("login")

        if(!isMetaMaskInstalled()){
            window.open("https://metamask.io");
            return;
        }else{

            const accounts =  await window.ethereum.request({method: 'eth_requestAccounts'});
            var user = accounts[0];

            //await onLoad();
            // direkt to new Site
            await history.push("/home");
            return;

        }



    }

    return (

        <div className={classes.container}>



            {  loginPageIsOpen && <LoginModal onModalCancelClicked={closeLogin} onModalMetamaskClicked={loginMetamask}/>}
            {  loginPageIsOpen && <Backdrop2 onBackDropClicked={closeLogin} />  }

            <button className={classes.logo} onClick={reload}>
                MyCryptobook
            </button>


            <div className={classes.menuWrapper}>

                <button id="loginButton" className={classes.loginButton} onMouseOver={login} onClick={login}> login </button>

            </div>

        </div>


    );

}

export default NavBar;