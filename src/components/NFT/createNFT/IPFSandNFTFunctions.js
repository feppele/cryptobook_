
import { create } from 'ipfs-http-client'
import { useHistory } from "react-router-dom";
import {NFTContract,NFTContractAddress} from '../../../web3/NFTContract';


//ipfs upload
async function ipfsUpload(metaData,file){ //  MetaData json: {itemName, collection, description, extLink}
    const client = create('https://ipfs.infura.io:5001/api/v0')

    //first upload image
    try {
        const added = await client.add(file)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        console.log(url);

        //{itemName, collection, description, extLink} + image: url
        metaData.image = url;

        const JSONMetadata=JSON.stringify(metaData);

        // and then JSON STRING with Image and Metadata
        try {
          const added = await client.add(JSONMetadata)
          var metaDataURL = `https://ipfs.infura.io/ipfs/${added.path}`
          console.log("metadata:    " + metaDataURL);

          return metaDataURL;

        } catch (error) {
          console.log('Error uploading file: ', error)
        }
    } catch (error) {
        console.log('Error uploading file: ', error)
    }

}



async function createNFT(metaDataURL,id){

    const owner = await window.web3.currentProvider.selectedAddress;
    const response = await NFTContract.methods.mintToken(owner,metaDataURL,id).send({
        from: owner,
        to: NFTContractAddress
    })

    const tokenId = response.events.Transfer.returnValues.tokenId;
    const txHash = response.events.Transfer.transactionHash;

    return [txHash,tokenId];
}

export {ipfsUpload};
export {createNFT};