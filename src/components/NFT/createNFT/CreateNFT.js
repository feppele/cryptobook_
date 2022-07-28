import classes from './CreateNFT.module.css';
import React, {useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";
import ImageUpload from './ImageUpload';
import TextInput from '../../standart/TextInput';
import {useRef,useContext} from 'react'

import FinishedNFT from '../finishedNFTModal/FinishedNFT';
import FinishedNFTBackdrop from '../finishedNFTModal/FinishedNFTBackdrop';
import{uploadNFTImageToServer} from '../../../node/images'
import Square from './Square';
// Image Upload
import image from '../../../images/image.png';
//IPFS and Blockchain Functions
import {ipfsUpload,createNFT} from './IPFSandNFTFunctions';
import {createCollection,getMyCollections,doesCollectionExist,getNFTInfoFromTokenId,createNFTInfo,getAllTokenIdFromCollection} from '../../../node/NFTData'
import {createNFTOnAndOff} from './OffChainCreate'
import {getCurrentUser} from '../../../web3/HelperFunctions'
import InfoBox from '../../standart2/InfoBox'

//material UI 
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';

//mantine
import { Notification } from '@mantine/core';
import { Check } from 'tabler-icons-react';

//ColorTheme - Night Mode
import {themes} from '../../../ColorTheme'
import {NightContext} from '../../../NightModeProvider'

//wallet approve
import Wallet from '../../../components/wallet/Wallet'
import ApprovalView from '../../../components/wallet/ApprovalView';


function CreateNFT(props){

        // Night Mode
        const nightMode = useContext(NightContext)
        const [theme,setTheme] =useState(themes.bright)
        useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    const history =useHistory();

    const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
    const [dataMissing,setDataMissing] = useState(false);
    const [creationFinish,setCreationFinish] = useState(false);
    const [tokenId, setTokenId] = useState(false);
    const [txHash, setTxHash] = useState(false);
    const [collectionList,setConnectionList]=useState([]);
    const [notMyCollection,setNotMyCollection] = useState(false);
    const [InfoBoxOpen,setInfoBoxOpen] = useState(true);
    // for Alert
    const [alertOpen, setAlertOpen] = useState(false);
    // for MCB Wallet Approve Walle
    const [txObj,setTxObj] =useState(false);


    // HIDDEN BUTTON STUFF
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};
    // input Tag has ugly Button. So make input invisible in css. Create new button and ref!! on click to input tag
    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };


    // einfach erweiterbar: einfach in metaData weitere elemente hinzufügen
    async function onCreateButtonClicked(e){

        const creator = JSON.parse(sessionStorage.getItem("userdata")).address

        if(notMyCollection){ return;}

        // create MetaData json: {itemName, collection, description, extLink}

        const itemName = await document.getElementById("itemName").value;
        const collection = await document.getElementById("collection").value;
        const description = await document.getElementById("description").value;
        const extLink = await document.getElementById("externalLink").value;
        const searchTearms = await document.getElementById("searchTearms").value;
        const preis = await document.getElementById("preis").value;

        const metaData = {name:itemName,collection:collection,description:description,extLink:extLink,creator:creator}


        // create Image File
        const imageFile = await selectedFile;

        console.log(selectedFile);

        if(itemName==="" || !selectedFile){
            if(itemName===""){console.log("leerer Name")}
            if(!selectedFile){console.log("leeres Bild")}

            setDataMissing(true);

        }else{
        setDataMissing(false);
        //just if name and image is selected

        // reset values

        setIsSelected(false);
        setSelectedFile();
        document.getElementById("itemName").value ="";
        document.getElementById("collection").value ="";
        document.getElementById("description").value ="";
        document.getElementById("searchTearms").value ="";
        document.getElementById("externalLink").value ="";
        document.getElementById("preis").value ="";

        var response = await createNFTOnAndOff(metaData,imageFile,itemName,searchTearms,collection,e.target.id,preis) //e.target.id = button offchain or onchain

        if(response.raw){
            console.log(response)
            // retrun transaction = MCB wallet --> approve
            const tx = response
            setTxObj(tx)
            return
        }

        if(e.target.id !=="offchainCreate"){
            setAlertOpen(true)
        }

        //await setTxHash(response.txhash);
        await setTokenId(response);

        //open finsihed NFT in Modal
        setCreationFinish(true);

        }

    }



    function onBackDropClicked(){

        setCreationFinish(false);
    }



    // Load my Collections
    useEffect(() => {
        getMyCollections().then( res => { setConnectionList( res ) } )



    },[])


    // is called when collection name typed in
    async function checkCollectionExist(e){
        // if collection exists
        if( await doesCollectionExist(e.target.value) ){
            // if not my collection
            if(! await collectionList.some(item => item.collection ===e.target.value)){
                setNotMyCollection(true);
            }else{setNotMyCollection(false)}
        }else{setNotMyCollection(false)}
    }



    function closeInfoBox(){
        setInfoBoxOpen(false)
    }

    return (

        <div style={{backgroundColor:theme.color1}} className={classes.container}>

            {/* Buy NFT with Approve Wallet*/}
            {txObj &&
            <Wallet closeWalletFunc={()=>{setTxObj(false)}}>
                <ApprovalView type="buy NFT" tx={txObj}/>
            </Wallet>
            }

            <div className={classes.container2}>

            {InfoBoxOpen && <InfoBox onCloseClick={closeInfoBox}/> }

            {creationFinish && <FinishedNFT tokenId={tokenId} txHash={txHash} />}
            {creationFinish && <FinishedNFTBackdrop onBackDropClicked={onBackDropClicked}/>}

                <div style={{color: theme.font}} className={classes.h1}>Create new Item</div>
                <div style={{color: theme.font}} className={classes.h2}>Upload your Image: </div>
                <div style={{color: theme.font}} className={classes.h3}> accepted: png, jpeg, jpg</div>

                {/* Image Upload */}
                <div id="imageWrap"className={classes.imageUploadWrapper}>
                    <input ref={hiddenFileInput} id ="imageInput" type="file" name="file" onChange={changeHandler}  className={classes.imageInput}/>
                    <div onClick={handleClick} className={classes.hiddenFileButton}></div>

                    { !isSelected && <img src ={image} className={classes.coverImage}></img>}
                    { isSelected &&   <img id="image" src={URL.createObjectURL(selectedFile)} className={classes.image}></img>  }
		        </div>
                {/* Image Upload */}



                <div style={{color: theme.font}} className={classes.h2}> Name: </div>
                <input style={{backgroundColor: theme.color1}} id="itemName"type="text" placeholder="Item name" className={classes.textInput}></input>

                <div style={{color: theme.font}} className={classes.h2}> Search Tearms: </div>
                <input style={{backgroundColor: theme.color1}} id="searchTearms" type="text" placeholder="space, football, painting "  className={classes.textInput}></input>
                <div style={{color: theme.font}} className={classes.h3}> choose up to 5 words seperated with comma </div>

                <div style={{color: theme.font}} className={classes.h2}> Collection: </div>
                <input style={{backgroundColor: theme.color1}} id="collection" type="text" placeholder="Collection Name" list="data" onChange ={checkCollectionExist} className={classes.textInput}></input>
                {notMyCollection && <div className={classes.fehlermeldung}> this collection name is already taken </div> }
                <div style={{color: theme.font}} className={classes.h3}> add to old collection or create new one </div>

                <datalist id="data"> {collectionList.map( item =>   <option  value={item.collection} /> )}  </datalist>


                <div style={{color: theme.font}} className={classes.h2}> Description: </div>
                <textarea style={{backgroundColor: theme.color1}} id="description" type="text" placeholder="Tell the world, what you want to say about this item. " className={classes.textInputBig}></textarea>

                <div style={{color: theme.font}} className={classes.h2}> External link: </div>
                <input style={{backgroundColor: theme.color1}} id="externalLink" type="text" placeholder="https://yoursite.io" className={classes.textInput}></input>


                { dataMissing && <div className={classes.fehlermeldung}>fill all required forms</div>}

                <div style={{color: theme.font}} className={classes.h2}> Want to sell this NFT? Set a Price in Ether: </div>
                <input style={{backgroundColor: theme.color1}} id="preis" type="text" placeholder="0.1 ether" className={classes.textInput}></input>

                <div className={classes.createButton}>
                    <ButtonGroup variant="outlined" >
                        <Button id="offchainCreate" sx={{height:'60px'}}variant="contained" onClick={onCreateButtonClicked}> Create offchain     </Button>
                        <Button id="onchainCreate" onClick={onCreateButtonClicked}> Create onchain   </Button>
                    </ButtonGroup>
                </div>
                <div className={classes.place}></div>

            </div>

                  

        {alertOpen && <Collapse in={alertOpen}> <Alert autoHideDuration={1000} onClose={() => {setAlertOpen(false)}} severity="success" color="info" sx={{position:'fixed', right:'0',bottom:'10px'}}> Minting Process takes up to 2 min</Alert> </Collapse> }


        </div>
    );
}

export default CreateNFT;
