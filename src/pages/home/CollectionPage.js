import classes from './CollectionPage.module.css';

import React, {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';

import { useHistory } from "react-router-dom";

import {getAllTokenIdFromCollection,getCretorFromCollection} from '../../node/NFTData'
import {getNFTImageServerURL} from '../../node/images'
import {getNameFromAddress} from '../../node/betterFunctions'

import NFTFormatEasy from '../../components/NFT/NFTFormatEasy'
import image from '../../images/23.jpeg'


function CollectionPage(){


    var key=1;
    const {collectionName} = useParams();
    const history =useHistory();

    if(!window.ethereum){
        //history.push("/noMetaMask")
    }

    const[allTokenIds,setAllTokenIds] =useState([])
    const [backgroundURL,setBackgroundURL] = useState("")
    const [creator,setCreator] = useState("")

    useEffect(() => {
        load();

    },[])


    async function load(){

        // returns [{tokenid:},{tokenid:}]
        const Ids = await getAllTokenIdFromCollection(collectionName);
        console.log(Ids)
        setAllTokenIds(Ids);

        // set BackgroundImgae from first NFT pic
        setBackgroundURL( await getNFTImageServerURL(Ids[0].tokenid))
        //set Creator

        const creatorAddress = await getCretorFromCollection(collectionName);
        const creatorName = await getNameFromAddress(creatorAddress);

        setCreator({name:creatorName,address:creatorAddress})

    }

    console.log(creator )

    function goToCreator(){
        history.push("/profile/"+creator.address);
    }
    

    return (

        <div  className={classes.container}>

            <div className={classes.greyBox}>

                <img className={classes.backgroundPic} src={backgroundURL}></img>

            </div>



            <p  className={classes.h1}> {collectionName}</p>
        <div className={classes.box}>

            

            <div className={classes.nameWrapper}>
                <div  className={classes.h3}> {"Creator" }</div>
                <div onClick={goToCreator} className={classes.h2}> {creator.name}</div>
            </div>

            <div className={classes.nameWrapper}>
            <div  className={classes.h3}> {"Items   "}</div>
            <div  className={classes.h2}> {allTokenIds.length}</div>
            </div>



        </div>


         

         <div className={classes.grid}>

         {allTokenIds.map( element =>  <NFTFormatEasy key={key++} tokenId={element.tokenid}/>  ) }

         </div>







        </div>





    );


}

export default CollectionPage;