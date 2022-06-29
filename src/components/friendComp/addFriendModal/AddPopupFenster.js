import classes from './AddPopupFenster.module.css';
import closePic from '../../../images/close.png';

import React,{useState} from 'react';
import {web3} from '../../../web3/Web3'
import {UserContract,userContractAddress} from '../../../web3/UserContract'
import validImage from '../../../images/valid.png';
import inValidImage from '../../../images/invalid.png';
import plusImg from '../../../images/plus.png';

//material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';

function LikesList(props){

    const [imgSource,setImgSource] = useState(inValidImage);
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


                    <input id="inputName" type="text" placeholder="friend name" className={classes.input}></input>


                    <div style={{display: 'flex',flexDirection: 'row',width:'100%'}}>
                        <input onChange={check} id="addressInput" type="text" placeholder="friend address" className={classes.input}></input>

                        <Tooltip title={imgSource===validImage ? "valid address" : "unvalid address"} placement="top" disableInteractive arrow>
                            <Button  onClick={addFriend} ><img src={imgSource} style={{height:'33px',width:'auto'}}></img></Button>
                        </Tooltip>
                    </div>


                <Tooltip title="add" placement="top" disableInteractive arrow>
                    <Button sx={{width:'100%'}}variant="outlined" onClick={addFriend} ><img src={plusImg} style={{height:'20px',width:'auto'}}></img></Button>
                </Tooltip>

            </div>

        </div>

    );


}

export default LikesList;