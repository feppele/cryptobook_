import classes from './ProfilData.module.css';
import SettingButton from './SettingButton';
import Button3 from '../standart/Button3';
import Button5 from '../standart/Button5';
import Button4 from '../standart/Button4';
import settingsPic from '../../images/settings2.png';
import savePic from '../../images/save.png';
import ProfilPic from '../../images/profilColor.png';
import etherSign from '../../images/Crypto-Icons/eth-logo.svg';
import {web3} from '../../web3/Web3';
import {getAddress} from '../../web3/LoadingFunctions'
import {onLoad} from '../../web3/LoadingFunctions'
import {shortAddr} from '../../web3/LoadingFunctions'

import ImageSetting from './ImageSetting';
import React, {useState,useEffect,useHistory} from 'react';

import {query,getOptions,queryFetch} from '../../node/databank';

function ProfilData(){

  

    onLoad();


    const [settingMode,setSettingMode] =useState(false);


    const [usernameDB,setUsernameDB] =useState("noch net da");
    const [userNameIsLoad,setUserNameIsLoad] =useState(false);

    function activateSetting(){
        setSettingMode(true);
    }


    function onSaveClick(){
        const username =  document.getElementById("userName").value;

        window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{

            const ans = query("add",{ address: currentUsers[0], username: username} );
            console.log(ans);
        })
        setSettingMode(false);

        window.location.reload();
    }


    // on Load get name from databank
    function loadNameFromDB(){

        window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{

            const options=getOptions("find",{address: currentUsers[0] });
            console.log(options);

            fetch("/databank/",options).then(res => { return res.json()}).then(res=>{
                console.log(res);
                if(res==="error"){
                    setUsernameDB("unnamed");
                }else{
                    setUsernameDB(res.name);
                }
                setUserNameIsLoad(true);
            });
        });

    }

    useEffect(() => {loadNameFromDB();},[])





console.log(usernameDB)

    return (

        <div id="cont" className={classes.container}>

            <div className={classes.greyBox}></div>

            { !settingMode && <img src={ProfilPic} className={classes.profilePicture}></img>    }

            {/* SETTINGS MODE    PICTURE*/}
            { settingMode && <ImageSetting />}

            { !settingMode && userNameIsLoad && <p id="name" className={classes.name}> {usernameDB}</p>    }

            {/* SETTINGS MODE    NAME*/}
            { settingMode && <div className={classes.editNameWrapper}>
                                <input id="userName"type="text" placeholder="your name" className={classes.textInput}></input>
                                <Button5 onButtonClicked={onSaveClick} img={savePic} popupText="savew"/>
                            </div>   }

            <div className={classes.addressWrapper}>
                <img id="cryptoSign" src={etherSign} className={classes.cryptoSign}></img>
                <p className={classes.address} id="address">{shortAddr(localStorage.getItem("myAddress"))}</p>

            </div>

            <div className={classes.buttonPosition}>
                <Button3 onButtonClickded={activateSetting} img={settingsPic} popupText="settings"/>
            </div>



        </div>





    );


}

export default ProfilData;