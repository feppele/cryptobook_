import classes from './Right.module.css';

import nft_example from '../../../images/nft_exampe.jpeg';



import NFTFormat from '../../NFT/NFTFormat';


function Right(){


    var element = ["https://ipfs.infura.io/ipfs/QmRceyBepdn81RgqAJzL7jtEcxyHj6zL4tqvnmtiTpNszw","spacey",10]


    return (
        <div className={classes.right}>

            <div className={classes.wrapper}>

            <NFTFormat imageURL={element[0]} imageName={element[1]} tokenId={element[2]}/>

            </div>

           

        </div>
    );
}

export default Right;