import classes from './NftCollection.module.css';
import {useState,useEffect} from 'react';
import {getAllTokensMetadataArray} from '../../web3/NFTContractHelper';
import NFTFormatCreator from './NFTFormatCreator';
import loadImage from '../../images/Loader.gif'

import NoNFT from './NoNFTsSign';

import {getOffchainMetaData} from '../../node/NFTData'


// input User Address
function NftCollection(props){

    const[loading,setLoading]= useState(true);
    const[noNFTs,setNoNFTs] = useState(true);
    const [metadataArray,setMetadataArray]=useState([]);


    //console.log(metadataArray)
    async function loadNFT(){

        //var onChainMetaArray = await getAllTokensMetadataArray(props.from)
        var onChainMetaArray =[]

        // just load from DB because the are on and offChains
        //load also offChain NFT from DB
        const offChainMetaArray = await getOffchainMetaData(props.from);
        offChainMetaArray.forEach(ele =>{onChainMetaArray.push([ele.metaurl,ele.name,ele.tokenid])})

        console.log(onChainMetaArray)


        await setMetadataArray( onChainMetaArray);

        setLoading(false);

    }
    // just load at mount
    useEffect(() => {loadNFT()},[]);


    useEffect(() => {
        if(!loading){
            if(metadataArray.length === 0){
                setNoNFTs(false);
            }else{
                setNoNFTs(true);
            }
        }
    },[loading])


    return (

        <div className={classes.container}>

           {loading && <img src={loadImage} className={classes.loading}></img> }
           {!noNFTs && <NoNFT text ="no NFTs yet"/> }

          <NFTFormatCreator metadataArray={metadataArray}/>

        </div>

    );


}

export default NftCollection;