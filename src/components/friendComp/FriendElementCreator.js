import FriendElement from './FriendElement'
import {loadFriends,shortAddr} from '../../web3/LoadingFunctions.js';

function FriendElementCreator(props){

  
    console.log(props.friends)

    return  props.friends.map(

        friend => <FriendElement friendName={friend.friend_name} addr={shortAddr(friend.friend_addr)} longAddr={friend.friend_addr} saveFriend={friend.blockchain}/>

    )

}

export default FriendElementCreator;