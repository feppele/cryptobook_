import {getOptions} from './databank'

import {getCurrentUser} from '../web3/HelperFunctions'




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
            fetch("/images/profile/" + userAddress + types[0] ).then(res =>{ if(res.status === 200){return ("/images/profile/"+ userAddress + types[0])}   }),
            fetch("/images/profile/" + userAddress + types[1] ).then(res =>{ if(res.status === 200){return ("/images/profile/"+ userAddress + types[1])}   }),
            fetch("/images/profile/" + userAddress + types[2] ).then(res =>{ if(res.status === 200){return ("/images/profile/"+ userAddress + types[2])}   })
        ]).then(result=>{

            var resultArray =[]
            for ( var a of result){
                if( a !== undefined ){ resultArray.push(a)}
            }
            return resultArray;
        })
        return result;

}






export {getProfilePicURL}