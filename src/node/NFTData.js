import {getCurrentUser} from '../web3/HelperFunctions'

//const fetchi ="https://backendserverreact.azurewebsites.net"
import {fetchi} from '../globalData'

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

async function highestTokenId(){

    const ele = {};
    const options = getOptions("highestTokenId",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0][0].max});;
}

async function getAllSingles(){

    const ele = {};
    const options = getOptions("getAllSingles",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0]});;
}


async function getTokenIdFromSearch(find){

    const ele = {find:find};
    const options = getOptions("getTokenIdFromSearch",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{
        var array =[]
        res[0].forEach(ele=>{array.push(ele.tokenid)})
        return array

    });;
}


async function getAllCollections(){

    const ele = {};
    const options = getOptions("getAllCollections",ele);

    return await fetch(fetchi+ "/databank",options).then(res => {return res.json()}).then(res =>{return res[0]});;
}

async function searchCollections(find){

    const ele = {find:find};
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
        creator = await window.ethereum.request({method: 'eth_accounts'});
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
export{getTokenIdFromSearch}
export{getAllCollections}
export{searchCollections}
export{getTokenURIDB}
export{getOffchainMetaData}
export{buyOffChainNFT_deleteCreator}
