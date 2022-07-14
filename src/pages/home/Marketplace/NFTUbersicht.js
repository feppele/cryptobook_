import classes from './NFTUbersicht.module.css';
import {useState,useEffect,useContext,useRef} from 'react'
import {highestTokenId,getTokenIdFromSearch} from '../../../node/NFTData'
import Single from './Single';
import Collections from './Collections';
import { useHistory } from "react-router-dom";
import Squares2 from '../../../images/2square.png'
import Squares3 from '../../../images/3square.png'

//ColorTheme - Night Mode
import {themes} from '../../../ColorTheme'
import {NightContext} from '../../../NightModeProvider'


//material UI
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const LIMIT_LOAD = 15

// NFTUbersicht is used for MarketPlace and for MYNFTPAGE
//if not MarketPlace then props.user is injected
function NFTUbersicht(props){

    const gridRef = useRef()

    //Button Toggle Collect/Sinlge
    const [alignment,setAlignment] = useState('single');
    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setSearchValue("")
          setAlignment(newAlignment);
        }
        if(newAlignment === 'single'){
            setCollectionMode(false)
            setSingleMode(true)

        }else if (newAlignment === 'collection'){
            setCollectionMode(true)
            setSingleMode(false)
        }
    };

        // Night Mode
        const nightMode = useContext(NightContext)
        const [theme,setTheme] =useState(themes.bright)
        useEffect(()=>{
            if(nightMode){
                setTheme(themes.dark)
            }else{
                setTheme(themes.bright)
            }
        },[nightMode])

    const history = new useHistory();

    const [singleMode,setSingleMode] = useState(true);
    const [collectionMode,setCollectionMode] = useState(false);
    // offset: select * from nftinfo limit 3 offset 3
    const [loadOffset,setLoadOffset] = useState(0);

    const [searchValue,setSearchValue] = useState("");

    function search(e){
        if(e.key!== "Enter"){
            return;
        }
        setLoadOffset(0)
        setSearchValue(e.target.value)

    }

    function loadMore(){
        setLoadOffset(loadOffset+LIMIT_LOAD)
    }

    //Button Toggle  threeFive

    function threeOrFive(){
        if (window.document.innerWidth < 1000){
            setThreeFive('three')
        }
    }

    //threeOrFive()

    const [threeFiveVisible,setThreeFiveVisible] = useState(false);
    const [threeFive,setThreeFive] = useState('three');
    const handleThreeFive = (event, newAlignment) => {
        if (newAlignment !== null) {
            setThreeFive(newAlignment);
        }
        if(newAlignment === 'three'){
            gridRef.current.style.gridTemplateColumns= 'repeat(3, 1fr)'
        }else if (newAlignment === 'five'){
            gridRef.current.style.gridTemplateColumns= 'repeat(5, 1fr)'
        }
    };
    useEffect(() => {
        if(window.innerWidth<=1000){
            handleThreeFive(0,'three')
            setThreeFiveVisible(false)
        }else{
            handleThreeFive(0,'five')
            setThreeFiveVisible(true)
        }
    },[])

    var kleiner = false
    var größer = false
    window.addEventListener("resize", ()=>{
        if(window.innerWidth<=1000 && !kleiner){
            kleiner = true
            größer = false
            handleThreeFive(0,'three')
            setThreeFiveVisible(false)
        }
        if(window.innerWidth>=1000 &&!größer){
            größer = true
            kleiner = false
            handleThreeFive(0,'five')
            setThreeFiveVisible(true)
        }
    });


    return (
        <div style={{backgroundColor:theme.color1}} className={classes.container}>

            <div style={{backgroundColor:theme.color2}} className={classes.topBox}>

                <div style={{color:theme.font}} className={classes.header}>{props.header}</div>

                <div className={classes.searchBox}>


                <div className={classes.toggleButtonWrapper}>
                <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment" sx={{height:'40px',width:'100%'}} >
                    <ToggleButton value="collection" aria-label="left aligned" sx={{width:'50%'}}>
                    <div style={{color:theme.font}}>Collection</div>
                    </ToggleButton>
                    <ToggleButton value="single" aria-label="right aligned" default sx={{width:'50%'}}>
                    <div style={{color:theme.font}}>Single</div>
                    </ToggleButton>
                </ToggleButtonGroup>
                </div>


                    <input style={{backgroundColor:theme.color2,color:theme.font,border:theme.border}} id="searchInput" className={classes.textInput} placeholder="search items" onKeyDown={search} ></input>

                {threeFiveVisible && 
                <ToggleButtonGroup value={threeFive} exclusive onChange={handleThreeFive} aria-label="text alignment" sx={{height:'40px',marginLeft:'20px'}}>
                    <ToggleButton value="three" aria-label="left aligned" >
                    <img style={{filter:theme.png,height:'20px'}} src={Squares2} ></img>
                    </ToggleButton>
                    <ToggleButton value="five" aria-label="right aligned" default >
                    <img style={{filter:theme.png,height:'20px'}} src={Squares3}></img>
                    </ToggleButton>
                </ToggleButtonGroup>
                }

                </div>

            </div>


            <div ref={gridRef} className={classes.grid}>

                { singleMode && < Single user={props.user} loadOffset={loadOffset} searchValue={searchValue}/>   }

                { collectionMode && <Collections user={props.user} loadOffset={loadOffset} searchValue={searchValue}/> }

            </div>

            <Button onClick={loadMore} sx={{marginBottom:'33px'}}variant="outlined">load more</Button>

        </div>

    );

}

export default NFTUbersicht;