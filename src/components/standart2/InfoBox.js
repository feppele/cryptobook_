import classes from './InfoBox.module.css';
import Button6 from '../standart/Button6';
import closePic from '../../images/close.png';


function InfoBox(props){



    return (

        <div className={classes.container}>

            <img onClick={props.onCloseClick} src={closePic} className={classes.close}></img>


            <div className={classes.top}>
                Info
            </div>

            <div className={classes.box}>

                <div className={classes.text}>
                    You can create your NFT in two ways: <br/>

                </div>

                <div className={classes.text}>
                    <big> On Chain NFT: </big> The NFT will be deployed to the blockchain immediately and you pay the fees for that. This process can take up to a few minutes.
                </div>

                <div className={classes.text}>
                    <big> Off Chain NFT: </big> The "NFT" is stored on a local server and you dont have to pay fees. When someone buys your NFT, it will be deployed to the Blockchain, and the buyer will pay the fees for that.
                    This method is the recommended way to create your NFTs.
                </div>

                <div className={classes.text}>
                    On the bottom of this page you can two buttons to decide between on and off chain.
                </div>


            </div>


        </div>

    );


}

export default InfoBox;