import classes from './MyNftPage.module.css';

import NftCollection from './NftCollection';
import React, { Component } from 'react';
import {useState,useEffect} from 'react';
import {loadFriends,shortAddr,onLoad} from '../../web3/LoadingFunctions';
import {useHistory} from 'react-router-dom';
import {NFTContract,NFTContractAddress} from '../../web3/NFTContract';
import {getAllTokensMetadataArray} from '../../web3/NFTContractHelper';
import Button7Breit from '../standart/Button7Breit';
import explorePic from '../../images/adventurer.png';
import createPic from '../../images/paint.png'


function MyNftPage(){

    const [myAddress,setMyAddress] = useState("")
    const [address,setAddress] =useState(false)

    const history = useHistory();

    function openCreatePage(){
        history.push("/createNFT");
    }
    function openExplore(){
        history.push("/marketplace");
    }


    useEffect(() => {

        window.ethereum.request({method: 'eth_accounts'}).then(acc =>{
            setMyAddress(acc[0].toString());
            setAddress(true)
        })


    },[])


    console.log(myAddress)
    return (

        <div className={classes.container}>


                <div className={classes.header}>

                    <div className={classes.headerText}>my NFTs</div>

                    <div className={classes.buttonWrapper}>

                        <Button7Breit onButtonClicked={openExplore} img={explorePic} popupText={"explore"}/>
                        <Button7Breit onButtonClicked={openCreatePage} img={createPic} popupText={"create"}/>

                    </div>

                </div>

                <div className={classes.stripe}></div>


                { address && <NftCollection from={myAddress}/>}




        </div>






    );


}

export default MyNftPage;
