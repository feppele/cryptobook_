
import classes from './ProfilModal.module.css';

import React from 'react';
import profilPic from '../../../images/profil.png';
import settingPic from '../../../images/setting.png';
import logPic from '../../../images/log-out.png';
import walletPic from '../../../images/wallet.png';
import nftPic from '../../../images/art.png';
import friendPic from '../../../images/friend.png';

import ModalButton from './ModalButton';

function ProfilModal(props){

    return(


        <div className={classes.invisibleWrapper}>
            <div className={classes.invisibleBox}>
            </div>

            <div className={classes.modal}>


                <ModalButton imgSource ={profilPic} text="Profil"       onModalButtonClick={props.openProfilFromModal}/>
                <ModalButton imgSource ={friendPic} text="Friends"      onModalButtonClick={props.openFriendsFromModal}/>
                <ModalButton imgSource ={walletPic} text="Wallet" />
                <ModalButton imgSource ={nftPic} text="myNFTs"            onModalButtonClick={props.openMyNftModal}/>
                <ModalButton imgSource ={settingPic} text="Settings" />
                <ModalButton imgSource ={logPic} text="Log Out"         onModalButtonClick={props.onLogOutClicked}/>

            </div>
        </div>




    );




}


export default ProfilModal;