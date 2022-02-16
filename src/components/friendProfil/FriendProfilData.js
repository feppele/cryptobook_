import classes from './FriendProfilData.module.css';
import ProfilPic from '../../images/profilColor.png';
import etherSign from '../../images/Crypto-Icons/eth-logo.svg';
import friend_symbol from '../../images/friend_symbol.png';
import {useState,useEffect} from 'react';
import {web3} from '../../web3/Web3';
import {getAddress} from '../../web3/LoadingFunctions'
import {onLoad} from '../../web3/LoadingFunctions'
import {shortAddr} from '../../web3/LoadingFunctions'
import MiniModal from '../miniModal/MiniModal'
import MiniBackdrop from '../miniModal/MiniBackdrop'

import Button4 from '../standart/Button4';

import {getOptions} from '../../node/databank';

function ProfilData(props){


    const [modalOpen,setModalOpen] = useState(false);
    function openMiniModal(){

        setModalOpen(true);
    }
    function closeMiniModal(){
        setModalOpen(false);
    }



    return (

        <div id="cont" className={classes.container}>

            {modalOpen && <MiniModal />}
            {modalOpen && <MiniBackdrop onBackDropMouse={closeMiniModal}/>}

            <div className={classes.greyBox}></div>

            <img src={ProfilPic} className={classes.profilePicture}></img>

            <div className={classes.nameWrapper}>
                 <p id="name" className={classes.name}>{props.personData.friend_name}</p>
                {props.isFriend && <Button4 img={friend_symbol} popupText={"stored in your friend-contract"}/>}
            </div>

            <div className={classes.addressWrapper}>
                <img id="cryptoSign" src={etherSign} className={classes.cryptoSign}></img>
                <p className={classes.address} id="address">{shortAddr(props.personData.friend_addr)}</p>

            </div>
        </div>
    );
}

export default ProfilData;