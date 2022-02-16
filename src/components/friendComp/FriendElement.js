import classes from './FriendElement.module.css';
import etherSign from '../../images/Crypto-Icons/eth-logo.svg';
import CryptoAddress from '../standart/CryptoAddress';
import {web3} from '../../web3/Web3';
import { useHistory } from "react-router-dom";
import Button6 from '../standart/Button6';
import deleteImg from '../../images/delete.png';
import sendImg from '../../images/send.png';
import profilePic from '../../images/profilepic.png';

import { UserContract } from '../../web3/UserContract';

function FriendElement(props){
    
    const history = useHistory();


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


    function deleteFriend(){

        UserContract.methods.deleteFriend(props.longAddr).send({from: window.web3.currentProvider.selectedAddress}).then(console.log).catch(console.log);

    }

    // Value is HardCoded right now
    async function send(){

        const transactionParameters = {
            to: props.longAddr,
            from: window.web3.currentProvider.selectedAddress,
            value: "0x001"
          };

          const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });
    }

    return (

            <div onClick={openFriendProfile} className={classes.element}>
                <div id="friendName" className={classes.name}> {props.friendName} </div>

                <div className={classes.wrapper}>
                    <CryptoAddress id="sendToAddr" cryptoSign={etherSign} addr={props.addr}/>

                    <Button6 onButtonClicked={openFriendProfile} img={profilePic} popupText={"profile"}/>
                    <Button6 onButtonClicked={send} img={sendImg} popupText={"send"}/>
                    <Button6 onButtonClicked={deleteFriend} img={deleteImg} popupText={"delete"}/>
                </div>
            </div>


        );


}

export default FriendElement;