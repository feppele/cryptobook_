import classes from './NFTFormatEasyOnePage.module.css';
import herz from '../../images/herz.png';
import ethereum from '../../images/ethereum.png';
import offchainPic from '../../images/fokus.png';
import {useHistory} from 'react-router-dom';
import {useState,useEffect} from 'react';
import redHerz from '../../images/redherz.png';
import blackHerz from '../../images/backherz.png';
import {getNFTLikes,likeNFT,dislikeNFT,doILike} from '../../node/NFTLikes';
import {getTokenUri,getAllMetadataFromURI} from '../../web3/NFTContractHelper'
import {getTokenURIDB,getPreisOfNFT} from '../../node/NFTData'
import React,{useContext} from "react";

//material UI
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

// input just token ID as props: props.tokenId
// loads Metadata(name, description..) from ipfs. 
// loads image from server if not available from ipfs
function NFTFormatEasyOnePage(props){

    console.log("NFTFormatEasyOnePage")

    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    const history =useHistory();

    const [NFTLikes,setNFTLikes]= useState(0);
    const [iLike,setILike]= useState(false);
    const [metaData,setMetadata] = useState({});
    const [imageURL,setImageURL] = useState(false);
    const [imageLoad,setImageLoad] = useState(false);
    const [offchain,setOffchain] = useState(false);
    const [preis,setPreis] = useState("");


    useEffect(()=>{
        getPreisOfNFT(props.tokenId).then(p =>{setPreis(p)});
    },[])

    // Metadaten aus TokenId bekommen:
    async function loadMetadata(tokenId){

        var tokenURI;

        // get get TokenURI from blockchain, if not is offchain and get from DB
        try{
            tokenURI = await getTokenUri(tokenId);


        }catch(err){
            setOffchain(true);
            tokenURI = await getTokenURIDB(tokenId);

        }
        console.log("tokenURI");
        console.log(tokenURI);

        setMetadata( await getAllMetadataFromURI(tokenURI,tokenId) );
        return await getAllMetadataFromURI(tokenURI,tokenId);


    }
    useEffect(() => {
        loadMetadata(props.tokenId).then((ipfsRes)=>{

            setImageURL(ipfsRes.image)
            setImageLoad(true)

            // New Feature: load Image from server. if no image on server load from ipfs 
            // getNFTImageServerURL(props.tokenId).then(res=>{

            //     if(res.length >0 ){
            //         setImageURL(res[0]);
            //     }else{
            //         setImageURL(ipfsRes.image)
            //     }
            //     setImageLoad(true)
            // })

        })


    },[])


    function openThisNFTPage(){
        history.push({
            pathname:"/thisNFT/"+props.tokenId,
        });
    }

    // like, dislike
    function likeNFTFunc(){
        // check if login
        const userdata = JSON.parse(sessionStorage.getItem("userdata"))
        if(userdata === null || userdata === undefined){return}
        likeNFT(props.tokenId);
        setILike(true);
        setNFTLikes(parseInt(NFTLikes)+1);

    }
    function dislikeNFTFunc(){
        // check if login
        const userdata = JSON.parse(sessionStorage.getItem("userdata"))
        if(userdata === null || userdata === undefined){return}
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
            {!imageLoad && <div className={classes.placeholder}>  </div>}
           {imageLoad && <img src={imageURL} className={classes.NFTimage} onClick={openThisNFTPage}></img>   }
            {/*NFT IMAGE */}


            <div style={{backgroundColor: theme.color2}} className={classes.bottom}>

                <div style={{color: theme.font}} className={classes.nameAndFrom}> {metaData.name}</div>
                <div style={{color: theme.font}} className={classes.nameAndNumber}>{metaData.collection }</div>


                <div className={classes.preis}> {preis}</div>

            </div>

            <div  style={{backgroundColor: theme.color3}} className={classes.bottom2}>




                    <Tooltip title={!offchain ? "Ethereum":"Offchain"} placement="top" disableInteractive arrow>
                            <IconButton sx={{filter: theme.png}}  size="small">
                                   <img src={!offchain ? ethereum: offchainPic} style={{height:'15px', width:'auto'}}></img>
                            </IconButton>
                    </Tooltip>




                <div className={classes.likesWrapper}>

                <Tooltip title={!iLike ? "like":"dislike"} placement="top" disableInteractive arrow>
                        <IconButton onClick={!iLike ? likeNFTFunc : dislikeNFTFunc} size="small" sx={{opacity:'0.5', "&:hover":{opacity:'1'} }}>
                               <img src={!iLike ? blackHerz: redHerz} style={{height:'15px', width:'auto'}}></img>
                        </IconButton>
                </Tooltip>

                    <div style={{color: theme.font}} className={classes.numberlikes}> {NFTLikes} </div>
                </div>

            </div>


        </div>





    );




}

export default NFTFormatEasyOnePage;