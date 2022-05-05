import React, {useState} from 'react';
import classes from './ImageUpload.module.css';
import image from '../../../images/image.png';
import {NFTContract,NFTContractAddress} from '../../../web3/NFTContract';
//ipfs upload
import { create } from 'ipfs-http-client'
import { useHistory } from "react-router-dom";
import FinishedNFT from '../finishedNFTModal/FinishedNFT'


function ImageUpload(props){
  const history =useHistory();
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};


  var metaDataURL;

    //ipfs upload
    async function ipfsUpload(file){
        const client = create('https://ipfs.infura.io:5001/api/v0')

        try {
            const added = await client.add(file)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            console.log(url);

            const JSONMetadata=JSON.stringify({ name: props.name, image: url });

            // add JSON STRING with Image and Metadata
            try {
              const added = await client.add(JSONMetadata)
              metaDataURL = `https://ipfs.infura.io/ipfs/${added.path}`
              console.log("metadata:    " + metaDataURL);

            } catch (error) {
              console.log('Error uploading file: ', error)
            }

          } catch (error) {
            console.log('Error uploading file: ', error)
          }

    }

    if(props.name && isSelected){
      setIsSelected(false);
      ipfsAndBlockchain();
  }

    async function ipfsAndBlockchain(){
      await ipfsUpload(selectedFile);
      await createNFT();

    }

    async function createNFT(){

      const owner = await window.web3.currentProvider.selectedAddress;
      NFTContract.methods.mintToken(owner,metaDataURL).send({
        from: owner,
        to: NFTContractAddress
        }).then( tokenID =>{localStorage.setItem("TokenID",tokenID)});

      history.push("/finishedNFT");
    }


    // input Tag has ugly Button. So make input invisible in css. Create new button and ref!! on click to input tag
    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
      };

	return(

        // Image Upload
        <div className={classes.imageUploadWrapper}>

            <input ref={hiddenFileInput} id ="imageInput" type="file" name="file" onChange={changeHandler}  className={classes.imageInput}/>
            <div onClick={handleClick} className={classes.hiddenFileButton}></div>

            { !isSelected && <img src ={image} className={classes.coverImage}></img>}
            { isSelected &&   <img src={URL.createObjectURL(selectedFile)} className={classes.image}></img>  }

		    </div>
        //- Image Upload
	)

}

export default ImageUpload;