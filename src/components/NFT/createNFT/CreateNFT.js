import classes from './CreateNFT.module.css';
import React, {useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";
import ImageUpload from './ImageUpload';
import TextInput from '../../standart/TextInput';
import BasicButton2 from '../../standart/BasicButton2';
import FinishedNFT from '../finishedNFTModal/FinishedNFT';
import FinishedNFTBackdrop from '../finishedNFTModal/FinishedNFTBackdrop';

import{uploadNFTImageToServer} from '../../../node/images'

import Square from './Square';
// Image Upload
import image from '../../../images/image.png';

//IPFS and Blockchain Functions
import {ipfsUpload,createNFT} from './IPFSandNFTFunctions';


import {createCollection,getMyCollections,doesCollectionExist,getNFTInfoFromTokenId,createNFTInfo,getAllTokenIdFromCollection} from '../../../node/NFTData'


import {getCurrentUser} from '../../../web3/HelperFunctions'




function CreateNFT(props){

    const history =useHistory();

    const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
    const [dataMissing,setDataMissing] = useState(false);
    const [creationFinish,setCreationFinish] = useState(false);
    const [tokenId, setTokenId] = useState(false);
    const [txHash, setTxHash] = useState(false);
    const [collectionList,setConnectionList]=useState([]);
    const [notMyCollection,setNotMyCollection] = useState(false);


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


    console.log(selectedFile);

    // einfach erweiterbar: einfach in metaData weitere elemente hinzufügen
    async function onCreateButtonClicked(){

        const creator = await getCurrentUser();

        if(notMyCollection){ return;}

        // create MetaData json: {itemName, collection, description, extLink}

        const itemName = await document.getElementById("itemName").value;
        const collection = await document.getElementById("collection").value;
        const description = await document.getElementById("description").value;
        const extLink = await document.getElementById("externalLink").value;
        const searchTearms = await document.getElementById("searchTearms").value;

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
        document.getElementById("itemName").value ="";
        document.getElementById("collection").value ="";
        document.getElementById("description").value ="";
        document.getElementById("searchTearms").value ="";
        document.getElementById("externalLink").value ="";

        //IPFS upload
        const metaDataURL = await ipfsUpload(metaData,imageFile);

        console.log("URL RETURN :" +metaDataURL);


        //create NFT with metadata return from IPFS upload
        const response = await createNFT(metaDataURL); // returns tokenId when success

        await setTxHash(response[0]);
        await setTokenId(response[1]);
        const tokenId =response[1];

        console.log("returnd Token id: " + tokenId);
        console.log("txhash " + response[0]);

        // Upload image to Server with tokenID
        uploadNFTImageToServer(selectedFile,tokenId);



        // upload to collection database
        if(collection !== ""){
            await createCollection(collection);
        }
        // upload to NFT Info
        await createNFTInfo(tokenId,itemName,searchTearms,collection);


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


    function searchterm(e){
        const searchTearms =  document.getElementById("searchTearms").value;
        console.log(searchTearms)
    }


    return (

        <div className={classes.container}>

            <div className={classes.container2}>

            {creationFinish && <FinishedNFT tokenId={tokenId} txHash={txHash} />}
            {creationFinish && <FinishedNFTBackdrop onBackDropClicked={onBackDropClicked}/>}

                <div className={classes.h1}>Create new Item</div>
                <div className={classes.h2}>Upload your Image: </div>

                {/* Image Upload */}
                <div id="imageWrap"className={classes.imageUploadWrapper}>
                    <input ref={hiddenFileInput} id ="imageInput" type="file" name="file" onChange={changeHandler}  className={classes.imageInput}/>
                    <div onClick={handleClick} className={classes.hiddenFileButton}></div>

                    { !isSelected && <img src ={image} className={classes.coverImage}></img>}
                    { isSelected &&   <img id="image" src={URL.createObjectURL(selectedFile)} className={classes.image}></img>  }
		        </div>
                {/* Image Upload */}



                <div className={classes.h2}> Name: </div>
                <input id="itemName"type="text" placeholder="Item name" className={classes.textInput}></input>

                <div className={classes.h2}> Search Tearms: </div>
                <input id="searchTearms" type="text" placeholder="space, football, painting " onChange ={searchterm} className={classes.textInput}></input>
                <div className={classes.h3}> choose up to 5 words seperated with comma </div>

                <div className={classes.h2}> Collection: </div>
                <input id="collection" type="text" placeholder="Collection Name" list="data" onChange ={checkCollectionExist} className={classes.textInput}></input>
                {notMyCollection && <div className={classes.fehlermeldung}> this collection name is already taken </div> }
                <div className={classes.h3}> add to old collection or create new one </div>

                <datalist id="data"> {collectionList.map( item =>   <option  value={item.collection} /> )}  </datalist>


                <div className={classes.h2}> Description: </div>
                <textarea id="description" type="text" placeholder="Tell the world, what you want to say about this item. " className={classes.textInputBig}></textarea>

                <div className={classes.h2}> External link: </div>
                <input id="externalLink" type="text" placeholder="https://yoursite.io" className={classes.textInput}></input>


                { dataMissing && <div className={classes.fehlermeldung}>fill all required forms</div>}
                <BasicButton2 onButtonClicked={onCreateButtonClicked} text ="Create"/>


              

            </div>
        </div>
    );
}

export default CreateNFT;
