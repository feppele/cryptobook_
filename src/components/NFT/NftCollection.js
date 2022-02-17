import classes from './NftCollection.module.css';
import {useState,useEffect} from 'react';
import {getAllTokensMetadataArray} from '../../web3/NFTContractHelper';
import NFTFormatCreator from './NFTFormatCreator';
import loadImage from '../../images/Loader.gif'

import NoNFT from './NoNFTsSign';


function NftCollection(props){

    const[loading,setLoading]= useState(true);
    const[noNFTs,setNoNFTs] = useState(true);

    const [metadataArray,setMetadataArray]=useState([]);
    async function loadNFT(){
        await setMetadataArray( await getAllTokensMetadataArray(props.from));
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
    })


    return (

        <div className={classes.container}>


           {loading && <img src={loadImage}></img> }
           {!noNFTs && <NoNFT text ="no NFTs yet"/> }


          <NFTFormatCreator metadataArray={metadataArray}/>

        </div>

    );


}

export default NftCollection;