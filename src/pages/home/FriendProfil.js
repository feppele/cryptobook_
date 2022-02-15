import classes from './FriendProfil.module.css';

import {useParams} from 'react-router-dom';
import {useState,useEffect} from 'react'

import FriendProfilData from '../../components/friendProfil/FriendProfilData';
import FriendsNFTs from '../../components/friendProfil/FriendsNFTs';
import {onLoad,loadFriendsEasy} from '../../web3/LoadingFunctions';
import {web3} from '../../web3/Web3';

function Profil(){

    //onLoad();

    // get Address from visiting profile from URL
    const {address} = useParams();
    //this is name an address from Friend/NotFriend: person.friend_addr and person.friend_name
    const[person,setPerson] =useState();
    const[personSet,setPersonSet]=useState(false);
    // is set when address from URL is friend
    const[isFriend,setIsFriend]=useState(false);




    async function checkIfFriend(){

        // get all friends Addresse
        const friends = await loadFriendsEasy();

        console.log(friends);

        for(var i=0;i<friends.length;i++){

            if(address === friends[i].friend_addr){

                setIsFriend(true);
                setPerson(friends[i]);
                setPersonSet(true);
                return;

            }
            //das ende von array abwarten und dann Nicht Freund setzten!
            if(i === friends.length-1){
                setPerson({friend_name:"unnamed", friend_addr: address});
                setPersonSet(true);
                return;
            }

        }
    }

    useEffect(()=>{
        checkIfFriend();
    },[])



    if(!web3.utils.isAddress(address)){
        return <div className={classes.unvalid}> Unvaild Address</div>;
    }

    return (

        <div className={classes.container}>

           {personSet && <FriendProfilData personData={person} isFriend={isFriend}/> }
            {personSet && <FriendsNFTs personData={person}/>}

        </div>





    );


}

export default Profil;