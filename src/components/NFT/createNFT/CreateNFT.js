import classes from './CreateNFT.module.css';
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";


import ImageUpload from './ImageUpload';
import TextInput from '../../standart/TextInput';
import BasicButton2 from '../../standart/BasicButton2';
import FinishedNFT from '../finishedNFTModal/FinishedNFT';
import FinishedNFTBackdrop from '../finishedNFTModal/FinishedNFTBackdrop';

import Square from './Square';
// Image Upload
import image from '../../../images/image.png';

//IPFS and Blockchain Functions
import {ipfsUpload,createNFT} from './IPFSandNFTFunctions';


function CreateNFT(){


    const history =useHistory();

    // Image
    const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
    const [dataMissing,setDataMissing] = useState(false);
    const [creationFinish,setCreationFinish] = useState(false);
    const [tokenId, setTokenId] = useState(false);
    const [txHash, setTxHash] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

    // input Tag has ugly Button. So make input invisible in css. Create new button and ref!! on click to input tag
    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };





    async function onCreateButtonClicked(){

        const itemName = await document.getElementById("itemName").value;
        const imageFile = await selectedFile;

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

        //IPFS upload
        const metaDataURL = await ipfsUpload(itemName,imageFile);

        console.log("URL RETURN :" +metaDataURL);

        // create NFT with metadata return from IPFS upload
        const response = await createNFT(metaDataURL);

        await setTxHash(response[0]);
        await setTokenId(response[1]);

        console.log("returnd Token id: " + tokenId);
        console.log("txhash " + txHash);

        //open finsihed NFT in Modal
        setCreationFinish(true);



        }

    }

    function onBackDropClicked(){

        setCreationFinish(false);
    }

    function test(){
        if(isSelected){
            console.log(URL.createObjectURL(selectedFile));
        }
    }test();
    


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

                { dataMissing && <div className={classes.fehlermeldung}>fill all required forms</div>}

                <BasicButton2 onButtonClicked={onCreateButtonClicked} text ="Create"/>


                { isSelected &&<Square img={URL.createObjectURL(selectedFile)}/> }

            </div>
        </div>
    );
}

export default CreateNFT;
