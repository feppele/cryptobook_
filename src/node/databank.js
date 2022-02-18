
//test:
//  query("add",{address:"0x15Db0F018209098e5e96FF68CB88F7080b65A841",username:"account4"});
//  query("find",{address:"0x15Db0F018209098e5e96FF68CB88F7080b65A841"});


  // methode: "find", "add".  ele= {address:address,username:username}
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
  fetch("/databank",options)
  .then(res => {return res.json()})
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

fetch("/databank",options)
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
      fetch("/databank",getOptions("follow",{person: useraddress.toLowerCase(),follower: currentUsers[0].toLowerCase()} )).catch(console.log);
  })
  window.location.reload(false);
}
function unfollowUser(useraddress){
  window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
      fetch("/databank",getOptions("unfollow",{person: useraddress.toLowerCase(),follower: currentUsers[0].toLowerCase()} )).catch(console.log);
  })
  window.location.reload(false);
}





export{unfollowUser};
export{followUser};
export{getOptions};
export{queryFetch};
export{query};