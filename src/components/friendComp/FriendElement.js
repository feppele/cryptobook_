import classes from './FriendElement.module.css';
import etherSign from '../../images/Crypto-Icons/eth-logo.svg';
import CryptoAddress from '../standart/CryptoAddress';
import {web3} from '../../web3/Web3';
import { useHistory } from "react-router-dom";
import deleteImg from '../../images/delete.png';
import sendImg from '../../images/send.png';
import profilePic from '../../images/profilepic.png';
import saveFriend from '../../images/saveFriend2.png';
import { UserContract } from '../../web3/UserContract';
import {useState,useEffect} from 'react'
import SendPopup from '../standart2/SendPopup';
import Backdrop from '../standart2/Backdrop';
import {unfollowUser} from '../../node/databank';
import StandartProfilPic from '../../images/background.jpeg';
import {getProfilePicURL} from '../../node/images'

//material UI 
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';

function FriendElement(props){

    const history = useHistory();

    const [sendButton,setSendButton] = useState(false);
    const [profilePicURL,setProfilePicURL] = useState(StandartProfilPic);


    function openFriendProfile(){

        // nicht mehr notwenig localStorage da nun der name gepushd wird
        localStorage.setItem("friendName",props.friendName);
        localStorage.setItem("friendAddr",props.longAddr);

        history.push({
            pathname:"/profile/"+props.longAddr,
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

    useEffect(() => {

        getProfilePicURL(props.longAddr).then(url =>{
            if(url.length >0){
                setProfilePicURL(url)
            }

        })
    },[])


    return (

            <div className={classes.element}>

                { sendButton  && <SendPopup onCloseClicked={closeSend} longAddr={props.longAddr} addr={props.addr} friendName={props.friendName}/>}
                {sendButton  && <Backdrop onBackDropClicked={closeSend}/>}

                <div className={classes.nameWrapper}>
                    <img src={profilePicURL} className={classes.profilePicture}></img>
                    <div id="friendName" className={classes.name}> {props.friendName} </div>
                    {props.saveFriend &&  

                        <Tooltip title="on chain" disableInteractive arrow placement="top">
                            <Button>      < img src={saveFriend} style={{height: '20px',width: 'auto'}}></img>   </Button>
                        </Tooltip>

                    }
                </div>

                <div className={classes.wrapper}>
                    <div className={classes.cryptoWrapper}>  <CryptoAddress id="sendToAddr" cryptoSign={etherSign} addr={props.addr}/>   </div> 

                    <ButtonGroup variant="text" >
                        <Tooltip title="profile" disableInteractive arrow placement="top">
                            <Button onClick={openFriendProfile}>    < img src={profilePic} style={{height: '20px',width: 'auto'}}></img>   </Button>
                        </Tooltip>
                        <Tooltip title="send" disableInteractive arrow placement="top">
                            <Button onClick={openSend}>    < img src={sendImg} style={{height: '20px',width: 'auto'}}></img>   </Button>
                        </Tooltip>
                        <Tooltip title="delete" disableInteractive arrow placement="top">
                            <Button  onClick={deleteFriend}>    < img src={deleteImg} style={{height: '20px',width: 'auto'}}></img>   </Button>
                        </Tooltip>
                    </ButtonGroup>

                </div>
            </div>

        );

}

export default FriendElement;