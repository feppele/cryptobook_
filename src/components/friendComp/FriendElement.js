import classes from './FriendElement.module.css';
import etherSign from '../../images/Crypto-Icons/eth-logo.svg';
import CryptoAddress from '../standart/CryptoAddress';
import {web3} from '../../web3/Web3';
import { useHistory } from "react-router-dom";
import Button6 from '../standart/Button6';
import deleteImg from '../../images/delete.png';
import sendImg from '../../images/send.png';
import profilePic from '../../images/profilepic.png';
import saveFriend from '../../images/saveFriend2.png';
import { UserContract } from '../../web3/UserContract';
import {useState} from 'react'

import SendPopup from '../standart2/SendPopup';
import Backdrop from '../standart2/Backdrop';
import {unfollowUser} from '../../node/databank';

function FriendElement(props){
    
    const history = useHistory();

    const [sendButton,setSendButton] = useState(false);


    function openFriendProfile(){

        // nicht mehr notwenig localStorage da nun der name gepushd wird
        localStorage.setItem("friendName",props.friendName);
        localStorage.setItem("friendAddr",props.longAddr);

        history.push({
            pathname:"friendProfile/"+props.longAddr,
            data: {
                friendName: props.friendName,
                friendAddr: props.longAddr
            }
        });


    }

    // check if blockchain or databas
    function deleteFriend(){
        if(props.saveFriend ){
            UserContract.methods.deleteFriend(props.longAddr).send({from: window.web3.currentProvider.selectedAddress}).then(console.log).catch(console.log);
        }else{
            unfollowUser(props.longAddr);
        }
    }

    // Value is HardCoded right now
    function openSend(){
        setSendButton(true)
    }
    function closeSend(){
        setSendButton(false)
    }


    return (

            <div className={classes.element}>


                { sendButton  && <SendPopup onCloseClicked={closeSend} longAddr={props.longAddr} addr={props.addr} friendName={props.friendName}/>}
                {sendButton  && <Backdrop onBackDropClicked={closeSend}/>}


                <div className={classes.nameWrapper}>
                    <div id="friendName" className={classes.name}> {props.friendName} </div>
                     { props.saveFriend && <Button6  img={saveFriend} popupText={"on chain"}/>}
                </div>


                <div className={classes.wrapper}>
                    <CryptoAddress id="sendToAddr" cryptoSign={etherSign} addr={props.addr}/>

                    <Button6 onButtonClicked={openFriendProfile} img={profilePic} popupText={"profile"}/>
                    <Button6 onButtonClicked={openSend} img={sendImg} popupText={"send"}/>
                    <Button6 onButtonClicked={deleteFriend} img={deleteImg} popupText={"delete"}/>
                </div>
            </div>


        );


}

export default FriendElement;