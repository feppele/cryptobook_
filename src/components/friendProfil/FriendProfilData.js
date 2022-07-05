import classes from './FriendProfilData.module.css';
import ProfilPic from '../../images/background.jpeg';
import etherSign from '../../images/Crypto-Icons/eth-logo.svg';
import friend_symbol from '../../images/friend_symbol.png';
import {useState,useEffect} from 'react';
import {shortAddr} from '../../web3/LoadingFunctions'
import followuser from '../../images/add-user.png';
import black_herz from '../../images/backherz.png'
import unfollowImg from '../../images/unfollow.png'
import {getOptions} from '../../node/databank';

import {getProfilePicURL} from '../../node/images'

import {fetchi} from '../../globalData'

//popup
import PopupFenster from '../PopupFenster/PopupFenster'
import LikesIntegration from '../PopupFenster/LikesIntegration'

//material UI 
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';

function ProfilData(props){


    //const fetchi ="https://backendserverreact.azurewebsites.net"

    const[followList,setFollowList] = useState(false);
    const[followArrayList,setFollowArrayForList] = useState([]);
    const[followCount,setFollowCount] = useState(0);
    const[userFollowed,setUserFollowed] = useState(false);
    const [profilePicURL,setProfilePicURL] =useState(ProfilPic);

    console.log(followArrayList)


    function followUser(){
        if(!window.ethereum){return}
        window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
            fetch( fetchi + "/databank",getOptions("follow",{person: props.personData.friend_addr.toLowerCase(),follower: currentUsers[0].toLowerCase()} )).catch(console.log);
        })

        // instead of window.location.reload()
        console.log("follow")
        setUserFollowed(true)
        setFollowCount(parseInt(followCount)+1);
    }

    function unfollowUser(){
        if(!window.ethereum){return}
        window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
            fetch(fetchi + "/databank",getOptions("unfollow",{person: props.personData.friend_addr.toLowerCase(),follower: currentUsers[0].toLowerCase()} )).catch(console.log);
        })

        // instead of window.location.reload()
        setUserFollowed(false)
        setFollowCount(parseInt(followCount)-1);
        //window.location.reload(false);
    }

    // DO I FOLLOW?
    function doIFollow(){
        if(!window.ethereum){return}
        window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
            fetch(fetchi + "/databank",getOptions("doIFollow",{person: props.personData.friend_addr.toLowerCase(),follower: currentUsers[0].toLowerCase()} ))
            .then(res => {return res.json()}).then(res=>{

                if(res[0][0].count > 0){
                    setUserFollowed(true);
                }
            }).catch(console.log);
        })
    }
    useEffect(() => {doIFollow()},[]);


    // ZÄHLE ANZAHL FOLLOWER
    function getFollowCount(){
        fetch(fetchi + "/databank",getOptions("followCount",{person: props.personData.friend_addr.toLowerCase()}))
        .then(res => {return res.json()}).then(res=>{
            if(res==="error"){
                setFollowCount(0);
            }
            setFollowCount(res[0][0].count);
        })
    }
    useEffect(() => {getFollowCount()},[]);


    function getFollowList(){
        fetch(fetchi + "/databank",getOptions("getFollowList",{person: props.personData.friend_addr.toLowerCase()}))
        .then(res => {return res.json()}).then(res=>{
            console.log("getFollowList");
            console.log(res);
            if(res==="error"){
                setFollowArrayForList([]);
            }
            setFollowArrayForList(res);
        })
    }
    useEffect(() => {getFollowList()},[]);


    function openFollowList(){
        setFollowList(true);
    }
    function closeFollowList(){
        setFollowList(false);
    }


    // load ProfilPic
    useEffect(() => {

        getProfilePicURL(props.personData.friend_addr).then(url => {
            if(url.length >0){
                setProfilePicURL(url);
            }
        })

    },[])

    return (

        <div id="cont" className={classes.container}>

            {followList && <PopupFenster text={"Followed by"} onCloseClicked={closeFollowList} integration={<LikesIntegration likesList={followArrayList}/>} /> }


            <div className={classes.buttonPositon}>

                <Tooltip title={!userFollowed ?"follow":"unfollow"} disableInteractive arrow placement="top">
                    <Button variant="outlined" onClick={!userFollowed ?followUser:unfollowUser }> <img src={!userFollowed ? followuser:unfollowImg} style={{height: '20px',width: 'auto'}}></img>   </Button>
                </Tooltip>

            </div>

            <div className={classes.greyBox}>
                <img className={classes.backgroundPic} src={profilePicURL}></img>

            </div>

            <img src={profilePicURL} className={classes.profilePicture}></img>

            <div className={classes.nameWrapper}>
                 <p id="name" className={classes.name}>{props.personData.friend_name}</p>
                {props.isFriend && 
                    <Tooltip title={"in your friend-contract"} disableInteractive arrow placement="top">
                        <Button> <img src={friend_symbol} style={{height: '32px',width: 'auto'}}></img>   </Button>
                    </Tooltip>
                }
            </div>

            <div className={classes.addressWrapper}>
                <img id="cryptoSign" src={etherSign} className={classes.cryptoSign}></img>
                <p className={classes.address} id="address">{shortAddr(props.personData.friend_addr)}</p>

            </div>


            <div className={classes.followWrapper}>
                    <img src={black_herz} className={classes.herz}></img>
                    <div onClick={openFollowList} className={classes.text}> {followCount + " follower"} </div>
            </div>

        </div>
    );
}

export default ProfilData;