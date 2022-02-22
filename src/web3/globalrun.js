import {ipfsUpload,createNFT} from './../components/NFT/createNFT/IPFSandNFTFunctions';
import{uploadNFTImageToServer} from '../node/images'
import {createCollection,getMyCollections,doesCollectionExist,getNFTInfoFromTokenId,createNFTInfo,getAllTokenIdFromCollection} from '../node/NFTData'







    async function rest(metaDataURL,selectedFile,collection,itemName,searchTearms){

        // create NFT with metadata return from IPFS upload
        const response = await createNFT(metaDataURL); // returns tokenId when success


        const txHash = await response[0];

        const tokenId =response[1];

        console.log("returnd Token id: " + tokenId);
        console.log("txhash " + txHash);

        // Upload image to Server with tokenID
        uploadNFTImageToServer(selectedFile,tokenId);



        // upload to collection database
        createCollection(collection);
        // upload to NFT Info
        createNFTInfo(tokenId,itemName,searchTearms,collection);


        //open finsihed NFT in Modal
        //setCreationFinish(true);

    }


    export{rest}

