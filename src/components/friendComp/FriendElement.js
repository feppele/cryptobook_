import classes from './FriendElement.module.css';
import etherSign from '../../images/Crypto-Icons/eth-logo.svg';
import CryptoAddress from '../standart/CryptoAddress';
import {web3} from '../../web3/Web3';
import { useHistory } from "react-router-dom";

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
                    <button onClick={send} addr={props.addr} className={classes.sendButton}> send </button>
                </div>
            </div>


        );


}

export default FriendElement;