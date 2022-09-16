
import {NFTContract} from './NFTContract';

import {NFTContractAddress} from './NFTContract';
import {sendNFTInfura} from './SendEtherInfura'

async function getTokenUri(tokenId){

    return await NFTContract.methods.tokenURI(tokenId).call();
}

async function getAllMetadataFromURI(uri,tokenId) {

    try{
        const response = await fetch(uri);
        var edit = await response.json();
        edit.tokenId = tokenId
        edit.tokenUri = uri
        
        return await edit;

    }catch(error){
        console.log('Error getMetadataFromURI in NFTContractHelper.js: ', error)

    }
}

async function getMetadataFromURI(uri,tokenId) {

    try{
        const response = await fetch(uri);
        const json = await response.json();
        console.dir(json)
        return [json.image, json.name,tokenId];

    }catch(error){
        console.log('Error getMetadataFromURI in NFTContractHelper.js: ', error)

    }
}




// async function getAllTokensMetadataArray(owner){
//     try{
//         if(owner ==="me"){
//             owner = await window.ethereum.request({method: 'eth_accounts'});
//             owner = owner[0];
//         }
//         // else wurde schon übergeben von FriendsElement
//         const ownersTokenIds = await NFTContract.methods.ownersTokenIds(owner).call();
//         var array =[];
//         // wenn versendet wird und man 0 hat zeit er 0 an?? komisch :(
//         if(ownersTokenIds[0] !== '0'){}
//             // token ID ==> TokenURI ==> token Metadata ==> Token Metadata Lisa_____ hiten nochmal Id übergeben um mit in Metadata machen
//             for(var i=0;i<ownersTokenIds.length;i++){
//                 array.push(await getMetadataFromURI(await getTokenUri(ownersTokenIds[i]),ownersTokenIds[i] ) );
//             }
//         return array;
//     }catch(error){
//         console.log("Error getAllTokensMetadataArray() : ", error);
//     }
// }



async function getOwnerOfTokenId(tokenId){
    var owner;
   // try get owner from blockchain, if fail, return "error"
    try{
        owner = await NFTContract.methods.ownerOf(tokenId).call();
    }catch(err){
        owner ="error"
    }
    return owner.toLowerCase();
}


async function sendNFT(to,tokenId){

    const _to =to;
    const _tokenId =tokenId;


    // if Metamask is conncted userdata = {address} if MCB Wallet userdata={address,privkey,pubkey,....}
    const userdata = JSON.parse(sessionStorage.getItem("userdata"))
    if(userdata.metamask === true){// Metamask
        const _from = await window.web3.currentProvider.selectedAddress;
        NFTContract.methods.transferFrom(_from,_to,_tokenId).send({from:_from}).then(console.log).catch(console.log);
        return false // if metamask

    }else{// MCB Wallet

        return await sendNFTInfura(  userdata.address, _to, userdata.privatekey, _tokenId,"data","contractAddr"  ) //(from,to,privateKey,value)

    }
}








export{getTokenUri};
export{getMetadataFromURI};
//export{getAllTokensMetadataArray};

export{getOwnerOfTokenId};
export{sendNFT};


export{getAllMetadataFromURI};