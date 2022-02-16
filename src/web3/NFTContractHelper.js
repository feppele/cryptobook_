
import {NFTContract} from './NFTContract';


async function getTokenUri(tokenId){

    return await NFTContract.methods.tokenURI(tokenId).call();
}

async function getMetadataFromURI(uri,tokenId) {

    try{
        const response = await fetch(uri);
        const json = await response.json();
        return [json.image, json.name,tokenId];

    }catch(error){
        console.log('Error getMetadataFromURI in NFTContractHelper.js: ', error)

    }
}



async function getAllTokensMetadataArray(owner){

    try{
        if(owner ==="me"){
            owner = await window.ethereum.request({method: 'eth_accounts'});
            owner = owner[0];
        }
        // else wurde schon übergeben von FriendsElement

        const ownersTokenIds = await NFTContract.methods.ownersTokenIds(owner).call();
        var array =[];

        // wenn versendet wird und man 0 hat zeit er 0 an?? komisch :(
        if(ownersTokenIds[0] !== '0'){}

            // token ID ==> TokenURI ==> token Metadata ==> Token Metadata Lisa_____ hiten nochmal Id übergeben um mit in Metadata machen
            for(var i=0;i<ownersTokenIds.length;i++){
                array.push(await getMetadataFromURI(await getTokenUri(ownersTokenIds[i]),ownersTokenIds[i] ) );
            }
        
        console.log("in console.log(array); LÄNGE ARRAY::    "+ array.length );
        console.log(array);
        return array;

    }catch(error){
        console.log("Error getAllTokensMetadataArray() : ", error);
    }
}


async function getOwnerOfTokenId(tokenId){

    return await NFTContract.methods.ownerOf(tokenId).call();
}


async function sendNFT(to,tokenId){

    const _from = await window.web3.currentProvider.selectedAddress;
    const _to =to;
    const _tokenId =tokenId;


NFTContract.methods.transferFrom(_from,_to,_tokenId).send({from:_from}).then(console.log).catch(console.log);



}





export{getTokenUri};
export{getMetadataFromURI};
export{getAllTokensMetadataArray};
export{getOwnerOfTokenId};
export{sendNFT};