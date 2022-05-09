import classes from './NFTFormatEasyOnePage.module.css';
import herz from '../../images/herz.png';
import ethereum from '../../images/ethereum.png';
import offchainPic from '../../images/fokus.png';
import {NFTContract,NFTContractAddress} from '../../web3/NFTContract';
import {useHistory} from 'react-router-dom';
import {getOptions} from '../../node/databank';
import {useState,useEffect} from 'react';
import redHerz from '../../images/redherz.png';
import blackHerz from '../../images/backherz.png';
import MiniButton from '../standart/MiniButton';
import MiniButtonNoOpacity from '../standart/MiniButtonNoOpacity';
import {getNFTLikes,likeNFT,dislikeNFT,doILike} from '../../node/NFTLikes';
import {getTokenUri,getAllMetadataFromURI} from '../../web3/NFTContractHelper'
import {getNFTImageServerURL} from '../../node/images'

import {getTokenURIDB} from '../../node/NFTData'

import { useInViewport } from 'react-in-viewport';

import LazyLoad from "react-lazyload";
import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

// input just token ID as props: props.tokenId
// loads Metadata(name, description..) from ipfs. 
// loads image from server if not available from ipfs
function NFTFormatEasyOnePage(props){


    const history =useHistory();

    const [NFTLikes,setNFTLikes]= useState(0);
    const [iLike,setILike]= useState(false);
    const [metaData,setMetadata] = useState({});
    const [imageURL,setImageURL] = useState(false);
    const [imageLoad,setImageLoad] = useState(false);

    const [offchain,setOffchain] = useState(false);

    // Metadaten aus TokenId bekommen:
    async function loadMetadata(tokenId){

        var tokenURI;

        // get get metadata from blockchain, if not is offchain and get from DB
        try{
            tokenURI = await getTokenUri(tokenId);


        }catch(err){
            setOffchain(true);
            tokenURI = await getTokenURIDB(tokenId);


        }

        setMetadata( await getAllMetadataFromURI(tokenURI,tokenId) );
        return await getAllMetadataFromURI(tokenURI,tokenId);


    }
    useEffect(() => {
        loadMetadata(props.tokenId).then((ipfsRes)=>{

            // New Feature: load Image from server. if no image on server load from ipfs 
            getNFTImageServerURL(props.tokenId).then(res=>{

                if(res.length >0 ){
                    setImageURL(res[0]);
                }else{
                    setImageURL(ipfsRes.image)
                }
                setImageLoad(true)
            })

        })


    },[])





    function openThisNFTPage(){
        
        history.push({
            pathname:"/thisNFT/"+props.tokenId,
        });
    }


    // like, dislike
    function likeNFTFunc(){
        if(!window.ethereum){ return }
        likeNFT(props.tokenId);
        setILike(true);
        setNFTLikes(parseInt(NFTLikes)+1);

    }
    function dislikeNFTFunc(){
        if(!window.ethereum){ return }
        dislikeNFT(props.tokenId);
        setILike(false);
        setNFTLikes(parseInt(NFTLikes)-1);
    }


    // getNFTLikes  doILike?   setUser
    useEffect(()=>{
        if(props.tokenId !== undefined){

            getNFTLikes(props.tokenId).then(res => {
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
    },[props])


    const loadingAnimation = keyframes`
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #ccc;
  }
  100% {
    background-color: #fff;
  }
`;

const Placeholder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  animation: ${loadingAnimation} 1s infinite;
`;


const refPlaceholder = React.useRef();


    return (

        <div className={classes.container} >

            {/*NFT IMAGE */}
           {imageLoad && <img   src={imageURL} className={classes.NFTimage} onClick={openThisNFTPage}></img>   }
            {/*NFT IMAGE */}
            <div className={classes.bottom}>

                <div className={classes.nameAndFrom}> {metaData.name}</div>
                <div className={classes.nameAndNumber}>{metaData.collection }</div>


            </div>

            <div className={classes.bottom2}>

                <div className={classes.ethereum}>
                    {!offchain && <MiniButtonNoOpacity  img={ethereum} popupText={"Ethereum"}/>   }
                    {offchain && <MiniButtonNoOpacity  img={offchainPic} popupText={"Off-Chain"}/> }
                </div>

                <div className={classes.likesWrapper}>

                { !iLike &&  <MiniButton onButtonClicked={likeNFTFunc} img={blackHerz} popupText={"like"}/>  }
                { iLike  &&   <MiniButton onButtonClicked={dislikeNFTFunc} img={redHerz} popupText={"dislike"}/>  }

                    <div className={classes.numberlikes}> {NFTLikes} </div>
                </div>

            </div>


        </div>





    );




}

export default NFTFormatEasyOnePage;