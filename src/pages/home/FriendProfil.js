import classes from './FriendProfil.module.css';
import {useParams} from 'react-router-dom';
import {useState,useEffect} from 'react'
import FriendProfilData from '../../components/friendProfil/FriendProfilData';
import FriendsNFTs from '../../components/friendProfil/FriendsNFTs';
import {onLoad,loadFriendsEasy} from '../../web3/LoadingFunctions';
import {web3} from '../../web3/Web3';
import {getOptions} from '../../node/databank';
import {loadNameFromDB2} from '../../node/databank'
import {checkIfBlockchainFriend} from '../../web3/UserContractHelper'
import { useHistory } from "react-router-dom";


function Profil(){
    const history = new useHistory();
    useEffect(() => {
        if(!window.ethereum){
            history.push("/");
        }
    },[])


    // get Address from visiting profile from URL
    const {address} = useParams();

    console.log(address);
    //this is name an address from Friend/NotFriend: person.friend_addr and person.friend_name
    const[person,setPerson] =useState(true);
    const[personSet,setPersonSet]=useState(false);
    // is set when address from URL is friend
    const[isBlockchainFriend,setIsBlockchainFriend]=useState(false);


    useEffect(() => {

        // first check blockchainName!!
        checkIfBlockchainFriend(address).then(res =>{ // {friend_name,friend_addr,blochchain}


            if(!res){ // --> no block.friend
                console.log("no Blockchain Friend")

                loadNameFromDB2(address).then(res=>{   // {friend_name,friend_addr,blochchain}
                    console.log(res)
                    setPerson(res);
                    setPersonSet(true)
                });

            }else{ // is Blockchain Friend
                console.log("is Blockchain Friend")

                setIsBlockchainFriend(true);
                setPerson(res)
                setPersonSet(true)
            }
        });
    },[])



    if(!web3.utils.isAddress(address)){
        return <div className={classes.unvalid}> Unvaild Address</div>;
    }

    return (

        <div className={classes.container}>

           {personSet && <FriendProfilData personData={person} isFriend={isBlockchainFriend}/> }
            {personSet && <FriendsNFTs personData={person}/>}
        </div>
    );

}

export default Profil;