import classes from './FriendListElement.module.css';

import Button6 from './../../standart/Button6';
import {shortAddr} from '../../../web3/LoadingFunctions';
import {useHistory} from 'react-router-dom';
import {sendNFT} from '../../../web3/NFTContractHelper';

function FriendListElement(props){


    function send(){

        sendNFT(props.friendItem.friend_addr,props.tokenId)

    }


    return (

        <div  onClick={send} className={classes.container}>

            <div className={classes.name}>{props.friendItem.friend_name}</div>

            <div className={classes.addresse}>{shortAddr(props.friendItem.friend_addr)}</div>
        </div>


    )


}

export default FriendListElement;