import classes from './HomePage.module.css';
import { useHistory } from "react-router-dom";
import{useState,useEffect} from 'react';
import FriendsInfo from './FriendsInfo';
import NFTFormatEasyOnePage from '../NFT/NFTFormatEasyOnePage';
import BasicButton from '../standart/BasicButton';
import BasicButton2 from '../standart/BasicButton2';
import Impressum from '../start/startPageComponents/Impressum'


function HomePage(){

    const history = useHistory();

    async function openCreatePage(){
        if(!window.ethereum){
            window.open("https://metamask.io");
            return
        }else{
            const accounts = await  window.ethereum.request({method: 'eth_requestAccounts'});
            history.push("/createNFT");
        }

    }
    async function openExplore(){
        if(window.ethereum){const accounts = await  window.ethereum.request({method: 'eth_requestAccounts'});}
        history.push("/marketplace");
    }

    function openMCBNFTDocs(){
        window.open("https://github.com/feppele/MyCryptoBookDocs/wiki/MyCryptoBook-NFTs-(MCBNFT)")
    }

    return (

        <div className={classes.container}>



            <div className={classes.top}>

                <div className={classes.NFTwrapper}>
                    <NFTFormatEasyOnePage  tokenId={"1080670587487461719420429993284072544"}/>
                </div>


                <div className={classes.box}>

                    <p className={classes.nftText}> Discover, create and sell your Art as NFTs</p>

                    <p className={classes.text}> ... and thats not everything. show your collection in your profile or explore those of your friends. Sell, buy them or just send them as a present. <big>Create </big> your Art on or off chain, and just upgrade them to the Blockchain when someone is buying</p>


                    <div className={classes.buttonWrapper}>

                        <BasicButton onButtonClicked={openExplore} text ="Explore"/>
                        <BasicButton2 onButtonClicked={openCreatePage} text ="Create"/>
                        <BasicButton2 onButtonClicked={openMCBNFTDocs} text ="Learn more"/>

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