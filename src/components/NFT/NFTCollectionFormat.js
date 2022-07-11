import classes from './NFTCollectionFormat.module.css';
import herz from '../../images/herz.png';
import ethereum from '../../images/ethereum.png';
import {NFTContract,NFTContractAddress} from '../../web3/NFTContract';
import {useHistory} from 'react-router-dom';
import {getOptions} from '../../node/databank';
import {useState,useEffect,useContext} from 'react';
import {getTokenUri,getAllMetadataFromURI} from '../../web3/NFTContractHelper'
import {getNFTImageServerURL} from '../../node/images'
import {getAllTokenIdFromCollection,getCretorFromCollection} from '../../node/NFTData'
import {getNameFromAddress} from '../../node/betterFunctions'

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

// input just collection name
function NFTCollectionFormat(props){

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

    useEffect(() => {console.log(props)},[])


    const history =useHistory();





    const [backgroundURL,setBackgroundURL] = useState("");
    const [creator,setCreator] = useState("");
    const [loading,setLoading] = useState(true);

    async function load(){

        // returns [{tokenid:},{tokenid:}]
        const Ids = await getAllTokenIdFromCollection(props.collection);
        console.log(Ids)

        // set BackgroundImgae from first NFT pic
        setBackgroundURL( await getNFTImageServerURL(Ids[0].tokenid))
        //set Creator

        const creatorAddress = await getCretorFromCollection(props.collection);
        const creatorName = await getNameFromAddress(creatorAddress);

        setCreator({name:creatorName,address:creatorAddress})
        setLoading(false)
    }

    useEffect(() => {load()},[])






    function openThisCollectionPage(){
        history.push({
            pathname:"/collection/"+props.collection,
        });
    }




    return (

        <div className={classes.container} >

            {loading&& <div className={classes.placeholder}>  </div>}

            {/*NFT IMAGE */}
            {!loading && <img src={backgroundURL} className={classes.NFTimage} onClick={openThisCollectionPage}></img> }
            {/*NFT IMAGE */}


            <div style={{backgroundColor:theme.color2}} className={classes.bottom}>

                <div className={classes.name}> {props.collection}</div>
                <div className={classes.creator}> { "by: " + creator.name}</div>

            </div>

        </div>

    );


}

export default NFTCollectionFormat;