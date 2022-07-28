import {sha256, sha224 } from 'js-sha256';
import React, {useState,useEffect} from 'react';
import{uploadNFTImageToServer} from '../../../node/images'
//IPFS and Blockchain Functions
import {ipfsUpload,createNFT} from './IPFSandNFTFunctions';
import {createCollection,getMyCollections,doesCollectionExist,getNFTInfoFromTokenId,createNFTInfo,getAllTokenIdFromCollection,setPreisOfNFT} from '../../../node/NFTData'
import { BigNumber } from "bignumber.js";


function getTokenIdFromMeta(meta){
    var sha = sha224(meta)
    return sha
}



async function createNFTOnAndOff(metaData,imageFile,itemName,searchTearms,collection,offchain,preis){

    //IPFS upload
    const metaDataURL = await ipfsUpload(metaData,imageFile);
    //console.log("URL RETURN :" +metaDataURL);

    // New Feature: create TokenId from metaDataURL
    const meta = metaDataURL.substring(metaDataURL.lastIndexOf("/")+1,300);
    var tokenIdMeta = getTokenIdFromMeta(meta);

    tokenIdMeta = "0x"+tokenIdMeta.slice(0,30)
    var bignumber = new BigNumber(tokenIdMeta, 16);
    tokenIdMeta= bignumber.toString(10)

    //console.log(tokenIdMeta)

    // Upload image to Server with tokenID
    uploadNFTImageToServer(imageFile,tokenIdMeta);

    // upload to collection database
    if(collection !== ""){
        await createCollection(collection);
    }
    // upload to NFT Info db
    await createNFTInfo(tokenIdMeta,itemName,searchTearms,collection,metaDataURL);

    setPreisOfNFT(tokenIdMeta,preis)

    if(offchain==="offchainCreate"){
        console.log("create offchain")
    }else{
        console.log("onchain")
        //create NFT with metadata return from IPFS upload
        return await createNFT(metaDataURL,tokenIdMeta); 
    }

    return tokenIdMeta;
    //return {txhash:response[0],tokenId:tokenIdMeta}
}


export{getTokenIdFromMeta}
export{  createNFTOnAndOff}