import classes from './Button7Breit.module.css';
import {useState,useEffect} from 'react';


function Button7Breit(props){

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

                { popup && <span className={classes.popuptext} id="myPopup">{props.popupText}</span> }

                <div onClick={props.onButtonClicked} className={classes.popupButton}>
                    <img src={props.img} className={classes.img}></img>
                </div>


        </div>
    );



}

export default Button7Breit;