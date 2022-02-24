import classes from './Right.module.css';

import nft_example from '../../../images/nft_exampe.jpeg';



import NFTFormatEasy from '../../NFT/NFTFormatEasy';


function Right(){


    const tokenid = 2;


    return (
        <div className={classes.right}>

            <div className={classes.wrapper}>

            <NFTFormatEasy  tokenId={tokenid}/>

            </div>

           

        </div>
    );
}

export default Right;