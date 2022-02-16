import classes from './Button4.module.css';
import {useState,useEffect} from 'react';


function Button4(props){

    const[popup,setPopup] =useState(false);
    function openPopup(){
        setPopup(true);
        //popup.classList.toggle("show");
    }
    function closePopup(){
        setPopup(false);
    }


    return (

        <div  onMouseOut={closePopup} onMouseOver={openPopup} className={classes.wrapper}>

                { popup && <span className={classes.popuptext} id="myPopup">{props.popupText}</span> }

                <div className={classes.popupButton}>
                    <img src={props.img} className={classes.img}></img>
                </div>


        </div>
    );



}

export default Button4;