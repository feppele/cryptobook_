import classes from './Left.module.css';

import nft_example from '../../../images/nft_exampe.jpeg';
import {useHistory} from 'react-router-dom';


function Left(){

    const history = useHistory();

    function openCreatePage(){
        history.push("/createNFT");
    }



    return (
            <div className={classes.left}>

                <p className={classes.nftText}> Discover, collect, create and sell NFTs</p>

                <p className={classes.text}> ... and thats not everything.</p>
                <p className={classes.text}> show your collection in your profile or explore those of your friends</p>
                <p className={classes.text}> sell, buy them or just send them as a present </p>

                <div className={classes.buttonWrapper}>

                    <button  className={classes.button}>Explore</button>
                    <button onClick={openCreatePage}className={classes.button1} >Create</button>

                </div>

            </div>
    );
}

export default Left;