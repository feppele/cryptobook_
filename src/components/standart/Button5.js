import classes from './Button5.module.css';
import {useState,useEffect} from 'react';


function Button5(props){

    const[popup,setPopup] =useState(false);
    function openPopup(){
        setPopup(true);
        //popup.classList.toggle("show");
    }
    function closePopup(){
        setPopup(false);
    }


    return (

        <div  onClicked={props.onButtonClicked} onMouseOut={closePopup} onMouseOver={openPopup} className={classes.wrapper}>

                { popup && <span className={classes.popuptext} id="myPopup">{props.popupText}</span> }

                <div onClick={props.onButtonClicked} className={classes.popupButton}>
                    <img src={props.img} className={classes.img}></img>
                </div>


        </div>
    );



}

export default Button5;