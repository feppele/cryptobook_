import {UserContract} from './UserContract';
import { useHistory } from "react-router-dom";




// load Frieds
async function loadFriendsEasy(){

    const address = await window.ethereum.request({method: 'eth_accounts'});

    const friends = await UserContract.methods.getFriendsFrom(address[0]).call();

    return await friends;
}



// load Frieds
async function loadFriends(){
    const accounts =  await window.ethereum.request({method: 'eth_accounts'});
    var user = accounts[0];

    await UserContract.methods.getFriendsFrom(user).call().then(result =>{
        console.log(result)

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

// getShortAddress
async function getAddress2(){
    const accounts =  await window.ethereum.request({method: 'eth_accounts'});
    var address = accounts[0];
    var addrShort = shortAddr(address);
    window.localStorage.setItem("myAddress",address);
}


async function getAddress(){

    window.localStorage.setItem("myAddress",window.web3.currentProvider.selectedAddress);
}




async function isMetaMaskConnected() {
    const accounts = await window.ethereum.request({method: 'eth_accounts'});
    return accounts.length;

}


async function onLoad(){
    console.log("onLoad");

    if(! await isMetaMaskConnected()){
        localStorage.clear();
        window.open("/","_self")
        return;
    }else{
        await loadFriends();
        await getAddress();
        return;
    }

}

window.ethereum.on('accountsChanged',  async ()=>{

        // Bei Einlogg und bei komplett ausloggen wird auch aufgerufen. (jeder Acc Wechsel)!!

        if(! await isMetaMaskConnected()){
            // Beim ausloggen auf startseite zurück
            localStorage.clear();
            window.open("/","_self");
            return;
        }else{
            await localStorage.clear();
            await loadFriends();
            await getAddress();
            window.open("/home","_self")
            //await window.location.reload();
            return;

        }



});



export{onLoad};
export {loadFriends};
export {shortAddr};
export {getAddress};

export{loadFriendsEasy};