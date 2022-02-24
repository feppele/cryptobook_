
import classes from './Single.module.css';

import NFTFormatEasy from '../../../components/NFT/NFTFormatEasy'
import NFTFormatCreatorNew from '../../../components/NFT/NFTFormatCreatorNew'

import NFTCollectionFormat from '../../../components/NFT/NFTCollectionFormat';
import {useState,useEffect} from 'react'
import {highestTokenId,getTokenIdFromSearch} from '../../../node/NFTData';



// props.searchValue input.  "" show all
function Single(props){


    const [searchResult,setSearchResult] = useState([])


    // Show All NFTs __ and mix the array random
    async function showAllNFTs(){

        const highId = await highestTokenId();
        var array= Array.from({length: highId}, (_, i) => i + 1)
        array = array.sort((a, b) => 0.5 - Math.random()); // shuffle

        console.log(array)
        console.log(highId)

        setSearchResult([]);
        setSearchResult(array)

    }


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





    return (  searchResult.map(  element =>  <NFTFormatEasy  tokenId={element}/> )    );


}

export default Single;




