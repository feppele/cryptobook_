import {getOptions} from './databank'

//const fetchi = "https://backendserverreact.azurewebsites.net"
import {fetchi} from '../globalData'

import {setNotificationsToDB} from './NotificationManagement'
import {getOwnerFromTokenId} from './NFTData'

async function getNFTLikes(tokenId){

    const res = await fetch(fetchi+ "/databank",getOptions("getNFTLikes",{tokenId: tokenId}))
    .then(res => {return res.json()}).then(res=>{
        if(res==="error"){
            return 0;
        }
        return res[0][0].count;
    })
    return res;
}


async function likeNFT(tokenId){

    const userdata = JSON.parse(sessionStorage.getItem("userdata"))
    if(userdata === null || userdata === undefined){return}
    const currentUser = userdata.address

    fetch(fetchi+ "/databank",getOptions("likeNFT",{tokenId: tokenId, address: currentUser} )).catch(console.log);

    //get Owner of NFT that he can get a Notification
    const owner = await getOwnerFromTokenId(tokenId)

    await setNotificationsToDB("nftlike",currentUser.toLowerCase(),owner,tokenId)

}

async function dislikeNFT(tokenId){

    const userdata = JSON.parse(sessionStorage.getItem("userdata"))
    if(userdata === null || userdata === undefined){return}
    const me = userdata.address

    fetch(fetchi+ "/databank",getOptions("dislikeNFT",{tokenId: tokenId,address: me})).catch(console.log);


}

async function doILike(tokenId){

    const userdata = JSON.parse(sessionStorage.getItem("userdata"))
    if(userdata === null || userdata === undefined){return}
    const me = userdata.address


    const res2 =  fetch(fetchi+ "/databank",getOptions("doILike",{tokenId: tokenId, address: me }))
    .then(res => {return res.json()}).then(res=>{
        if(res==="error" || res[0][0].count==="0"){
            return false;
        }else{
            return true;
        }
    })
    return res2;

}


export{getNFTLikes}
export{likeNFT}
export{dislikeNFT}
export{doILike}