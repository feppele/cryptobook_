import classes from './FriendListElement.module.css';

import {shortAddr} from '../../web3/LoadingFunctions';
import {useHistory} from 'react-router-dom';
import {sendNFT} from '../../web3/NFTContractHelper';
import {useEffect,useState} from 'react'


import {getProfilePicURL} from '../../node/images'


import StandartProfilPic from '../../images/background.jpeg';
function FriendListElement(props){


    const [profilePic,setProfilePic] =useState(StandartProfilPic);

    function send(){

        sendNFT(props.friendItem.friend_addr,props.tokenId)

        props.closeSendModal();
    }



    useEffect(() => {
        getProfilePicURL(props.friendItem.friend_addr).then(url => {
            if(url.length >0){
                setProfilePic(url);
            }
        })

    },[])


    return (

        <div  onClick={send} className={classes.container}>

            <img src={profilePic} className={classes.profilePicture}></img>



            <div className={classes.container2}>

            <div className={classes.name}>{props.friendItem.friend_name}</div>

            <div className={classes.addresse}>{shortAddr(props.friendItem.friend_addr)}</div>
            </div>

        </div>


    )


}

export default FriendListElement;