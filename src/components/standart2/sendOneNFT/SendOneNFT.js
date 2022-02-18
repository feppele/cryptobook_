import classes from './SendOneNFT.module.css';
import closePic from '../../../images/close.png'
import FriendListElement from './FriendListElement';
import {useState} from 'react';
import {getAllFriends,blockchainFriends,followFriends} from '../../../web3/GetAllFriends';


function SendOneNFT(props){

    const [allFriends,setAllFriends]= useState([])


    getAllFriends().then(res => {setAllFriends(res)});



    return (

        <div className={classes.container}>
            <img onClick={props.onCloseClick} src={closePic} className={classes.close}></img>


            <div className={classes.top}>
                Send NFT: {props.imageName}
            </div>

            <div className={classes.list}>


                {allFriends.map(item => <FriendListElement friendItem={item}  tokenId={props.tokenId}  />   )}

            </div>
        </div>

    );


}

export default SendOneNFT;