import classes from './NFTFormat.module.css';

import herz from '../../images/herz.png';
import ethereum from '../../images/ethereum.png';

import {NFTContract,NFTContractAddress} from '../../web3/NFTContract';
import {useHistory} from 'react-router-dom';

function NFTFormat(props){

    const history =useHistory();


    function openThisNFTPage(){
        const data ={_imageURL: props.imageURL,
                    _imageName: props.imageName,
                    _tokenId: props.tokenId}

        history.push({
            pathname:"/thisNFT/"+props.tokenId,
            state:data
        });

    }

    return (

        <div className={classes.container} onClick={openThisNFTPage}>

            {/*NFT IMAGE */}
            <img src={props.imageURL} className={classes.NFTimage}></img>
            {/*NFT IMAGE */}
            <div className={classes.bottom}>

                <div className={classes.nameAndFrom}> {props.imageName}</div>
                <div className={classes.nameAndNumber}>{"#"+props.tokenId}</div>


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

export default NFTFormat;