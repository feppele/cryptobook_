import {getOptions} from './databank'
import {getCurrentUser} from '../web3/HelperFunctions'

const fetchi ="https://backendserverreact.azurewebsites.net"


// returns ["imageURL"], if no pic rteurns [] empty array
async function getProfilePicURL(user){

    var userAddress;
    if(user === "me"){
        userAddress = await getCurrentUser();
    }else{
        userAddress = user;
    }

    const types = [".png",".jpeg",".jpg"]
    const result = Promise.all([
        fetch(fetchi+ "/images/profile/" + userAddress + types[0] ).then(res =>{ if(res.status === 200){return (fetchi+"/images/profile/"+ userAddress + types[0])}   }),
        fetch(fetchi+ "/images/profile/" + userAddress + types[1] ).then(res =>{ if(res.status === 200){return (fetchi+"/images/profile/"+ userAddress + types[1])}   }),
        fetch(fetchi+ "/images/profile/" + userAddress + types[2] ).then(res =>{ if(res.status === 200){return (fetchi+"/images/profile/"+ userAddress + types[2])}   })
    ]).then(result=>{

        var resultArray =[]
        for ( var a of result){
            if( a !== undefined ){ resultArray.push(a) }
        }
        return resultArray;
    })
    return result;
}

// name in server is tokenId. jpg .png
function uploadNFTImageToServer (image,tokenId) {

    var imgType = image.type.substring(image.type.lastIndexOf("/")+1,1000);

    var blob = image.slice(0, image.size);
    var newImage = new File([blob], tokenId +"." + imgType);
    var formData = new FormData()
    formData.set('image',newImage)

    console.log(formData)

    fetch(fetchi+ '/uploadUserImage', {
                method: 'POST',
                body: formData
            }).then(console.log)

}

async function getNFTImageServerURL(tokenId){

    const types = [".png",".jpeg",".jpg"]
    const result = Promise.all([

        fetch(fetchi+ "/images/profile/" + tokenId + types[0] ).then(res =>{ if(res.status === 200){return (fetchi+"/images/profile/"+ tokenId + types[0])}   }),
        fetch(fetchi+ "/images/profile/" + tokenId + types[1] ).then(res =>{ if(res.status === 200){return (fetchi+"/images/profile/"+ tokenId + types[1])}   }),
        fetch(fetchi+ "/images/profile/" + tokenId + types[2] ).then(res =>{ if(res.status === 200){return (fetchi+"/images/profile/"+ tokenId + types[2])}   })

    ]).then(result=>{

        var resultArray =[]
        for ( var a of result){
            if( a !== undefined ){ resultArray.push(a)}
        }
        return resultArray;
    })
    return result;

}

export {getNFTImageServerURL}
export {uploadNFTImageToServer}
export {getProfilePicURL}