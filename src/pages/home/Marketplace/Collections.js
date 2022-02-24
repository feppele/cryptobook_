
import classes from './Collections.module.css';

import NFTFormatEasy from '../../../components/NFT/NFTFormatEasy'
import NFTFormatCreatorNew from '../../../components/NFT/NFTFormatCreatorNew'

import NFTCollectionFormat from '../../../components/NFT/NFTCollectionFormat';
import {useState,useEffect} from 'react'
import {getTokenIdFromSearch,getAllCollections,searchCollections} from '../../../node/NFTData';



// props.searchValue input.  "" show all
function Collections(props){


    const [searchResult,setSearchResult] = useState([])



    // Show All NFTs __ and mix the array random
    async function showAllCollections(){
        // get All Collections from DB and shuffle
        const allCollections = await getAllCollections();
        allCollections.sort((a, b) => 0.5 - Math.random() );

        setSearchResult([]);
        setSearchResult(allCollections)

    }



    // search in nftInfo Database
    async function search(searchValue){

        const collections = await searchCollections(searchValue)
        setSearchResult([]);
        setSearchResult(collections);

    }


    useEffect(()=>{
        if(props.searchValue === "" ){
            showAllCollections();
        }else{
            search(props.searchValue)
        }

    },[props])





    return (  searchResult.map(  element =>  <NFTCollectionFormat  collection={element.collection}/> )    );


}

export default Collections;




