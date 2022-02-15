import classes from './FriendProfilData.module.css';
import ProfilPic from '../../images/profilColor.png';
import etherSign from '../../images/Crypto-Icons/eth-logo.svg';
import friend_symbol from '../../images/friend_symbol.png';
import {useState} from 'react';
import {web3} from '../../web3/Web3';
import {getAddress} from '../../web3/LoadingFunctions'
import {onLoad} from '../../web3/LoadingFunctions'
import {shortAddr} from '../../web3/LoadingFunctions'
import MiniModal from '../miniModal/MiniModal'
import MiniBackdrop from '../miniModal/MiniBackdrop'

function ProfilData(props){

    // FOR MINI MODAL
    const pos = { x : 0, y : 0 };
    const saveCursorPosition = function(x, y) {
        pos.x = (x / window.innerWidth).toFixed(2);
        pos.y = (y / window.innerHeight).toFixed(2);
        document.documentElement.style.setProperty('--x', pos.x);
        document.documentElement.style.setProperty('--y', pos.y);
    }
    document.addEventListener('mousemove', e => { saveCursorPosition(e.clientX, e.clientY); })

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
                {props.isFriend && <img onMouseMove={openMiniModal} src={friend_symbol} className={classes.friend_symbol}></img>}
            </div>

            <div className={classes.addressWrapper}>
                <img id="cryptoSign" src={etherSign} className={classes.cryptoSign}></img>
                <p className={classes.address} id="address">{shortAddr(props.personData.friend_addr)}</p>

            </div>
        </div>
    );
}

export default ProfilData;