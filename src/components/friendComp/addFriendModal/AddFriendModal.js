
import classes from './AddFriendModal.module.css';
import React from 'react';
import {web3} from '../../../web3/Web3'
import {UserContract,userContractAddress} from '../../../web3/UserContract'
import validImage from '../../../images/valid.png';
import inValidImage from '../../../images/invalid.png';



function AddFriendModal(props){

    function isValidAddress(){
        return web3.utils.isAddress(document.getElementById("addressInput").value);
    }
    function check(){
        const addressInput = document.getElementById("validImage");
        if(isValidAddress()){
            addressInput.src=validImage;
        }else{
            addressInput.src=inValidImage;
        }
    }

    function addFriend(){

        const name= document.getElementById("inputName").value;
        const addr= document.getElementById("addressInput").value;

        UserContract.methods.updateFriends(name,addr).send({
            from: window.web3.currentProvider.selectedAddress,
            to: userContractAddress

        });

    }



    return(

        <div className={classes.modal}>

            <div className={classes.unvisible}>

            </div>

            <div className={classes.realModal}>

                <div className={classes.wrapper}>
                    <p className={classes.text}>Name:</p>
                    <input id="inputName" type="text" className={classes.input}></input>
                </div>
                <div className={classes.wrapper}>
                    <p className={classes.text}>Address:</p>
                    <input onChange={check} id="addressInput" type="text" className={classes.input}></input>
                </div>

            </div>

        <button onClick={addFriend} className={classes.addButton}> Add </button>

        <img id="validImage"  className={classes.validImage}></img>


        </div>

    );




}


export default AddFriendModal;