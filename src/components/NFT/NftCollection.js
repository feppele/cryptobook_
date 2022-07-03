import classes from './NftCollection.module.css';
import {useState,useEffect} from 'react';
import {getAllTokensMetadataArray,getOwnerOfTokenId} from '../../web3/NFTContractHelper';
import NFTFormatEasyOnePage from './NFTFormatEasyOnePage'
import loadImage from '../../images/Loader.gif'
import NoNFT from './NoNFTsSign';
import {getOffchainMetaData} from '../../node/NFTData'


// input User Address
function NftCollection(props){

    const[loading,setLoading]= useState(true);
    const[noNFTs,setNoNFTs] = useState(true);
    const [metadataArray,setMetadataArray]=useState([]);


    console.log(props)
    //console.log(metadataArray)
    async function loadNFT(){




        //onchainarray: [metaurl,name,tokenid]
        var onChainMetaArray = await getAllTokensMetadataArray(props.from)

        // just load from DB because the are on and offChains
        //load also offChain NFT from DB
        const offChainMetaArray = await getOffchainMetaData(props.from);


        // add off an on to one array
        //offchainmetaarray: {metaurl:,name:,tokenid:}


        for(var i=0;i<offChainMetaArray.length;i++){

            const add = offChainMetaArray[i]

            //offchains werden in nftinfo anhand von 'creator' erkannt. nach verkauf gehört offchaini nicht mehr mir also wird erst gecheckt ob die gleiche tokenId ein onchani ist
            //wenn onchani wird er nicht hinzugefügt
            // getOwnerOfTokenId() returns error if no owner == not exists in

            const owner =  await getOwnerOfTokenId(add.tokenid)

            if(owner ==="error" ){

                if(onChainMetaArray.every(e => e[2] !==add.tokenid)){ // ist nicht enhalten return true

                    onChainMetaArray.push([add.metaurl,add.name,add.tokenid])
                }
            }


        }










        console.log(onChainMetaArray)


        setMetadataArray( onChainMetaArray);

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

           {metadataArray.map( element =>  <NFTFormatEasyOnePage imageURL={element[0]} imageName={element[1]} tokenId={element[2]}/>  )}

        </div>

    );


}

export default NftCollection;