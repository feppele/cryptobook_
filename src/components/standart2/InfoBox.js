import classes from './InfoBox.module.css';
import closePic from '../../images/close.png';

import {useEffect,useState,useContext} from 'react'

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'


function InfoBox(props){

    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])



    return (

        <div style={{backgroundColor:theme.color2}} className={classes.container}>

            <img onClick={props.onCloseClick} src={closePic} className={classes.close}></img>


            <div style={{color:theme.font}} className={classes.top}>
                Info
            </div>

            <div className={classes.box}>

                <div style={{color:theme.font}} className={classes.text}>
                    You can create your NFT in two ways: <br/>

                </div>

                <div style={{color:theme.font}} className={classes.text}>
                    <big> On Chain NFT: </big> The NFT will be deployed to the blockchain immediately and you pay the fees for that. This process can take up to a few minutes.
                </div>

                <div style={{color:theme.font}} className={classes.text}>
                    <big> Off Chain NFT: </big> The "NFT" is stored on a local server and you dont have to pay fees. When someone buys your NFT, it will be deployed to the Blockchain, and the buyer will pay the fees for that.
                    This method is the recommended way to create your NFTs.
                </div>

                <div style={{color:theme.font}} className={classes.text}>
                    On the bottom of this page you can two buttons to decide between on and off chain.
                </div>

                <div style={{color:theme.font}} className={classes.text}>
                    If you choose On-Chain Create and dont pay the fees, it will be automatically created as an Off-Chain NFT.
                </div>

            </div>


        </div>

    );


}

export default InfoBox;