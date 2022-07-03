import classes from './Marketplace.module.css';
import {useState,useEffect} from 'react'
import {highestTokenId,getTokenIdFromSearch} from '../../node/NFTData'
import Single from './Marketplace/Single';
import Collections from './Marketplace/Collections';
import { useHistory } from "react-router-dom";

function Marketplace(){

    const history = new useHistory();

    const [singleMode,setSingleMode] = useState(true);
    const [collectionMode,setCollectionMode] = useState(false);

    // Button Style
    const buttons = document.getElementsByName('button')
    function changeButtonStyle(e){
        buttons.forEach(button => {return ( button.className = classes.button)  })
        e.target.className = classes.clickedButton

        if(e.target.innerHTML === "Collections"){
            setCollectionMode(true)
            setSingleMode(false)
        }else if(e.target.innerHTML === "Single"){
            setCollectionMode(false)
            setSingleMode(true)
        }
    }

    const [searchValue,setSearchValue] = useState("");

    function search(e){

        if(e.key!== "Enter"){
            return;
        }
        const search = e.target.value;
        setSearchValue(e.target.value)
        console.log(search);

    }

    return (
        <div className={classes.container}>

            <div className={classes.topBox}>

                <div className={classes.header}>Marketplace</div>

                <div className={classes.searchBox}>

                    <div className={classes.button} name="button" onClick={changeButtonStyle} >Collections</div>

                    <div className={classes.button} name="button" onClick={changeButtonStyle} >Single</div>

                    <input id="searchInput" className={classes.textInput} placeholder="search items" onKeyDown={search} ></input>

                </div>

            </div>


            <div className={classes.grid}>

                { singleMode && < Single searchValue={searchValue}/>   }

                { collectionMode && <Collections searchValue={searchValue}/> }

            </div>

        </div>

    );

}

export default Marketplace;