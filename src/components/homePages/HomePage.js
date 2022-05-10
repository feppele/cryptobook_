import classes from './HomePage.module.css';
import { useHistory } from "react-router-dom";
import{useState,useEffect} from 'react';
import FriendsInfo from './FriendsInfo';
import NFTFormatEasyOnePage from '../NFT/NFTFormatEasyOnePage';
import BasicButton from '../standart/BasicButton';
import BasicButton2 from '../standart/BasicButton2';
import Impressum from '../start/startPageComponents/Impressum'
import LoginFenster from '../start/loginModal/LoginFenster';
import Backdrop from '../start/loginModal/Backdrop';

function HomePage(){

    const history = useHistory();

    const [loginModal,setLoginModal] = useState(false);

    async function openCreatePage(){
        if(!window.ethereum){
            window.open("https://metamask.io");
            return
        }else{
            setLoginModal(true)
        }
    }

    function closeLogin(){
        setLoginModal(false)
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


            {loginModal && <LoginFenster nextPage={"/createNFT"} text={"Connect Wallet"} onModalCancelClicked={closeLogin}/>}
            {loginModal && <Backdrop onBackDropClicked={closeLogin}/>}

            <div className={classes.top}>

                <div className={classes.NFTwrapper}>
                    <NFTFormatEasyOnePage  tokenId={"956886101373974921071286911279360404"}/>
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