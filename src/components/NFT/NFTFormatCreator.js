import classes from './NFTFormatCreator.module.css';
import NFTFormat from './NFTFormat';
import {NFTContract,NFTContractAddress} from '../../web3/NFTContract';
import {getTokenUri,getMetadataFromURI} from '../../web3/NFTContractHelper';
import {useState,useEffect} from 'react';
import {getAllTokensMetadataArray} from '../../web3/NFTContractHelper';

function NFTFormatCreator(props){
    var key =1;


    return  props.metadataArray.map(

        element =>  <NFTFormat key={key++} imageURL={element[0]} imageName={element[1]} tokenId={element[2]}/> 

    )


}

export default NFTFormatCreator;