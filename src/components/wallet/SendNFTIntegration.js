import classes from './SendNFTIntegration.module.css';
import FriendListElement from '../PopupFenster/FriendListElement';
import {useState} from 'react';
import {getAllFriends,getAllFriendsPromise} from '../../web3/GetAllFriends';
import {sendNFT} from '../../web3/NFTContractHelper';
import ApprovalView from './ApprovalView'





function SendNFTIntegration(props){

    const [allFriends,setAllFriends]= useState([])
    const [txObj,setTxObj] = useState(false)


    getAllFriendsPromise().then(res => {setAllFriends(res)});

    // function is triggert from Friend Element
    async function send(friend_addr,tokenId){
        // returns false if metamask Send. So if True MCB Wallet send
        const tx = await sendNFT(friend_addr,tokenId);
        if(tx){
            console.table(tx.raw)
            console.table(tx)

            setTxObj(tx)
        }

    }



    return (

    <div style={{width:'100%',justifyContent: 'center',display: 'flex'}}>

        { txObj && <ApprovalView closeWalletFunc={props.closeWalletFunc} type="send NFT" tx={txObj}  />  }
        { !txObj &&
        <div className={classes.integration}>

            <div>{props.text}</div>

            <div className={classes.list}>
                {allFriends.map(item => <FriendListElement send={send} closeSendModal={props.onCloseClick} friendItem={item}  tokenId={props.tokenId}  />   )}
            </div>
        </div>
        }
    </div>
    );


}

export default SendNFTIntegration;