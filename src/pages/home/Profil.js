import classes from './Profil.module.css';

import ProfilData from '../../components/profilComp/ProfilData'
import {useHistory} from 'react-router-dom'
//import {onLoad} from '../../web3/LoadingFunctions';

function Profil(){

    //onLoad();
    const history = new useHistory();

    if(!window.ethereum){
        history.push("/noMetaMask")
    }else{
        const accounts = window.ethereum.request({method: 'eth_requestAccounts'});
    }

    return (

        <div className={classes.container}>

            <ProfilData />

        </div>





    );


}

export default Profil;