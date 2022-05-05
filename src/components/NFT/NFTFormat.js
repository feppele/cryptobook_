import classes from './NFTFormat.module.css';
import herz from '../../images/herz.png';
import ethereum from '../../images/ethereum.png';
import {NFTContract,NFTContractAddress} from '../../web3/NFTContract';
import {useHistory} from 'react-router-dom';
import {getOptions} from '../../node/databank';
import {useState,useEffect} from 'react';
import redHerz from '../../images/redherz.png';
import blackHerz from '../../images/backherz.png';
import MiniButton from '../standart/MiniButton';
import {getNFTLikes,likeNFT,dislikeNFT,doILike} from '../../node/NFTLikes';


function NFTFormat(props){

    const history =useHistory();

    const [NFTLikes,setNFTLikes]= useState(0);
    const [iLike,setILike]= useState(false);
    const [user,setUser]= useState();


    function openThisNFTPage(){
        history.push({
            pathname:"/thisNFT/"+props.tokenId,
        });
    }

    // like, dislike
    function likeNFTFunc(){
        likeNFT(props.tokenId);
        setILike(true);
        setNFTLikes(parseInt(NFTLikes)+1);

    }
    function dislikeNFTFunc(){
            dislikeNFT(props.tokenId);
        setILike(false);
        setNFTLikes(parseInt(NFTLikes)-1);
    }


    // getNFTLikes  doILike?   setUser
    useEffect(()=>{
        if(props.tokenId !== undefined){

            getNFTLikes(props.tokenId).then(res => {
                console.log(res)
                setNFTLikes(res);
            });

            doILike(props.tokenId).then(res =>{
                if(!res){
                    setILike(false);
                }else{
                    setILike(true);
               }
            });
        }
        window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{setUser(currentUsers[0])});

    },[props])



    return (

        <div className={classes.container} >

            {/*NFT IMAGE */}
            <img src={props.imageURL} className={classes.NFTimage} onClick={openThisNFTPage}></img>
            {/*NFT IMAGE */}
            <div className={classes.bottom}>

                <div className={classes.nameAndFrom}> {props.imageName}</div>
                <div className={classes.nameAndNumber}>{"#"+props.tokenId}</div>


            </div>

            <div className={classes.bottom2}>

            <img src={ethereum} className={classes.ethereum}></img>

                <div className={classes.likesWrapper}>

                { !iLike &&  <MiniButton onButtonClicked={likeNFTFunc} img={blackHerz} popupText={"like"}/>  }
                { iLike  &&   <MiniButton onButtonClicked={dislikeNFTFunc} img={redHerz} popupText={"dislike"}/>  }

                    <div className={classes.numberlikes}> {NFTLikes} </div>
                </div>



            </div>


        </div>

    );
}

export default NFTFormat;