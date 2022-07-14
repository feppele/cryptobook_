
import {fetchi} from '../globalData'
//const fetchi ="https://backendserverreact.azurewebsites.net"

function query(_methode,_ele){

    const params = {
      methode: _methode,
      ele: _ele
  };
  const options = {
      method: 'POST',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify( params )
  };
  fetch(fetchi+ "/databank",options)
  .then(res => {return res.json()}).then(console.log)
}


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



function getNFTLikesOptions(tokenId){
  
  return getOptions("getNFTLikes",{tokenId: tokenId})
}

function likeNFTOptions(tokenId){

  return getOptions("likeNFT",{tokenId: tokenId})
}

function dislikeNFTOptions(tokenId){

  return getOptions("dislikeNFT",{tokenId: tokenId})
}


function followUser(useraddress){
  window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
      fetch(fetchi+ "/databank",getOptions("follow",{person: useraddress.toLowerCase(),follower: currentUsers[0].toLowerCase()} )).catch(console.log);
  })
}

function unfollowUser(useraddress){
  window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
      fetch(fetchi+ "/databank",getOptions("unfollow",{person: useraddress.toLowerCase(),follower: currentUsers[0].toLowerCase()} )).catch(console.log);
  })
}



// on Load get name from databank
async function loadNameFromDB2(address){

  const options=getOptions("find",{address: address });
  return await fetch(fetchi+ "/databank",options).then(res => { return res.json()}).then(res=>{

      if(res[0].length > 0){
        return {friend_name: res[0][0].name, friend_addr: address, blockchain: false};
      }else{
        return {friend_name: "unnamed", friend_addr: address, blockchain: false};
      }
  })
}



export async function addPublicKeyToDB(address){

  //const currentUser = await window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{return currentUsers[0]})
  // This should just happen at the first login, so check if already happend:
  if( await checkPublicKeyExists(address)){
    console.log("Public KEy exists")
    return
  }

  const publicKey = await window.ethereum.request({
    method: 'eth_getEncryptionPublicKey',
    params: [address], // you must have access to the specified account
  })
  .then(res=>{return res})

  fetch(fetchi+ "/databank",getOptions("addPublicKeyToDB",{address: address.toLowerCase(),key: publicKey} )).catch(console.log);

}

export async function checkPublicKeyExists(address){
  const count = await fetch(fetchi+ "/databank",getOptions("checkPublicKeyExists",{address: address.toLowerCase()} )).then(res => {return res.json()}).then(res=>{return res[0][0].count})
  // if !==0 ==> EXISTS
  console.log("COUNT:" +count)
  return count !== '0'

}

export async function getPublicKey(address){

  if(address !=="me"){
    address = await window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{return currentUsers[0]})
  }
  const key = await fetch(fetchi+ "/databank",getOptions("getPublicKey",{address: address.toLowerCase()} )).then(res => {return res.json()}).then(res=>{return res[0]})

  if(key.length === 0 ){
    return undefined
  }else{
    return key[0].key
  }
}


export{loadNameFromDB2}
export{unfollowUser};
export{followUser};
export{getOptions};
export{queryFetch};
export{query};