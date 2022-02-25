import classes from './FinishedNFT.module.css';
import React, {useState,useEffect} from 'react';
import {NFTContract,NFTContractAddress} from '../../../web3/NFTContract';
import NFTFormatEasy from '../NFTFormatEasy';

import loaderGif from '../../../images/Loader.gif'

function FinishedNFT(props){

    //var shortHash  =  props.txHash.toString().slice(0,6) + "..."+props.txHash.toString().slice(62,86);

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


        </div>


    );


}

export default FinishedNFT;
