
import classes from './MenuModal2.module.css';

import ModalButton from '../profilModal/ModalButton';

import React from 'react';
import nftPic from '../../../images/art.png';


function MenuModal2(props){



    return(

        <div className={classes.invisibleWrapper}>

            <div className={classes.invisible}></div>

            <div className={classes.modal}>



                <ModalButton onModalButtonClick={props.openMarketplace} imgSource ={nftPic} text="Marketplace"/>
                <ModalButton />



            </div>


        </div>



    );




}


export default MenuModal2;