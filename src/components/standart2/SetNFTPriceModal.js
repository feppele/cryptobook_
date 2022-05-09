import classes from './SetNFTPriceModal.module.css';
import Button6 from '../standart/Button6';
import closePic from '../../images/close.png';

import {setPreisOfNFT} from '../../node/NFTData'

function SetNFTPriceModal(props){



    function changePrice(e){
        if(e.key!== "Enter"){
            return;
        }
        const price = e.target.value;

        setPreisOfNFT(props.tokenId,price)
        //window.location.reload()
        props.nftpriceChanged(price)
        props.onCloseClick()
    }

    return (

        <div className={classes.container}>

            <img onClick={props.onCloseClick} src={closePic} className={classes.close}></img>


            <div className={classes.top}>
                {props.text}
            </div>

            <div className={classes.list}>

            <input className={classes.textInput} placeholder="0.01 (ether)" onKeyDown={changePrice} ></input>

            </div>


        </div>

    );


}

export default SetNFTPriceModal;