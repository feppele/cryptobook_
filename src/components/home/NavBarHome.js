import {useState} from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";

import MenuModal from './menuModal/MenuModal2.js';
import MenuBackdrop from './menuModal/MenuBackdrop.js';
import ProfilModal from './profilModal/ProfilModal.js';
import Backdrop2 from './profilModal/Backdrop.js';

import classes from './NavBarHome.module.css';

import {web3} from '../../web3/Web3.js';

import profilColor from '../../images/profilColor.png';

import {onLoad} from '../../web3/LoadingFunctions'


function NavBar(){

    const history = useHistory();

    const [ menu2IsOpen, setMenu2IsOpen ] = useState(false);
    const [ profilModalIsOpen, setProfilIsOpen ] = useState(false);

    function reload(){
        history.push("/home");
    }

    function openMenu(){

        setMenu2IsOpen(true);
    }
    function closeMenu(){

        setMenu2IsOpen(false);
    }
    function openProfilModal(){

        setProfilIsOpen(true);

    }
    function closeProfilModal(){

        setProfilIsOpen(false);
    }

    // for change Path
    function openProfil(){
        onLoad();
        history.push("/profil");
        window.location.reload();
    }

    function openFriends(){
        onLoad();
        history.push("/friends");
        window.location.reload();

    }
    function openMyNftPage(){
        onLoad();
        history.push("/mynft");
        window.location.reload();
    }

    function logOut(){

        history.push("/");

    }

    return (

        <div className={classes.container}>

            {  menu2IsOpen && <MenuModal />}
            {  menu2IsOpen && <MenuBackdrop  onBackDropClicked={closeMenu} />  }

            {  profilModalIsOpen && <ProfilModal openProfilFromModal={openProfil} openFriendsFromModal={openFriends} openMyNftModal={openMyNftPage} onLogOutClicked={logOut}/>}
            {  profilModalIsOpen && <Backdrop2 onBackDropClicked={closeProfilModal} />  }

            <button className={classes.logo} onClick={reload}>
                my cryptobook
            </button>

            <div className={classes.menuWrapper}>

                <img id="profilButton" className={classes.profilColor} src={profilColor} onClick={openProfil} onMouseMove={openProfilModal}></img>

                <div className={classes.wrap4Modal}>
                    <div className={classes.menu} onClick={openMenu} onMouseMove={openMenu}>
                        <div className={classes.stripe}></div>
                        <div className={classes.stripe}></div>
                        <div className={classes.stripe}></div>
                    </div>
                </div>

            </div>

        </div>


    );

}

export default NavBar;