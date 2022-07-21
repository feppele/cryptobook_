import {getOptions} from './databank'
import {fetchi} from '../globalData'

async function follow(person){
    const currentUser = JSON.parse(sessionStorage.getItem("userdata")).address

    fetch( fetchi + "/databank",getOptions("follow",{person: person,follower: currentUser.toLowerCase()} )).catch(console.log);

    //also set to Notifications DB
    fetch( fetchi + "/databank",getOptions("setNotification",{notification:'follow', von:currentUser.toLowerCase(), zu:person,nft:''} )).catch(console.log);
}

async function unfollow(person){
    const currentUser = JSON.parse(sessionStorage.getItem("userdata")).address

    fetch(fetchi + "/databank",getOptions("unfollow",{person: person,follower: currentUser.toLowerCase()} )).catch(console.log);


}


export {follow,unfollow}