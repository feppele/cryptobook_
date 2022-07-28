import {NFTContract,NFTContractAddress} from './NFTContract';
import {BuyNFTContract,BuyNFTContractAddress} from './BuyNFT'
import {UserContract,userContractAddress} from './UserContract'

import {_web3} from '../web3/Web3'
var web3 = _web3.mcbWallet
const userdata = JSON.parse(sessionStorage.getItem("userdata"))
if(userdata !== null){
    userdata.metamask === true ? web3 = _web3.metamask : web3 = _web3.mcbWallet
}

const ONE_GWEI = 1e9;
const netzwerk = 'ropsten'; // 'mainnet' or 'ropsten'
var Tx = require('ethereumjs-tx').Transaction




export async function sendEtherInfura(from,to,privateKey,value){

    value = parseInt(value)

    privateKey = privateKey.slice(2,privateKey.length) // remove 0x
    privateKey = Buffer.from(privateKey,'hex')

    const gasPrice = await web3.eth.getGasPrice()

    const txCount = await web3.eth.getTransactionCount(from, (err,txCount) =>  {return txCount})

    const nonce = web3.utils.toHex(txCount);
    const txObject = {
    nonce: nonce,
    to: to,
    value: value,
    gasLimit: web3.utils.toHex(21000),
    gasPrice:web3.utils.toHex(gasPrice)
    }
    //Create TRANSACTION and send to ApprovalView to sign
    const tx =  new Tx(txObject,{'chain': netzwerk}) 

    return tx

    // tx.sign(privateKey)
    // const serializedTransaction = tx.serialize()
    // const raw = '0x' + serializedTransaction.toString('hex')
    // return await web3.eth.sendSignedTransaction(raw ).on('receipt', console.log)

}


export async function sendNFTInfura(from,to,privateKey,tokenid){

    privateKey = privateKey.slice(2,privateKey.length) // remove 0x
    privateKey = Buffer.from(privateKey,'hex')

    const gasPrice = await web3.eth.getGasPrice()

    const txCount =  await web3.eth.getTransactionCount(from)

    const nonce = web3.utils.toHex(txCount);
    const txObject = {
    nonce: nonce,
    to: NFTContractAddress,
    from:from,
    gas: web3.utils.toHex('135778'),
    gasPrice:web3.utils.toHex(gasPrice),
    data: NFTContract.methods.transferFrom(from,to,tokenid).encodeABI()
    }
    //SIGN TRANSACTION
    const tx =  new Tx(txObject,{'chain': netzwerk}) 
    return tx
    // tx.sign(privateKey)
    // const serializedTransaction = tx.serialize()
    // const raw = '0x' + serializedTransaction.toString('hex')
    // web3.eth.sendSignedTransaction(raw ).on('receipt', console.log)

}


export async function mintNFTInfura(from,privateKey,id,metaDataURL){

    privateKey = privateKey.slice(2,privateKey.length) // remove 0x
    privateKey = Buffer.from(privateKey,'hex')

    const gasPrice = await web3.eth.getGasPrice()

    const txCount=  await web3.eth.getTransactionCount(from, (err,txCount) =>  {return txCount})

    const nonce = web3.utils.toHex(txCount);
    const txObject = {
        nonce: nonce,
        to: NFTContractAddress,
        from: from,
        gas: web3.utils.toHex('257965'),
        gasPrice:web3.utils.toHex(gasPrice),
        data: NFTContract.methods.mintToken(from,metaDataURL,id).encodeABI()
    }
    //SIGN TRANSACTION
    const tx =  new Tx(txObject,{'chain': netzwerk}) 
    return tx;
    // console.log(tx)
    // tx.sign(privateKey)
    // const serializedTransaction = tx.serialize()
    // const raw = '0x' + serializedTransaction.toString('hex')
    // return web3.eth.sendSignedTransaction(raw ).on('receipt', console.log)

}


export async function buyTokenOffInfura(privateKey, from,_metadataURI,_tokenId,_seller,_preis){
    
    privateKey = privateKey.slice(2,privateKey.length) // remove 0x
    privateKey = Buffer.from(privateKey,'hex')

    const gasPrice = await web3.eth.getGasPrice()

    const txCount=  await web3.eth.getTransactionCount(from, (err,txCount) =>  {return txCount})

    const nonce = web3.utils.toHex(txCount);
    const txObject = {
        nonce: nonce,
        to: BuyNFTContractAddress,
        from: from,
        value: web3.utils.toHex(web3.utils.toWei(_preis,"ether")),
        gas: web3.utils.toHex('257965'),
        gasPrice:web3.utils.toHex(gasPrice),
        data: BuyNFTContract.methods.buyTokenOff(_metadataURI,_tokenId,_seller).encodeABI()
    }
    //SIGN TRANSACTION
    const tx =  new Tx(txObject,{'chain': netzwerk}) 
    return tx

    // tx.sign(privateKey)
    // const serializedTransaction = tx.serialize()
    // const raw = '0x' + serializedTransaction.toString('hex')
    // return web3.eth.sendSignedTransaction(raw ).on('receipt', console.log)

}


export async function buyTokenOnInfura(privateKey, from, _tokenId, _seller, _creator, _preis){
    
    privateKey = privateKey.slice(2,privateKey.length) // remove 0x
    privateKey = Buffer.from(privateKey,'hex')

    var gasPrice = await web3.eth.getGasPrice()

    const txCount=  await web3.eth.getTransactionCount(from, (err,txCount) =>  {return txCount})

    const nonce = web3.utils.toHex(txCount);
    const txObject = {
        nonce: nonce,
        to: BuyNFTContractAddress,
        value: web3.utils.toHex(web3.utils.toWei(_preis,"ether")),
        gas: web3.utils.toHex('257965'),
        gasPrice:web3.utils.toHex(gasPrice),
        data: BuyNFTContract.methods.buyTokenOn(_seller,_tokenId,_creator).encodeABI()
    }
    //SIGN TRANSACTION
    const tx =  new Tx(txObject,{'chain': netzwerk}) 
    return tx
    // console.log(tx)
    // tx.sign(privateKey)
    // const serializedTransaction = tx.serialize()
    // const raw = '0x' + serializedTransaction.toString('hex')
    // return web3.eth.sendSignedTransaction(raw ).on('receipt', console.log)

}



export async function updateFriendsfura(privateKey, from, name, friendaddress){
    
    privateKey = privateKey.slice(2,privateKey.length) // remove 0x
    privateKey = Buffer.from(privateKey,'hex')

    var gasPrice = await web3.eth.getGasPrice()

    const txCount=  await web3.eth.getTransactionCount(from, (err,txCount) =>  {return txCount})

    const nonce = web3.utils.toHex(txCount);
    const txObject = {
        nonce: nonce,
        to: userContractAddress,
        gas: web3.utils.toHex('257965'),
        gasPrice:web3.utils.toHex(gasPrice),
        data: UserContract.methods.updateFriends(name,friendaddress).encodeABI()
    }
    //SIGN TRANSACTION
    const tx =  new Tx(txObject,{'chain': netzwerk}) 
    return tx;
    // console.log(tx)
    // tx.sign(privateKey)
    // const serializedTransaction = tx.serialize()
    // const raw = '0x' + serializedTransaction.toString('hex')
    // return web3.eth.sendSignedTransaction(raw ).on('receipt', console.log)

}


function callbackFunc(){}
