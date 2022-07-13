
import classes from './Single.module.css';


import NFTFormatEasyOnePage from '../../../components/NFT/NFTFormatEasyOnePage'
import {useState,useEffect} from 'react'
import {highestTokenId,getTokenIdFromSearch,getAllSingles,getTokenIdFromSearchLimit} from '../../../node/NFTData';
import {getAllMyTokenIDs_On_Off_chain} from '../../../node/NFTData'

const LIMIT_LOAD = 15

// props.searchValue input.  "" show all
function Single(props){

    const [searchResult,setSearchResult] = useState([])
    const [prevSearch,setPrevSearch] = useState("")
    const [NFTs,setNFTs] = useState([])


    // Show All NFTs __ and mix the array random
    async function showAllNFTs(){

        //if porps.user === true => not Marketplace sondern MyNFTPage
        var result

        if(props.user){
            result = await getAllMyTokenIDs_On_Off_chain(props.user)
            result = result.map(ele=>{return{tokenid:ele}})
            result=result.slice(props.loadOffset,props.loadOffset+LIMIT_LOAD)
        }else{
            result = await getAllSingles(LIMIT_LOAD,props.loadOffset);
        }


        //singles.sort((a, b) => 0.5 - Math.random()); // shuffle

        // nicht das ganze Array neu laden
        setNFTs(NFTs => [...NFTs,...result])
    }
    console.table(NFTs)

    // search in nftInfo Database
    async function searchSingle(searchValue){

        if(searchValue === ""){ return }
        if(searchValue !== prevSearch ){
            setSearchResult([])
        }
        setPrevSearch(searchValue)

        const result = await getTokenIdFromSearchLimit(searchValue,LIMIT_LOAD,props.loadOffset);

        // important, when net reset doesnt work
        setSearchResult(searchResult => [...searchResult,...result])

    }




    useEffect(()=>{
        if(props.searchValue === "" ){
            setSearchResult([])
            showAllNFTs();
        }else{
            setNFTs([])
            searchSingle(props.searchValue)
        }
    },[props.searchValue,props.loadOffset])



    return( 

        props.searchValue === "" ?

        NFTs.map(  element =>  <NFTFormatEasyOnePage  tokenId={element.tokenid}/>  )

        :

        searchResult.map(  element => <NFTFormatEasyOnePage tokenId={element.tokenid}/>  )

        );


}

export default Single;




