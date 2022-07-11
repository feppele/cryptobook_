
import classes from './Single.module.css';

import NFTFormatEasyOnePage from '../../../components/NFT/NFTFormatEasyOnePage'
import {useState,useEffect} from 'react'
import {highestTokenId,getTokenIdFromSearch,getAllSingles} from '../../../node/NFTData';

// props.searchValue input.  "" show all
function Single(props){


    const [searchResult,setSearchResult] = useState([])

    // Show All NFTs __ and mix the array random
    async function showAllNFTs(){

        // const highId = await highestTokenId();
        // var array= Array.from({length: highId}, (_, i) => i + 1)

        var singles = await getAllSingles(9,props.loadOffset);
        console.table(singles)
        //singles.sort((a, b) => 0.5 - Math.random()); // shuffle

        // nicht das ganze Array neu laden
        setSearchResult(searchResult => [...searchResult,...singles])
        // setSearchResult([]);
        // setSearchResult(singles)
    }
    console.table(searchResult)

    // search in nftInfo Database
    async function searchSingle(searchValue){

        if(searchValue === ""){ return }

        const results = await getTokenIdFromSearch(searchValue);

        console.log(results)
        // important, when net reset doesnt work
        setSearchResult([]);
        setSearchResult(results);
    }


    useEffect(()=>{
        if(props.searchValue === "" ){
            showAllNFTs();
        }else{
            searchSingle(props.searchValue)
        }

    },[props])



    return (  searchResult.map(  element =>  <NFTFormatEasyOnePage  tokenId={element.tokenid}/> )    );


}

export default Single;




