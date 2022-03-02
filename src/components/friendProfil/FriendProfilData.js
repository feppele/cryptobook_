import classes from './FriendProfilData.module.css';
import ProfilPic from '../../images/background.jpeg';
import etherSign from '../../images/Crypto-Icons/eth-logo.svg';
import friend_symbol from '../../images/friend_symbol.png';
import {useState,useEffect} from 'react';
import {web3} from '../../web3/Web3';
import {getAddress} from '../../web3/LoadingFunctions'
import {onLoad} from '../../web3/LoadingFunctions'
import {shortAddr} from '../../web3/LoadingFunctions'
import MiniModal from '../miniModal/MiniModal'
import MiniBackdrop from '../miniModal/MiniBackdrop'

import followuser from '../../images/add-user.png';
import Button3 from '../standart/Button3';
import Button4 from '../standart/Button4';

import black_herz from '../../images/backherz.png'
import unfollowImg from '../../images/unfollow.png'


import {getOptions} from '../../node/databank';

import LikesList from '../standart2/LikesList';
import Backdrop from '../standart2/Backdrop';

import {getProfilePicURL} from '../../node/images'
import {getCurrentUser} from '../../web3/HelperFunctions'

function ProfilData(props){

    
    const [modalOpen,setModalOpen] = useState(false);
    const[followList,setFollowList] = useState(false);
    const[followArrayList,setFollowArrayForList] = useState([]);
    const[followCount,setFollowCount] = useState(0);
    const[userFollowed,setUserFollowed] = useState(false);
    const [profilePicURL,setProfilePicURL] =useState(ProfilPic);
    const[update,setUpdate]= useState(false);

    function openMiniModal(){

        setModalOpen(true);
    }
    function closeMiniModal(){
        setModalOpen(false);
    }

    function followUser(){
        if(!window.ethereum){return}
        window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
            fetch("/databank",getOptions("follow",{person: props.personData.friend_addr.toLowerCase(),follower: currentUsers[0].toLowerCase()} )).catch(console.log);
        })
        window.location.reload(false);
    }

    function unfollowUser(){
        if(!window.ethereum){return}
        window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
            fetch("/databank",getOptions("unfollow",{person: props.personData.friend_addr.toLowerCase(),follower: currentUsers[0].toLowerCase()} )).catch(console.log);
        })
        window.location.reload(false);
    }

    // DO I FOLLOW?
    function doIFollow(){
        if(!window.ethereum){return}
        window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
            fetch("/databank",getOptions("doIFollow",{person: props.personData.friend_addr.toLowerCase(),follower: currentUsers[0].toLowerCase()} ))
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
        fetch("/databank",getOptions("followCount",{person: props.personData.friend_addr.toLowerCase()}))
        .then(res => {return res.json()}).then(res=>{
            if(res==="error"){
                setFollowCount(0);
            }
            setFollowCount(res[0][0].count);
        })
    }
    useEffect(() => {getFollowCount()},[]);




    function getFollowList(){
        fetch("/databank",getOptions("getFollowList",{person: props.personData.friend_addr.toLowerCase()}))
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

                {followList && <Backdrop onBackDropClicked={closeFollowList}/>              }
                {followList && <LikesList text={"Followed by"} onCloseClick={closeFollowList} likesList={followArrayList}/> }


            {modalOpen && <MiniModal />}
            {modalOpen && <MiniBackdrop onBackDropMouse={closeMiniModal}/>}

            <div className={classes.buttonPositon}>
                {!userFollowed &&<Button3 onButtonClicked={followUser} img={followuser} popupText={"follow"}/> }
                {userFollowed && <Button3 onButtonClicked={unfollowUser} img={unfollowImg} popupText={"unfollow"}/> }
            </div>

            <div className={classes.greyBox}>
                <img className={classes.backgroundPic} src={profilePicURL}></img>

            </div>

            <img src={profilePicURL} className={classes.profilePicture}></img>

            <div className={classes.nameWrapper}>
                 <p id="name" className={classes.name}>{props.personData.friend_name}</p>
                {props.isFriend && <Button4 img={friend_symbol} popupText={"stored in your friend-contract"}/>}
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