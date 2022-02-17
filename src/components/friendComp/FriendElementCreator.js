import FriendElement from './FriendElement'
import {loadFriends,shortAddr} from '../../web3/LoadingFunctions.js';

function FriendElementCreator(props){


    

    return  props.friends.map(

        friend => <FriendElement friendName={friend.friend_name} addr={shortAddr(friend.friend_addr)} longAddr={friend.friend_addr} />

    )

}

export default FriendElementCreator;