import classes from './FriendsInfo.module.css';
import { useHistory } from "react-router-dom";
import{useState,useEffect} from 'react';
import BasicButton from '../standart/BasicButton';
import BasicButton2 from '../standart/BasicButton2';
import LoginFenster from '../start/loginModal/LoginFenster';
import Backdrop from '../start/loginModal/Backdrop';

function FriendsInfo(){

    const history = useHistory();

    const [loginModal,setLoginModal] = useState(false);
    async function goToFriends(){
        if(!window.ethereum){
            window.open("https://metamask.io");
            return
        }else{
            setLoginModal(true)
        }
    }
    function closeLogin(){
        setLoginModal(false)
    }

    function openFriendsDocs(){
        window.open("https://github.com/feppele/MyCryptoBookDocs/wiki/Friends")
    }



    return (

        <div className={classes.container}>

            {loginModal && <LoginFenster nextPage={"/createNFT"} text={"Connect Wallet"} onModalCancelClicked={closeLogin}/>}
            {loginModal && <Backdrop onBackDropClicked={closeLogin}/>}

            <div className={classes.friends}> Never use public addresses again</div>

            <div className={classes.text}> instead - send crypto by using names. Your friends name and address is interconnected in Smart Contracts on the Blockchain, so no one can can change it maliciously</div>

            <div className={classes.buttonWrapper}>
                <BasicButton onButtonClicked={goToFriends} text ="add friends"/>
                <BasicButton2 onButtonClicked={openFriendsDocs}  text ="learn more"/>
            </div>

        </div>
    );
}

export default FriendsInfo;