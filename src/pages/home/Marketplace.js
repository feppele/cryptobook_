import classes from './Marketplace.module.css';
import NFTFormatEasy from '../../components/NFT/NFTFormatEasy'
import {useState,useEffect} from 'react'
import {highestTokenId,getTokenIdFromSearch} from '../../node/NFTData'

function Marketplace(){


    const [buttonStyle,setButtonStyle] = useState(classes.button)

    const [singeElements,setSingeElements] = useState([])
    const [searchResult,setSearchResult] = useState([])

    const buttons = document.getElementsByName('button')

    function changeButtonStyle(e){
        buttons.forEach(button => {return ( button.className = classes.button)  })

        e.target.className = classes.clickedButton

    }


    // Single

    function shuffleArray(inputArray){
        inputArray.sort(()=> Math.random() - 0.5);
    }
    async function selectIds(){

        const highId = await highestTokenId();
        var array= Array.from({length: highId}, (_, i) => i + 1)
        shuffleArray(array);
        console.log(array)
        console.log(highId)

        //array =["30","31","32","33","34","36","37"]

        setSingeElements(array)
        setSearchResult(array);

    }
    //useEffect(()=>{  selectIds() },[])




    async function search(e){

        if(e.key!== "Enter"){
            return;
        }

        const results = await getTokenIdFromSearch(e.target.value);

        console.log(results)
        setSearchResult(results);



    }

    console.log(searchResult)

    const eles =[1,2,3]





    return (
        <div className={classes.container}>


            <div className={classes.topBox}>

            </div>


            <div className={classes.searchBox}>

                <div className={buttonStyle} name="button" onClick={changeButtonStyle} >Collections</div>

                <div className={buttonStyle} name="button" onClick={changeButtonStyle} >Single</div>

                <input id="searchInput" className={classes.textInput} placeholder="search items" onKeyDown={search}></input>


            </div>


            <div className={classes.grid}>

                {searchResult.map( element =>  <NFTFormatEasy tokenId={element}/> )}

            </div>

        </div>

    );

}

export default Marketplace;