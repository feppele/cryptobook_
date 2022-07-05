import classes from './SetNFTPriceIntegration.module.css';

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

        <div className={classes.integration}>

            <input className={classes.textInput} placeholder="0.01 (ether)" onKeyDown={changePrice} ></input>

        </div>

    );

}

export default SetNFTPriceModal;