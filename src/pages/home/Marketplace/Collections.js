
import classes from './Collections.module.css';


import NFTCollectionFormat from '../../../components/NFT/NFTCollectionFormat';
import {useState,useEffect} from 'react'
import {getAllCollections,searchCollections} from '../../../node/NFTData';


const LIMIT_LOAD = 15


// props.searchValue input.  "" show all
function Collections(props){


    const [searchResult,setSearchResult] = useState([])
    const [prevSearch,setPrevSearch] = useState("")
    const [NFTs,setNFTs] = useState([])


    // Show All NFTs __ and mix the array random
    async function showAllCollections(){
        // get All Collections from DB and shuffle
        const result = await getAllCollections(LIMIT_LOAD,props.loadOffset);
        //result.sort((a, b) => 0.5 - Math.random() );

        setNFTs(NFTs => [...NFTs,...result])

    }



    // search in nftInfo Database
    async function search(searchValue){

        if(searchValue === ""){ return }
        if(searchValue !== prevSearch ){
            setSearchResult([])
        }
        setPrevSearch(searchValue)

        const result = await searchCollections(searchValue,LIMIT_LOAD,props.loadOffset)

        // important, when net reset doesnt work
        setSearchResult(searchResult => [...searchResult,...result])

    }


    useEffect(()=>{
        if(props.searchValue === "" ){
            setSearchResult([])
            showAllCollections();
        }else{
            setNFTs([])
            search(props.searchValue)
        }

    },[props])





    return (

        props.searchValue === "" ?

        NFTs.map(  element =>  <NFTCollectionFormat  collection={element.collection}/>  )

        :

        searchResult.map(  element => <NFTCollectionFormat  collection={element.collection}/>  )

        );


}

export default Collections;




