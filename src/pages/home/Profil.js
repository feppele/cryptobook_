import classes from './Profil.module.css';
import ProfilData from '../../components/profilComp/ProfilData'
import {useHistory} from 'react-router-dom'


function Profil(){

    const history = new useHistory();


    return (

        <div className={classes.container}>

            <ProfilData />

        </div>

    );
}

export default Profil;