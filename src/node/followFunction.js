import {getOptions} from './databank'
import {fetchi} from '../globalData'

async function follow(person){
    if(!window.ethereum){return}
    const currentUser = await window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{return currentUsers[0]})

    fetch( fetchi + "/databank",getOptions("follow",{person: person,follower: currentUser.toLowerCase()} )).catch(console.log);

    //also set to Notifications DB
    fetch( fetchi + "/databank",getOptions("setNotification",{notification:'follow', von:currentUser.toLowerCase(), zu:person,nft:''} )).catch(console.log);
}

async function unfollow(person){
    if(!window.ethereum){return}
    const currentUser = await window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{return currentUsers[0]})

    fetch(fetchi + "/databank",getOptions("unfollow",{person: person,follower: currentUser.toLowerCase()} )).catch(console.log);


}


export {follow,unfollow}