import {UserContract} from './UserContract';
import { useHistory } from "react-router-dom";




// load Frieds
async function loadFriendsEasy(){
    if(!window.ethereum){return}
    const address = await window.ethereum.request({method: 'eth_accounts'});

    const friends = await UserContract.methods.getFriendsFrom(address[0]).call();

    return await friends;
}



// load Frieds
async function loadFriends(){
    if(!window.ethereum){return}
    const accounts =  await window.ethereum.request({method: 'eth_accounts'});
    var user = accounts[0];

    await UserContract.methods.getFriendsFrom(user).call().then(result =>{
    
        var friends =[];
        for(var i=0;i<result.length;i++){

            let tuple = [result[i].friend_addr.toString(),result[i].friend_name.toString()];
            friends.push(tuple);
        }

        if(friends.length>0){

            localStorage.setItem('friends', JSON.stringify(friends));
            return "mehr als null freunde";
        }else{
            return "null return";
            //localStorage.clear();
        }
    });

    return "das return ich eh";
}


// short Address
function shortAddr(address){
    var addrShort;
    addrShort =  address.toString().slice(0,6) + "..."+address.toString().slice(38,44);
    return addrShort;
}




// async function getAddress(){

//     window.localStorage.setItem("myAddress",window.web3.currentProvider.selectedAddress);
// }




async function isMetaMaskConnected() {
    if(!window.ethereum){return}
    const accounts = await window.ethereum.request({method: 'eth_accounts'});
    return accounts.length;

}


// async function onLoad(){
//     console.log("onLoad");

//     if(! await isMetaMaskConnected()){
//         localStorage.clear();
//         window.open("/","_self")
//         return;
//     }else{
//         await loadFriends();
//         await getAddress();
//         return;
//     }

// }

if(window.ethereum){


    window.ethereum.on('accountsChanged',  async ()=>{

            // Bei Einlogg und bei komplett ausloggen wird auch aufgerufen. (jeder Acc Wechsel)!!

            if(! await isMetaMaskConnected()){
                // Beim ausloggen auf startseite zurück
                window.open("/","_self");
                return;
            }else{

                window.open("/home","_self")
                //await window.location.reload();
                return;

            }



    });
}


//export{onLoad};
export {loadFriends};
export {shortAddr};
//export {getAddress};

export{loadFriendsEasy};