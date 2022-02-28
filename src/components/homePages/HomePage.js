import classes from './HomePage.module.css';
import { useHistory } from "react-router-dom";
import{useState,useEffect} from 'react';
import FriendsInfo from './FriendsInfo';
import NFTFormatEasy from '../NFT/NFTFormatEasy';

import BasicButton from '../standart/BasicButton';
import BasicButton2 from '../standart/BasicButton2';

import Impressum from '../start/startPageComponents/Impressum'




function HomePage(){

    const history = useHistory();

    function openCreatePage(){
        history.push("/createNFT");
    }
    function openExplore(){
        history.push("/marketplace");
    }


    return (

        <div className={classes.container}>



            <div className={classes.top}>

                <div className={classes.NFTwrapper}>
                    <NFTFormatEasy  tokenId={"903297465833223963115740102678138018"}/>
                </div>


                <div className={classes.box}>

                    <p className={classes.nftText}> Discover, create and sell your Art as NFTs</p>

                    <p className={classes.text}> ... and thats not everything. show your collection in your profile or explore those of your friends. sell, buy them or just send them as a present <big>create </big> your Art on or off chain, and just upgrade them to the Blockchain when someone wants to buy</p>


                    <div className={classes.buttonWrapper}>

                        <BasicButton onButtonClicked={openExplore} text ="Explore"/>
                        <BasicButton2 onButtonClicked={openCreatePage} text ="Create"/>
                        <BasicButton2 onButtonClicked={openCreatePage} text ="Learn more"/>

                    </div>


                </div>



            </div>


            <div className={classes.bottom}>


            <FriendsInfo />


            </div>

        <Impressum/>

        </div>
    );
}

export default HomePage;