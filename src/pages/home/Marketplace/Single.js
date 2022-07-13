
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

    // schnellere Variante für Load more --> uncomment
    //just if MYNFTPage
    const [allMyTokenIds,setAllMyTokenIds] = useState(getAllMyTokenIds())
    async function getAllMyTokenIds(){
        const res = await getAllMyTokenIDs_On_Off_chain(props.user) 
        return res.map(ele=>{return{tokenid:ele}}) 
    }
    
    useEffect(() => {
        setAllMyTokenIds(getAllMyTokenIds())
    },[])
    //// ^^^^ schnellere Variante für Load more --> uncomment ^^^^

    // Show All NFTs __ and mix the array random
    async function showAllNFTs(){
        var result
        //if porps.user === true => not Marketplace sondern MyNFTPage

        if(props.user){

            // schnellere Variante für Load more --> uncomment, das da unten dafür commentieren
            const all = await allMyTokenIds
            result=all.slice(props.loadOffset,props.loadOffset+LIMIT_LOAD)

            // langsamere Variante für Load more, dafür weniger Code, weil da oben alles wegfällt
            // result = await getAllMyTokenIDs_On_Off_chain(props.user) 
            // result=result.map(ele=>{return{tokenid:ele}}) 
            // result=result.slice(props.loadOffset,props.loadOffset+LIMIT_LOAD)

        }else{
            result = await getAllSingles(LIMIT_LOAD,props.loadOffset);
        }


        //singles.sort((a, b) => 0.5 - Math.random()); // shuffle

        // nicht das ganze Array neu laden
        setNFTs(NFTs => [...NFTs,...result])
    }

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




