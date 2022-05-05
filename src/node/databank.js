

const fetchi ="https://backendserverreact.azurewebsites.net"

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
  window.location.reload(false);
}

function unfollowUser(useraddress){
  window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
      fetch(fetchi+ "/databank",getOptions("unfollow",{person: useraddress.toLowerCase(),follower: currentUsers[0].toLowerCase()} )).catch(console.log);
  })
  window.location.reload(false);
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


export{loadNameFromDB2}
export{unfollowUser};
export{followUser};
export{getOptions};
export{queryFetch};
export{query};