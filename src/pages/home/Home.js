import classes from './Home.module.css';


import HomePage from '../../components/homePages/HomePage';

import { useHistory } from "react-router-dom";
import {useState,useEffect} from 'react'

import NoMetaMaskModal from '../../components/standart3/NoMetaMaskModal'
function Home(){
    //test
    const [noMetaMask,setNoMetaMask] = useState(false);
    const history = new useHistory();

    useEffect(() => {
        if(!window.ethereum){
            setNoMetaMask(true)
        }
    },[])

    function closeNoMetaMask(){
        setNoMetaMask(false)
    }
    // { noMetaMask && <NoMetaMaskModal close={closeNoMetaMask}/> }


    return (
        <div>
            
            <HomePage />
        </div>

    );


}

export default Home;