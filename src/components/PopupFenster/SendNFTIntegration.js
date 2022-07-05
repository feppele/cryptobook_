import classes from './SendNFTIntegration.module.css';
import ListElement from './ListElement';
import {useState} from 'react';
import {getAllFriends,getAllFriendsPromise} from '../../web3/GetAllFriends';
import {useEffect} from 'react'




function SendNFTIntegration(props){

    const [allFriends,setAllFriends]= useState([])



    getAllFriendsPromise().then(res => {setAllFriends(res)});





    return (
        <div className={classes.integration}>


                {allFriends.map(item => <ListElement closeSendModal={props.onCloseClick} friendItem={item}  tokenId={props.tokenId}  />   )}

        </div>
    );


}

export default SendNFTIntegration;