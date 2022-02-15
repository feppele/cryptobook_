import classes from './ProfilData.module.css';
import SettingButton from './SettingButton';

import ProfilPic from '../../images/profilColor.png';

import etherSign from '../../images/Crypto-Icons/eth-logo.svg';


import {web3} from '../../web3/Web3';
import {getAddress} from '../../web3/LoadingFunctions'
import {onLoad} from '../../web3/LoadingFunctions'
import {shortAddr} from '../../web3/LoadingFunctions'



function ProfilData(){

    onLoad();

    return (

        <div id="cont" className={classes.container}>

            <div className={classes.greyBox}></div>

            <img src={ProfilPic} className={classes.profilePicture}></img>

            <p id="name" className={classes.name}>unnamed</p>

            <div className={classes.addressWrapper}>
                <img id="cryptoSign" src={etherSign} className={classes.cryptoSign}></img>
                <p className={classes.address} id="address">{shortAddr(localStorage.getItem("myAddress"))}</p>

            </div>

            <SettingButton />


        </div>





    );


}

export default ProfilData;