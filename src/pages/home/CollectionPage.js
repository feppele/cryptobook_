import classes from './CollectionPage.module.css';
import React, {useState,useEffect,useContext} from 'react';
import {useParams} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {getAllTokenIdFromCollection,getCretorFromCollection} from '../../node/NFTData'
import {getNFTImageServerURL} from '../../node/images'
import {getNameFromAddress} from '../../node/betterFunctions'

import NFTFormatEasyOnePage from '../../components/NFT/NFTFormatEasyOnePage'
import image from '../../images/23.jpeg'

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

//mui
import Link from '@mui/material/Link';

function CollectionPage(){

                // Night Mode
                const nightMode = useContext(NightContext)
                const [theme,setTheme] =useState(themes.bright)
                useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

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

    console.log(creator)

    function goToCreator(){
        history.push("/profile/"+creator.address);
    }

    return (

        <div style={{backgroundColor:theme.color1}} className={classes.container}>

            <div className={classes.greyBox}>

                <img className={classes.backgroundPic} src={backgroundURL}></img>

            </div>

            <p style={{color:theme.font}} className={classes.h1}> {collectionName}</p>

            <div style={{border:theme.border}} className={classes.box}>

                <div className={classes.nameWrapper}>
                    <div style={{color:theme.font}} className={classes.h3}> {"Creator" }</div>
                    <div onClick={goToCreator} className={classes.h2}> {creator.name}</div>
                </div>

                <div className={classes.nameWrapper}>
                    <div  style={{color:theme.font}} className={classes.h3}> {"Items   "}</div>
                    <div  className={classes.h2}> {allTokenIds.length}</div>
                </div>

            </div>


            <div className={classes.grid}>

                {allTokenIds.map( element =>  <NFTFormatEasyOnePage key={key++} tokenId={element.tokenid}/>  ) }

            </div>

        </div>

    );


}

export default CollectionPage;