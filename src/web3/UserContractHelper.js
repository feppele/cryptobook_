import {loadFriendsEasy} from '../web3/LoadingFunctions';




   // if no return false, if ture return his name
    async function checkIfBlockchainFriend(friendAddr){
        if(!window.ethereum){return}
        // get all blockchain friends Addresse
        const friends = await loadFriendsEasy();


        if(friends.length ===0 ){

            return false;
        }

        for(var i=0;i<friends.length;i++){

            if(friendAddr === friends[i].friend_addr){
                return  {friend_name: friends[i].friend_name, friend_addr: friends[i].friend_addr, blockchain: true}
            }
            //das ende von array abwarten und dann Nicht Freund setzten!
            if(i === friends.length-1){
                return false;
            }
        }
    }



    export{checkIfBlockchainFriend}