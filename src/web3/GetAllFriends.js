

import {loadFriendsEasy} from './LoadingFunctions';
import {getOptions} from '../node/databank'


const fetchi = "https://backendserverreact.azurewebsites.net"

// return [{friend_name:String, friend_addr:String, blockchain:Boolean} ]
async function getAllFriendsPromise(){

    const res = await Promise.all([
        blockchainFriends(),
        followFriends()
    ]).then(messages => {
        return [].concat(messages[0],messages[1]);
    })
    return res;
}


async function followFriends(){
    if(!window.ethereum){return}



    const ans = await window.ethereum.request({method: 'eth_accounts'}).then(accounts => {


        // load Follow Friends
        const answer = fetch(fetchi+"/databank",getOptions("WHOdoIFollow",{me:  accounts[0].toLowerCase()}))
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

    return answer;
    })

return ans;
}// followFriends




async function blockchainFriends(){
    if(!window.ethereum){return}

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
export{blockchainFriends}
export{getAllFriendsPromise}