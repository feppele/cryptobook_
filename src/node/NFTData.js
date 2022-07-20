import {getCurrentUser} from '../web3/HelperFunctions'

import {fetchi} from '../globalData'
import {getOwnerOfTokenId} from '../web3/NFTContractHelper'
import {NFTContract} from '../web3/NFTContract';

function getOptions(_methode,_ele){

    const params = {
        methode: _methode,
        ele: _ele
    };
    const options = {
        method: 'POST',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify( params )
    };
  return options;
}

async function queryFetch(options){

  fetch(fetchi+ "/databank",options)
  .then(res => {return res.json()}).catch(console.log)

}


// 4 Collection Functions
async function createCollection(collection){

    const creator = await getCurrentUser();
    const ele = {collection: collection, creator: creator};
    const options = getOptions("createCollection",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()});
}

// return array [{collection:},{collection:}] if none return []
async function getMyCollections(){

    const creator = await getCurrentUser();
    const ele = {creator: creator};
    const options = getOptions("getMyCollections",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res=>{return res[0]});
}


// not exsist return 0 exists return 1
async function doesCollectionExist(collection){

    const ele = {collection: collection};
    const options = getOptions("doesCollectionExist",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res=>{return res[0].length});
}

//return 0x123123
async function getCretorFromCollection(collection){

    const ele = {collection: collection};
    const options = getOptions("getCretorFromCollection",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res=>{return res[0][0].creator});
}


//  NFT INFO Functions
async function createNFTInfo(tokenId,name,searchTearms,collection,metaDataURL){

    const creator = await getCurrentUser();
    const ele = {tokenId:tokenId, name:name, find:searchTearms, collection:collection, creator:creator,metaDataURL:metaDataURL};
    const options = getOptions("createNFTInfo",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()});
}


//no items return [] else [{tokenid:},{tokenid:}...]
async function getAllTokenIdFromCollection(collection){

    const ele = {collection:collection};
    const options = getOptions("getAllTokenIdFromCollection",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0]});
}

async function getNFTInfoFromTokenId(tokenId){

    const ele = {tokenId:tokenId};
    const options = getOptions("getNFTInfoFromTokenId",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()});
}

// get Owner of TOkenid Doesnt matter if on or offchain!
async function getOwnerFromTokenId(tokenId){

    const info = await getNFTInfoFromTokenId(tokenId)
    const creator = info[0][0].creator

    //get Owner from Blockchain. if no owner, owner = creator, because Offchain NFT
    const owner = await getOwnerOfTokenId(tokenId)
    if (owner === "error"){
        return creator
    }else{
        return owner
    }

}



async function highestTokenId(){

    const ele = {};
    const options = getOptions("highestTokenId",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0][0].max});;
}

async function getAllSingles(limit,offset){

    const ele = {limit:limit,offset:offset};
    const options = getOptions("getAllSingles",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0]});;
}



async function getTokenIdFromSearchLimit(find,limit,offset){

    const ele = {find:find,limit:limit,offset:offset};
    const options = getOptions("getTokenIdFromSearchLimit",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0]});;

}


async function getAllCollections(limit,offset){

    const ele = {limit:limit,offset:offset};
    const options = getOptions("getAllCollections",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0]});;
}

async function getAllCollectionsOfPerson(person,limit,offset){

    const ele = {person:person,limit:limit,offset:offset};
    const options = getOptions("getAllCollectionsOfPerson",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0]});;
}

async function searchCollections(find,limit,offset){

    const ele = {find:find,limit:limit,offset:offset};
    const options = getOptions("searchCollections",ele);
    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0]});;
}

async function searchCollectionsOfPerson(person,find,limit,offset){

    const ele = {person:person,find:find,limit:limit,offset:offset};
    const options = getOptions("searchCollections",ele);
    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0]});;
}



async function getTokenURIDB(tokenId){

    const ele = {tokenId:tokenId};
    const options = getOptions("getTokenURI",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0][0].metaurl});;
}


async function getOffchainMetaData(creator){

    if(creator ==="me"){
        creator = JSON.parse(sessionStorage.getItem("userdata")).address
        creator = creator[0];
    }

    creator = creator.toLowerCase();

    console.log(creator);

    const ele = {creator:creator};
    const options = getOptions("getOffchainMetaData",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0]});;
}


async function buyOffChainNFT_deleteCreator(tokenId){

    const ele = {tokenId:tokenId};
    const options = getOptions("buyOffChainNFT_deleteCreator",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0]});;
}


// price______________________________

async function setPreisOfNFT(tokenId,preis){

    const ele = {tokenId:tokenId,preis:preis};
    const options = getOptions("setPreisOfNFT",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0]});;
}

async function getPreisOfNFT(tokenId){

    const ele = {tokenId:tokenId};
    const options = getOptions("getPreisOfNFT",ele);

    try{
        return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0][0].preis});;
    }catch(err){
        return "-";
    }
}

// return 
async function getAllMyTokenIDs_On_Off_chain(from){

    var onChainTokenIDs = NFTContract.methods.ownersTokenIds(from).call();

    var offChainTokenIDs = getOffchainMetaData(from);

    // onChain on Offchain can Load simultanously
    const result = await Promise.allSettled([onChainTokenIDs,offChainTokenIDs])
    onChainTokenIDs = result[0].value
    offChainTokenIDs = result[1].value

    onChainTokenIDs = onChainTokenIDs.map(ele => ele) // anders gehts nicht, kp warum
    console.log(onChainTokenIDs)
    offChainTokenIDs = offChainTokenIDs.map(ele => ele.tokenid)
    console.log(offChainTokenIDs)

    //add onChainTokenIDs +offChainTokenIDs together. But check before if onchain is still in offchain array
    //offchains werden in nftinfo anhand von 'creator' erkannt. nach verkauf gehört offchaini nicht mehr mir also wird erst gecheckt ob die gleiche tokenId ein onchani ist
    //wenn onchani wird er nicht hinzugefügt
    // wenn ich ein offchani erstelle und verkauft ist es ein onchani aber ich bin trotzdem noch in der DB creator also gibt getOffchainMetaData() es weiter hinzurück

    //check if offchaini is really offchai by checking if offchani has an owner on blockchain
    // this happens when i create offline and sell it. then I am still creator and getOffchainMetaData() says its still mine

    // if has owner: owner=owneraddress. Else owner = "error"
    var promisearray = []
    offChainTokenIDs.forEach(ele=>{
        promisearray.push( getOwnerOfTokenId(ele) )
    })

    var onwers = await Promise.allSettled(promisearray)
    onwers = onwers.map(ele => ele.value)
    console.log(onwers)

    for(var i=0;i<offChainTokenIDs.length;i++){
        const add = offChainTokenIDs[i]

        if(onwers[i] ==="error" ){
            if(onChainTokenIDs.every(ele => ele !==add)){ // ist nicht enhalten return true
                onChainTokenIDs.push(add)
            }
        }
    }
    const allIDs = onChainTokenIDs
    return allIDs
}


export{setPreisOfNFT}
export{getPreisOfNFT}

export{getNFTInfoFromTokenId}
export{createNFTInfo}
export{getAllTokenIdFromCollection}
export{getAllSingles}

export{createCollection}
export{getMyCollections}
export{doesCollectionExist}
export{getCretorFromCollection}
export{highestTokenId}
export{getAllCollections}
export{searchCollections}
export{getTokenURIDB}
export{getOffchainMetaData}
export{buyOffChainNFT_deleteCreator}


export {getOwnerFromTokenId}


export{getTokenIdFromSearchLimit}

export {getAllMyTokenIDs_On_Off_chain}

export{getAllCollectionsOfPerson}
export{searchCollectionsOfPerson}