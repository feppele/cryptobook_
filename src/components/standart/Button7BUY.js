import classes from './Button7BUY.module.css';
import {useState,useEffect} from 'react';

import etherSign from '../../images/Crypto-Icons/etherSign.png'


function Button7BUY(props){

    const[popup,setPopup] =useState(false);
    function openPopup(){
        setPopup(true);
        //popup.classList.toggle("show");
    }
    function closePopup(){
        setPopup(false);
    }


    return (

        <div  onClick={props.onButtonClickded} onMouseOut={closePopup} onMouseOver={openPopup} className={classes.wrapper}>

                { popup && <span className={classes.popuptext} id="myPopup">{"Buy"}</span> }

                <div onClick={props.onButtonClicked} className={classes.popupButton}>
                    <div className={classes.amount}>{props.preis}</div> <img src={etherSign} className={classes.img}></img>
                </div>


        </div>
    );



}

export default Button7BUY;