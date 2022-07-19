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
import {useState,useEffect,useContext} from 'react'
import {unfollowUser} from '../../node/databank';
import StandartProfilPic from '../../images/background.jpeg';
import {getProfilePicURL} from '../../node/images'

//popup 
import PopupFenster from '../PopupFenster/PopupFenster'
import SendIntergation from '../PopupFenster/SendIntergation'


//material UI 
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';

//ColorTheme
//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'


function FriendElement(props){

        // Night Mode
        const nightMode = useContext(NightContext)
        const [theme,setTheme] =useState(themes.bright)
        useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    const history = useHistory();

    const [sendButton,setSendButton] = useState(false);
    const [profilePicURL,setProfilePicURL] = useState(StandartProfilPic);
    const [copyClicked,setCopyClicked] = useState(false);

    //for Alert
    const [alertOpen, setAlertOpen] = useState(true);


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

    function copyAddress(){
        navigator.clipboard.writeText(props.longAddr);
        setCopyClicked(true)
    }

    function closeTooltip(){
        setTimeout(() => {setCopyClicked(false)},200)
        
    }

    // Value is HardCoded right now
    function openSend(){
        setSendButton(true)
    }
    function closeSend(){
        setSendButton(false)
    }

    useEffect(() => {
        console.log(props.longAddr)
        getProfilePicURL(props.longAddr).then(url =>{
            if(url.length >0){
                setProfilePicURL(url)
            }

        })
    },[])


    return (

            <div style={{backgroundColor:theme.color2,border:theme.border}} className={classes.element}>


                { sendButton  && <PopupFenster integration={<SendIntergation longAddr={props.longAddr} addr={props.addr} friendName={props.friendName}/>} text={`Send Ether to ${props.friendName}`} onCloseClicked={closeSend} />   }


                <div className={classes.nameWrapper}>
                    <img src={profilePicURL} className={classes.profilePicture}></img>
                    <div style={{color:theme.font}}id="friendName" className={classes.name}> {props.friendName}  </div>
                    {props.saveFriend &&

                        <Tooltip title="on chain" disableInteractive arrow placement="top">
                            <Button> < img src={saveFriend} style={{height: '20px',width: 'auto'}}></img>   </Button>
                        </Tooltip>

                    }
                </div>

                <div className={classes.wrapper}>

                    {/* Crypto Address */}
                    <Tooltip className={classes.cryptoWrapper} onClose={closeTooltip} title={copyClicked ? "Copied!" : "Copy"} placement="left" arrow>
                        <Button onClick={copyAddress} sx={{marginRight:'10px'}} >{props.addr}</Button>
                    </Tooltip>

                    <ButtonGroup variant="text" >
                        <Tooltip title="profile" disableInteractive arrow placement="top">
                            <Button onClick={openFriendProfile}>    < img src={profilePic} style={{height: '20px',width: 'auto',filter:theme.png}}></img>   </Button>
                        </Tooltip>
                        <Tooltip title="send" disableInteractive arrow placement="top">
                            <Button onClick={openSend}>    < img src={sendImg} style={{height: '20px',width: 'auto',filter:theme.png}}></img>   </Button>
                        </Tooltip>
                        <Tooltip title="delete" disableInteractive arrow placement="top">
                            <Button  onClick={deleteFriend}>    < img src={deleteImg} style={{height: '20px',width: 'auto',filter:theme.png}}></img>   </Button>
                        </Tooltip>
                    </ButtonGroup>



                </div>
            </div>

        );

}

export default FriendElement;