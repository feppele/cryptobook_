import {useState} from 'react';
//css
import classes from './StartNavBar.module.css';

//popup
import PopupFenster from '../PopupFenster/PopupFenster'
import LoginIntegration from '../PopupFenster/LoginIntegration'

function NavBar(){

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
        openLogin();
    }

    return (

        <div className={classes.container}>


           { loginPageIsOpen && <PopupFenster integration={<LoginIntegration nextPage={"/home"}/>} onCloseClicked={closeLogin} text={"Connect Wallet"}/>   }

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