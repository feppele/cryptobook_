
import classes from './MenuModal2.module.css';

import ModalButton from '../profilModal/ModalButton';

import React from 'react';
import nftPic from '../../../images/art.png';


function MenuModal2(props){



    return(

        <div className={classes.modal}>

            <ModalButton imgSource ={nftPic} text="Marketplace"/>
            <ModalButton />



        </div>

    );




}


export default MenuModal2;