import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";

import MenuModal from './menuModal/MenuModal2.js';
import MenuBackdrop from './menuModal/MenuBackdrop.js';
import ProfilModal from './profilModal/ProfilModal.js';
import Backdrop2 from './profilModal/Backdrop.js';

import classes from './NavBarHome.module.css';

import {web3} from '../../web3/Web3.js';

import profilColor from '../../images/background.jpeg';

import {onLoad} from '../../web3/LoadingFunctions'

import {getProfilePicURL} from '../../node/images'

import {getCurrentUser} from '../../web3/HelperFunctions'


function NavBar(){

    const history = useHistory();

    const [ menu2IsOpen, setMenu2IsOpen ] = useState(false);
    const [ profilModalIsOpen, setProfilIsOpen ] = useState(false);

    const [profilePic,setProfilePic] = useState(profilColor);

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
        history.push("/me");
        //window.location.reload();
    }

    function openFriends(){
        onLoad();
        history.push("/friends");
        //window.location.reload();

    }
    function openMyNftPage(){
        onLoad();
        history.push("/mynft");
        //window.location.reload();
    }

    function openMarketplace(){
    
        history.push("/marketplace");
        //window.location.reload();
    }

    function logOut(){

        history.push("/");

    }


    useEffect(() => {
        getCurrentUser().then(address=>{
            getProfilePicURL(address).then(url => {
                if(url.length >0){
                    setProfilePic(url);
                }
            })
        })

    },[])



    return (

        <div className={classes.container}>

            {  menu2IsOpen && <MenuModal openMarketplace={openMarketplace}/>}
            {  menu2IsOpen && <MenuBackdrop  onBackDropClicked={closeMenu} />  }

            {  profilModalIsOpen && <ProfilModal openProfilFromModal={openProfil} openFriendsFromModal={openFriends} openMyNftModal={openMyNftPage} onLogOutClicked={logOut}/>}
            {  profilModalIsOpen && <Backdrop2 onBackDropClicked={closeProfilModal} />  }

            <button className={classes.logo} onClick={reload}>
                my cryptobook
            </button>

            <div className={classes.menuWrapper}>

                <img id="profilButton" className={classes.profilColor} src={profilePic} onClick={openProfil} onMouseMove={openProfilModal}></img>

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