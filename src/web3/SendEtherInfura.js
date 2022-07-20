import {NFTContract,NFTContractAddress} from './NFTContract';

const Web3 =require('web3');
const ropstenInfura = 'wss://ropsten.infura.io/ws/v3/13185221b99744cda86c46e02a3ded8f';
var ropstenAlchemy='wss://eth-ropsten.alchemyapi.io/v2/YdR1ysbKAahCXjlkJTCwbikRTC9Ap9wp'
//const web3 = 'https://ropsten.infura.io/v3/13185221b99744cda86c46e02a3ded8f'

const ONE_GWEI = 1e9;
const netzwerk = 'ropsten'; // 'mainnet' or 'ropsten'
var Tx = require('ethereumjs-tx').Transaction
var web3 = new Web3(new Web3.providers.WebsocketProvider(ropstenAlchemy));



export async function sendEtherInfura(from,to,privateKey,value){

    value = parseInt(value)

    privateKey = privateKey.slice(2,privateKey.length) // remove 0x
    privateKey = Buffer.from(privateKey,'hex')

    const gasPrice = await web3.eth.getGasPrice()

    web3.eth.getTransactionCount(from, (err,txCount) =>  {

        const nonce = web3.utils.toHex(txCount);
        const txObject = {
        nonce: nonce,
        to: to,
        value: value,
        gasLimit: web3.utils.toHex(21000),
        gasPrice:web3.utils.toHex(gasPrice)
        }
        //SIGN TRANSACTION
        const tx =  new Tx(txObject,{'chain': netzwerk}) 
        tx.sign(privateKey)
        const serializedTransaction = tx.serialize()
        const raw = '0x' + serializedTransaction.toString('hex')
        web3.eth.sendSignedTransaction(raw ).on('receipt', console.log)
    })
}


export async function sendNFTInfura(from,to,privateKey,tokenid){

    privateKey = privateKey.slice(2,privateKey.length) // remove 0x
    privateKey = Buffer.from(privateKey,'hex')

    const gasPrice = await web3.eth.getGasPrice()

    web3.eth.getTransactionCount(from, (err,txCount) =>  {

        const nonce = web3.utils.toHex(txCount);
        const txObject = {
        nonce: nonce,
        to: NFTContractAddress,
        gasPrice:web3.utils.toHex(gasPrice),
        data: NFTContract.methods.transferFrom(from,to,tokenid).send({from:from})
        }
        //SIGN TRANSACTION
        const tx =  new Tx(txObject,{'chain': netzwerk}) 
        tx.sign(privateKey)
        const serializedTransaction = tx.serialize()
        const raw = '0x' + serializedTransaction.toString('hex')
        web3.eth.sendSignedTransaction(raw ).on('receipt', console.log)
    })
}