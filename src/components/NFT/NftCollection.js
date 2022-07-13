import classes from './NftCollection.module.css';
import {useState,useEffect} from 'react';
import {getAllTokensMetadataArray,getOwnerOfTokenId} from '../../web3/NFTContractHelper';
import NFTFormatEasyOnePage from './NFTFormatEasyOnePage'
import loadImage from '../../images/Loader.gif'
import NoNFTsSign from './NoNFTsSign';
import NFTUbersicht from '../../pages/home/Marketplace/NFTUbersicht'

import {getOffchainMetaData,getAllMyTokenIDs_On_Off_chain} from '../../node/NFTData'



// input User Address
function NftCollection(props){

    const[loading,setLoading]= useState(true);
    const[noNFTs,setNoNFTs] = useState(true);
    const [tokenidArray,setTokenidArray]=useState([]);


    console.log(props)
    //console.log(metadataArray)
    async function loadNFT(){

        setTokenidArray( await getAllMyTokenIDs_On_Off_chain(props.from));
        setLoading(false);
    }
    // just load at mount
    useEffect(() => {loadNFT()},[]);


    useEffect(() => {
        if(!loading){
            if(tokenidArray.length === 0){
                setNoNFTs(false);
            }else{
                setNoNFTs(true);
            }
        }
    },[loading])


    return (

        <div className={classes.container}>

           { (!noNFTs || loading) && <NoNFTsSign load={!noNFTs} text ="no NFTs yet"/> }
 
           <NFTUbersicht user={props.from}/>
        </div>

    );


}

export default NftCollection;