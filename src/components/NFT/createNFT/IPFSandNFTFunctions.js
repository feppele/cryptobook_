
import { create } from 'ipfs-http-client'
import { useHistory } from "react-router-dom";
import {NFTContract,NFTContractAddress} from '../../../web3/NFTContract';
import {mintNFTInfura} from '../../../web3/SendEtherInfura'

//ipfs upload
async function ipfsUpload(metaData,file){ //  MetaData json: {itemName, collection, description, extLink}
    
    // This is old. Infura changed: now you have to auth so you need projectId and secret
    //const client = create('https://ipfs.infura.io:5001/api/v0')

    const projectId = '2El3apLGqvfQW4KIlNWEpc6pUrj';   // <---------- your Infura Project ID
    const projectSecret = '0b4d9df7b83996fdcc1789724cb57e2d';  // <---------- your Infura Secret
    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
    const client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: auth,
        },
    });

    //first upload image
    try {
        const added = await client.add(file)
        // url changed, before was: https://ipfs.infura.io
        const url = `https://ipfs.io/ipfs/${added.path}`
        console.log("image URL: " + url);

        //{itemName, collection, description, extLink} + image: url
        metaData.image = url;

        const JSONMetadata=JSON.stringify(metaData);

        // and then JSON STRING with Image and Metadata
        try {
          const added = await client.add(JSONMetadata)
          // url changed, before was: https://ipfs.infura.io
          var metaDataURL = `https://ipfs.io/ipfs/${added.path}`
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

    const userdata = JSON.parse(sessionStorage.getItem("userdata"))
    const owner = userdata.address
    if(userdata.metamask === true){// Metamask

        const response = await NFTContract.methods.mintToken(owner,metaDataURL,id).send({
            from: owner,
            to: NFTContractAddress
        })
        const tokenId = response.events.Transfer.returnValues.tokenId;
        const txHash = response.events.Transfer.transactionHash;

    }else{// MCB Wallet

        const tx = await mintNFTInfura(owner, userdata.privatekey, id, metaDataURL)
        return tx;

    }
        const tokenId = "braucht man nichtmehr weil tokenId schon davor bestimmt wird"
        const txHash = "..."

    return [txHash,tokenId];
}

export {ipfsUpload};
export {createNFT};