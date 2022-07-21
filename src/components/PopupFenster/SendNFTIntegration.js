import classes from './SendNFTIntegration.module.css';
import FriendListElement from './FriendListElement';
import {useState} from 'react';
import {getAllFriends,getAllFriendsPromise} from '../../web3/GetAllFriends';




function SendNFTIntegration(props){

    const [allFriends,setAllFriends]= useState([])



    getAllFriendsPromise().then(res => {setAllFriends(res)});





    return (
        <div className={classes.integration}>


                {allFriends.map(item => <FriendListElement closeSendModal={props.onCloseClick} friendItem={item}  tokenId={props.tokenId}  />   )}

        </div>
    );


}

export default SendNFTIntegration;