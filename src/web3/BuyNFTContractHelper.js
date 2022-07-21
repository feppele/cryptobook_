

import {BuyNFTContract,BuyNFTContractAddress} from './BuyNFT'
import {getPreisOfNFT,buyOffChainNFT_deleteCreator} from '../node/NFTData'
import {buyTokenOffInfura,buyTokenOnInfura} from './SendEtherInfura'

import {_web3} from '../web3/Web3'
var web3 = _web3.mcbWallet
const userdata = JSON.parse(sessionStorage.getItem("userdata"))
if(userdata !== null){
    userdata.metamask === true ? web3 = _web3.metamask : web3 = _web3.mcbWallet
}

async function buyNFTOff(metadataURI,tokenId,seller){
    const userdata = JSON.parse(sessionStorage.getItem("userdata"))
    const _from = userdata.address
    const _metadataURI =metadataURI;
    const _tokenId =tokenId;
    const _seller =seller;
    const _preis = await getPreisOfNFT(tokenId); // get preis from db

    if(_preis ===""){return}

    if(userdata.metamask === true){// Metamask
        BuyNFTContract.methods.buyTokenOff(_metadataURI,_tokenId,_seller).send({from:_from, value: web3.utils.toWei(_preis,"ether")}).then(console.log).catch(console.log);
    }else{ // MCB Wallet
        buyTokenOffInfura(userdata.privatekey, _from,_metadataURI,_tokenId,_seller,_preis) //from,_metadataURI,_tokenId,_seller,_preis
    }
    


}


async function buyNFTOn(tokenId,seller,creator){

    const userdata = JSON.parse(sessionStorage.getItem("userdata"))
    const _from = userdata.address
    const _tokenId =tokenId;
    const _seller =seller;
    const _creator =creator;

    const _preis = await getPreisOfNFT(tokenId); // get preis from db
    if(_preis ===""){return}

    if(userdata.metamask === true){// Metamask
        BuyNFTContract.methods.buyTokenOn(_seller,_tokenId,_creator).send({from:_from, value: web3.utils.toWei(_preis,"ether") }).then(console.log).catch(console.log);
    }else{ // MCB Wallet
        buyTokenOnInfura(userdata.privatekey, _from,_tokenId,_seller,_creator,_preis) //from,_tokenId,_seller,_preis
   }


}



export{buyNFTOff}
export{buyNFTOn}