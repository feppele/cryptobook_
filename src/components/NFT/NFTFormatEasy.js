import classes from './NFTFormatEasy.module.css';
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
import {getTokenUri,getAllMetadataFromURI} from '../../web3/NFTContractHelper'
import {getNFTImageServerURL} from '../../node/images'



// input just token ID as props: props.tokenId
function NFTFormatEasy(props){

    useEffect(() => {console.log(props)},[])
    

    const history =useHistory();

    const [NFTLikes,setNFTLikes]= useState(0);
    const [iLike,setILike]= useState(false);
    const [metaData,setMetadata] = useState({});
    const [imageURL,setImageURL] = useState(false);
    const [imageLoad,setImageLoad] = useState(false);

    // Metadaten aus TokenId bekommen:
    async function loadMetadata(tokenId){


        const tokenURI = await getTokenUri(tokenId);
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





    return (

        <div className={classes.container} >

            {/*NFT IMAGE */}
           {imageLoad && <img src={imageURL} className={classes.NFTimage} onClick={openThisNFTPage}></img>   }
            {/*NFT IMAGE */}
            <div className={classes.bottom}>

                <div className={classes.nameAndFrom}> {metaData.name}</div>
                <div className={classes.nameAndNumber}>{metaData.collection + "#"+metaData.tokenId}</div>


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

export default NFTFormatEasy;