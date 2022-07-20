import classes from './FriendProfilData.module.css';
import ProfilPic from '../../images/background.jpeg';
import etherSign from '../../images/Crypto-Icons/eth-logo.svg';
import friend_symbol from '../../images/friend_symbol.png';
import {useState,useEffect,useContext} from 'react';
import {shortAddr} from '../../web3/LoadingFunctions'
import followuser from '../../images/add-user.png';
import black_herz from '../../images/backherz.png'
import unfollowImg from '../../images/unfollow.png'
import {getOptions} from '../../node/databank';
import {follow,unfollow} from '../../node/followFunction';

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

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

//User Context
import {UserContext} from '../../UserProvider'



function ProfilData(props){
    const userData = useContext(UserContext)
    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])
    const[followList,setFollowList] = useState(false);
    const[followArrayList,setFollowArrayForList] = useState([]);
    const[followCount,setFollowCount] = useState(0);
    const[userFollowed,setUserFollowed] = useState(false);
    const [profilePicURL,setProfilePicURL] =useState(ProfilPic);

    console.log(followArrayList)


    function followUser(){
        follow(props.personData.friend_addr.toLowerCase())//Database
        // insead of window.location.reload()
        console.log("follow")
        setUserFollowed(true)
        setFollowCount(parseInt(followCount)+1);
    }

    function unfollowUser(){
        unfollow(props.personData.friend_addr.toLowerCase())//Database
        // instead of window.location.reload()
        setUserFollowed(false)
        setFollowCount(parseInt(followCount)-1);
        //window.location.reload(false);
    }

    // DO I FOLLOW?
    function doIFollow(){
        if(!window.ethereum){return}
        //window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{

            fetch(fetchi + "/databank",getOptions("doIFollow",{person: props.personData.friend_addr.toLowerCase(),follower: userData.address.toLowerCase()} ))
            .then(res => {return res.json()}).then(res=>{

                if(res[0][0].count > 0){
                    setUserFollowed(true);
                }
            }).catch(console.log);

        //})
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

        <div style={{backgroundColor:theme.color2}} id="cont" className={classes.container}>

            {followList && <PopupFenster text={"Followed by"} onCloseClicked={closeFollowList} integration={<LikesIntegration likesList={followArrayList}/>} /> }


            <div className={classes.buttonPositon}>

                <Tooltip title={!userFollowed ?"follow":"unfollow"} disableInteractive arrow placement="top">
                    <Button variant="outlined" onClick={!userFollowed ?followUser:unfollowUser }> <img src={!userFollowed ? followuser:unfollowImg} style={{height: '20px',width: 'auto',filter:theme.png}}></img>   </Button>
                </Tooltip>

            </div>

            <div className={classes.greyBox}>
                <img className={classes.backgroundPic} src={profilePicURL}></img>

            </div>

            <img src={profilePicURL} className={classes.profilePicture}></img>

            <div className={classes.nameWrapper}>
                 <p style={{color:theme.font}} id="name" className={classes.name}>{props.personData.friend_name}</p>
                {props.isFriend && 
                    <Tooltip title={"in your friend-contract"} disableInteractive arrow placement="top">
                        <Button> <img src={friend_symbol} style={{height: '32px',width: 'auto',filter:theme.png}}></img>   </Button>
                    </Tooltip>
                }
            </div>

                {/*Crypto Address */}
                <Button sx={{gap:'10px',border:'1px solid black'}}> <img id="cryptoSign" src={etherSign} className={classes.cryptoSign}></img> {shortAddr(props.personData.friend_addr)}</Button>




            <div className={classes.followWrapper}>
                    <img src={black_herz} className={classes.herz}></img>
                    <div style={{color:theme.font}} onClick={openFollowList} className={classes.text}> {followCount + " follower"} </div>
            </div>

        </div>
    );
}

export default ProfilData;