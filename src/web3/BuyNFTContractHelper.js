

import {BuyNFTContract,BuyNFTContractAddress} from './BuyNFT'

import {getPreisOfNFT,buyOffChainNFT_deleteCreator} from '../node/NFTData'


const Web3 =require('web3');
//const web3 = new Web3('https://ropsten.infura.io/v3/13185221b99744cda86c46e02a3ded8f');
const web3 = new Web3(window.ethereum);

async function buyNFT(metadataURI,tokenId,seller){

    const _from = await window.web3.currentProvider.selectedAddress;
    const _metadataURI =metadataURI;
    const _tokenId =tokenId;
    const _seller =seller;



    const _preis = await getPreisOfNFT(tokenId); // get preis from db

    if(_preis ===""){return}


    BuyNFTContract.methods.buyToken(_metadataURI,_tokenId,_seller).send({from:_from, value: web3.utils.toWei(_preis,"ether")}).then(console.log).catch(console.log);

}

export{buyNFT}