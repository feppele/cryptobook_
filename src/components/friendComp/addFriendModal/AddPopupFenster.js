import classes from './AddPopupFenster.module.css';
import Button6 from '../../standart/Button6';
import closePic from '../../../images/close.png';

import React,{useState} from 'react';
import {web3} from '../../../web3/Web3'
import {UserContract,userContractAddress} from '../../../web3/UserContract'
import validImage from '../../../images/valid.png';
import inValidImage from '../../../images/invalid.png';
import Button7Breit from '../../standart/Button7Breit';
import plusImg from '../../../images/plus.png';

function LikesList(props){

    const [imgSource,setImgSource] = useState();
    function isValidAddress(){
        return web3.utils.isAddress(document.getElementById("addressInput").value);
    }
    function check(){
        const addressInput = document.getElementById("validImage");
        if(isValidAddress()){
            setImgSource(validImage);
        }else{
            setImgSource(inValidImage);
        }
    }

    function addFriend(){

        const name= document.getElementById("inputName").value;
        const addr= document.getElementById("addressInput").value;

        if(name!=="" && addr!==""){

            UserContract.methods.updateFriends(name,addr).send({
                from: window.web3.currentProvider.selectedAddress,
                to: userContractAddress
            });
        }
    }



    return (

        <div className={classes.container}>

            <img onClick={props.onCloseClicked} src={closePic} className={classes.close}></img>


            <div className={classes.top}>
                Add Blockchain Friend 
            </div>


            <div className={classes.realModal}>

                <div className={classes.wrapper}>
                    <input id="inputName" type="text" placeholder="friend name" className={classes.input}></input>

                    <Button7Breit onButtonClicked={addFriend} img={plusImg} popupText={"add"}/>


                </div>
                <div className={classes.wrapper}>
                    <input onChange={check} id="addressInput" type="text" placeholder="friend address" className={classes.input}></input>
                    <Button6 id="validImage" img={imgSource} popupText={"not valid"}/>

                </div>

            </div>

        </div>

    );


}

export default LikesList;