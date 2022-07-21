import classes from './Home.module.css';
import HomePage from '../../components/homePages/HomePage';
import { useHistory } from "react-router-dom";
import {useState,useEffect} from 'react'


function Home(){
    //test

    const history = new useHistory();



    return (
        <div>
            <HomePage />
        </div>

    );


}

export default Home;