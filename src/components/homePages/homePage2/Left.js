import classes from './Left.module.css';

import nft_example from '../../../images/nft_exampe.jpeg';
import {useHistory} from 'react-router-dom';

import adventurer from '../../../images/adventurer.png'
import paint from '../../../images/paint.png'
import Button7Superbreit from '../../standart/Button7Superbreit';

function Left(){

    const history = useHistory();

    function openCreatePage(){
        history.push("/createNFT");
    }



    return (
            <div className={classes.left}>


                <div className={classes.box}>

                    <p className={classes.nftText}> Discover, create and sell your Art as NFTs</p>

                    <p className={classes.text}> ... and thats not everything.</p>
                    <p className={classes.text}> show your collection in your profile or explore those of your friends</p>
                    <p className={classes.text}> sell, buy them or just send them as a present </p>


                    <p className={classes.text}>  <big>create </big> your Art on or off chain, and just upgrade them to the Blockchain when someone wants to buy </p>

                    <div className={classes.buttonWrapper}>


                        <button  className={classes.button}>Explore</button>
                        <button onClick={openCreatePage}className={classes.button1} >Create</button>
                        <button onClick={openCreatePage}className={classes.button1} >Learn more</button>

                    </div>


                </div>



            </div>
    );
}

export default Left;