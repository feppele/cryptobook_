import {getOptions} from './databank'

const fetchi = "https://backendserverreact.azurewebsites.net"

async function getNFTLikes(tokenId){

    const res = await fetch(fetchi+ "/databank",getOptions("getNFTLikes",{tokenId: tokenId}))
    .then(res => {return res.json()}).then(res=>{
        if(res==="error"){
            return 0;
        }
        return res[0][0].count;
    })

    console.log(res)
    return res;
}


async function likeNFT(tokenId){

    if(!window.ethereum){return}
    window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
        fetch(fetchi+ "/databank",getOptions("likeNFT",{tokenId: tokenId, address: currentUsers[0]} )).catch(console.log);
    })
}

async function dislikeNFT(tokenId){

    if(!window.ethereum){return}
    window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
        fetch(fetchi+ "/databank",getOptions("dislikeNFT",{tokenId: tokenId,address: currentUsers[0]})).catch(console.log);
    })

}

async function doILike(tokenId){

    if(!window.ethereum){return}
    const res = await window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
        const res2 =  fetch(fetchi+ "/databank",getOptions("doILike",{tokenId: tokenId, address: currentUsers[0] }))
        .then(res => {return res.json()}).then(res=>{
            if(res==="error" || res[0][0].count==="0"){
                return false;
            }else{
                return true;
            }
        })
        return res2;
    })
    return res;
}


export{getNFTLikes}
export{likeNFT}
export{dislikeNFT}
export{doILike}