import classes from './HomePage1.module.css';
import { useHistory } from "react-router-dom";
import{useState,useEffect} from 'react';

import BasicButton from '../../standart/BasicButton';
import BasicButton2 from '../../standart/BasicButton2';

import Left from './Left';

function HomePage1(){

    const history = useHistory();



    return (

        <div className={classes.container}>



            <div className={classes.right}>


                <div className={classes.box}>

                    <div className={classes.headerText}></div>



                </div>





            </div>


            <Left />
        </div>
    );
}

export default HomePage1;