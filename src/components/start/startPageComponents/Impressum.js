import classes from './Impressum.module.css';

import {useHistory} from 'react-router-dom';
import logo from '../../../images/logo.png';

function Impressum(){

    const history = useHistory()

    function openProfile(){
        history.push("/me");
    }
    function openFriends(){
        history.push("/friends");
    }
    function openMyNFT(){
        history.push("/mynft");
    }
    function openMarketplace(){
        history.push("/marketplace");
    }

    return (

        <div className={classes.container}>

            <div className={classes.container2}> 


                <div className={classes.box}>
                    <div className={classes.logoWrapper}>
                        <img src={logo} className={classes.logo}></img>
                        <div className={classes.header}> My Cryptobook </div>
                    </div>
                    <div className={classes.text}>make the first step into the connected Blockchain World</div>
                </div>


                <div className={classes.box2}>
                    <div className={classes.h2}> My Account </div>
                    <div className={classes.h3} onClick={openProfile} >Profile</div>
                    <div className={classes.h3} onClick={openFriends}>Friends</div>
                    <div className={classes.h3} onClick={openMyNFT}>NFTs</div>
                </div>

                <div className={classes.box2}>
                    <div className={classes.h2}> NFTs </div>
                    <div className={classes.h3} onClick={openMarketplace}>Marketplace</div>
                    <div className={classes.h3} onClick={openMarketplace}>Sinlge</div>
                    <div className={classes.h3} onClick={openMarketplace}>Collections</div>
                </div>

            </div>

            <div className={classes.bottom}>

                <div className={classes.h4}> 2022 mycryptobook.io</div>
                <div className={classes.h4}> info@mycryptobook.io</div>

            </div>

        </div>




    );


}

export default Impressum;