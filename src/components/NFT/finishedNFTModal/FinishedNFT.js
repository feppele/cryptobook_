import classes from './FinishedNFT.module.css';
import React, {useState,useEffect} from 'react';
import {NFTContract,NFTContractAddress} from '../../../web3/NFTContract';
import NFTFormatEasy from '../NFTFormatEasy';

import loaderGif from '../../../images/Loader.gif'

function FinishedNFT(props){

    var shortHash  =  props.txHash.toString().slice(0,6) + "..."+props.txHash.toString().slice(62,86);

    function openEtherScanTx(){
        window.open("https://etherscan.io/tx/" + props.txHash );
    }

    const[imageURL,setImageURL]= useState(false);
    const[imageName,setImageName]= useState(false);

    async function getTokenUri(tokenId){

        return await NFTContract.methods.tokenURI(tokenId).call();
    }

    // async function getMetadataFromURI(uri) {

    //     const response = await fetch(uri);
    //     const json = await response.json();

    //     setImageURL(json.image);
    //     setImageName(json.name);

    // }

    // async function go(){
    //     getMetadataFromURI( await getTokenUri(props.tokenId));
    // }
    // useEffect(()=>{go()});



    return (

        <div className={classes.container}>

            

            <NFTFormatEasy tokenId={props.tokenId}  />



            {/* DISCRIPTION Wrapper*/}
            <div className={classes.desriptionWrapper}>

                <div className={classes.textWrapper1}>
                    <div className={classes.info}>Token ID:  </div>
                    <div className={classes.info}>Transaction Hash:</div>

                </div>

                <div className={classes.textWrapper2}>
                    <div className={classes.info}> {props.tokenId}</div>
                    <div onClick={openEtherScanTx} className={classes.txHash}>{shortHash} </div>
                </div>

            </div>

        </div>


    );


}

export default FinishedNFT;
