import FriendElement from './FriendElement'
import {loadFriends,shortAddr} from '../../web3/LoadingFunctions.js';

function FriendElementCreator(){

    loadFriends();
    var friends = JSON.parse(localStorage.getItem('friends'));
    if(friends === null){
        return null;
    }

    return  friends.map(

        friend => <FriendElement friendName={friend[1]} addr={shortAddr(friend[0])} longAddr={friend[0]} />

    )

}

export default FriendElementCreator;