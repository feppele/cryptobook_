import classes from './NFTFormat2.module.css';

import unnamed from '../../images/unnamed.png';
import herz from '../../images/herz.png';
import ethereum from '../../images/ethereum.png';
import {useHistory} from 'react-router-dom';

import {NFTContract,NFTContractAddress} from '../../web3/NFTContract';

function NFTFormat2(props){

    const history = useHistory();

    function openMyNFTPage(){
        history.push("/mynft");

    }


    return (

        <div className={classes.container}  onClick={openMyNFTPage}>

            {/*NFT IMAGE */}
            <img src={props.imageURL} className={classes.NFTimage} ></img>
            {/*NFT IMAGE */}
            <div className={classes.bottom}>

                <div className={classes.nameAndFrom}> {props.imageName}</div>
                <div className={classes.nameAndNumber}>{props.imageName}</div>


            </div>

            <div className={classes.bottom2}>

            <img src={ethereum} className={classes.ethereum}></img>

                <div className={classes.likesWrapper}>
                    <img src={herz} className={classes.herzImg}></img>
                    <div className={classes.numberlikes}> 0 </div>
                </div>



            </div>


        </div>





    );


}

export default NFTFormat2;