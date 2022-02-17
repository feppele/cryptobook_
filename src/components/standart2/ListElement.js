import classes from './ListElement.module.css';
import Button6 from '../standart/Button6';
import closePic from '../../images/close.png';
import {shortAddr} from '../../web3/LoadingFunctions';
import {useHistory} from 'react-router-dom';

function ListElement(props){

    var username =props.likesItem.name;
    if( username=== null ){
        username = "unnamed";
    }

    const history = useHistory();
    function goToProfile(){
        window.ethereum.request({method: 'eth_accounts'}).then(accounts=>{
            if(accounts[0] ===props.likesItem.address){

                history.push({
                    pathname:"/profil/"
                });
            }else{
                history.push({
                    pathname:"/friendProfile/"+props.likesItem.address
                });
            }
        })
    }


    return (

        <div onClick={goToProfile} className={classes.container}>

            <div className={classes.name}>{username}</div>

            <div className={classes.addresse}>{shortAddr(props.likesItem.address)}</div>
        </div>


    )


}

export default ListElement;