import classes from './NFTCollectionFormat.module.css';
import herz from '../../images/herz.png';
import ethereum from '../../images/ethereum.png';
import {NFTContract,NFTContractAddress} from '../../web3/NFTContract';
import {useHistory} from 'react-router-dom';
import {getOptions} from '../../node/databank';
import {useState,useEffect} from 'react';


import {getTokenUri,getAllMetadataFromURI} from '../../web3/NFTContractHelper'
import {getNFTImageServerURL} from '../../node/images'


import {getAllTokenIdFromCollection,getCretorFromCollection} from '../../node/NFTData'

import {getNameFromAddress} from '../../node/betterFunctions'


// input just collection name
function NFTCollectionFormat(props){

    useEffect(() => {console.log(props)},[])


    const history =useHistory();





    const [backgroundURL,setBackgroundURL] = useState("");
    const [creator,setCreator] = useState("");

    async function load(){

        // returns [{tokenid:},{tokenid:}]
        const Ids = await getAllTokenIdFromCollection(props.collection);
        console.log(Ids)

        // set BackgroundImgae from first NFT pic
        setBackgroundURL( await getNFTImageServerURL(Ids[0].tokenid))
        //set Creator

        const creatorAddress = await getCretorFromCollection(props.collection);
        const creatorName = await getNameFromAddress(creatorAddress);

        setCreator({name:creatorName,address:creatorAddress})

    }

    useEffect(() => {load()},[])






    function openThisCollectionPage(){
        history.push({
            pathname:"/collection/"+props.collection,
        });
    }




    return (

        <div className={classes.container} >

            {/*NFT IMAGE */}
           <img src={backgroundURL} className={classes.NFTimage} onClick={openThisCollectionPage}></img>
            {/*NFT IMAGE */}


            <div className={classes.bottom}>

                <div className={classes.name}> {props.collection}</div>
                <div className={classes.creator}> { "by: " + creator.name}</div>

            </div>

        </div>

    );


}

export default NFTCollectionFormat;