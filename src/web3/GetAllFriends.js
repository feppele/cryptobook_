

import {loadFriendsEasy} from './LoadingFunctions';
import {getOptions} from '../node/databank'

async function getAllFriends(){

    const ans = await blockchainFriends().then(res => {return res}).then(blockchainFriends=>{

        const concatFriends = followFriends().then(res => {return res}).then(followfriends=>{

            return [].concat(blockchainFriends,followfriends);
        });

        return concatFriends;
    });

    return ans;
}



async function followFriends(){


        // load Follow Friends
        const ans = await fetch("/databank",getOptions("WHOdoIFollow",{me: window.web3.currentProvider.selectedAddress.toLowerCase()}))
        .then(res => {return res.json()})
        .then(res=>{
            var followFriends= res[0];
            var newFormatFollow =[];
            for(var i=0;i<followFriends.length; i++){
                var username;
                if(followFriends[i].name === null){
                    username="unnamed";
                }else{
                    username=followFriends[i].name;
                }
                newFormatFollow.push( {friend_name: username,friend_addr: followFriends[i].person ,blockchain : false} );
            }
            return(newFormatFollow);
        }).then(newFormatFollow=>{return newFormatFollow})

return ans;
}// followFriends




async function blockchainFriends(){

    const ans = await loadFriendsEasy().then(friendsLoad=>{

        var newFormat = [];
        // Set a new Dataformat with blockchain= true :  Array- Item:  {friend_name   ,   friend_addr  ,    blockchain:true    }
        for(var j=0;j<friendsLoad.length; j++){
            newFormat.push( {friend_name: friendsLoad[j].friend_name, friend_addr: friendsLoad[j].friend_addr, blockchain:true} );
        }
        return(newFormat);
    })

    return ans;

}

export{followFriends}
export {getAllFriends}
export{blockchainFriends}