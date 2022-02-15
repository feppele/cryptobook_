import classes from './Profil.module.css';

import ProfilData from '../../components/profilComp/ProfilData'

import {onLoad} from '../../web3/LoadingFunctions';

function Profil(){

    onLoad();


    return (

        <div className={classes.container}>

            <ProfilData />

        </div>





    );


}

export default Profil;