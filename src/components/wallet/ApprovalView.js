import * as React from 'react';

import {useEffect,useRef,useState,useContext} from 'react'
import classes from './ApprovalView.module.css'

import {getProfilePicURL} from '../../node/images'
import {shortAddr} from '../../web3/LoadingFunctions'
import etherSign from '../../images/ethereum.png'

//material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';


//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

//User Context
import {UserContext} from '../../UserProvider'

import {sendEtherInfura} from '../../web3/SendEtherInfura'
import AmountView from './AmountView'

import {_web3} from '../../web3/Web3'
var web3 = _web3.mcbWallet
var userdata = JSON.parse(sessionStorage.getItem("userdata"))
console.log(userdata)
if(userdata !== null){
    userdata.metamask === true ? web3 = _web3.metamask : web3 = _web3.mcbWallet
}

const ethPrice = require('eth-price');


function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
}
function readInt(array) {
    var value = 0;
    for (var i = 0; i < array.length; i++) {
        value = (value * 256) + array[i];
    }
    return value;
}

// Just needs props.type and props.tx to sign tx and geht txInfos
// close: props.closeWalletFunc()
// props.type: "send Ether" oder "buy Offchain NFT"
function ApprovalView(props) {

    userdata = JSON.parse(sessionStorage.getItem("userdata"))
    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    const [openAmountView,setopenAmountView] =useState(false)


    async function approve(){
        signTx(props.tx,userdata.privatekey)
        //props.closeWalletFunc()
        setopenAmountView(true)
        // for Snackbar
        setState({ ...state, open: true, message:"Transaction approved... This may take up to 2 min.", })

    }

    async function cancel(){
        //props.closeWalletFunc()
        setopenAmountView(true)
        // for Snackbar
        setState({ ...state, open: true, message:"Transaction canceled.", })

    }

    async function signTx(tx,privateKey){
        privateKey = privateKey.slice(2,privateKey.length) // remove 0x
        privateKey = Buffer.from(privateKey,'hex')
        tx.sign(privateKey)
        const serializedTransaction = tx.serialize()
        const raw = '0x' + serializedTransaction.toString('hex')
        return await web3.eth.sendSignedTransaction(raw ).on('receipt', console.log)
    }

    // load all Tx Data
    const [txData,setTxData] = useState({})
    useEffect(()=>{
        const tx = props.tx
        console.table(tx._fields)
        console.table(tx.raw)

        
        if(true){
            const to = shortAddr(  "0x" + toHexString(tx.raw[3])  )
            const value = web3.utils.fromWei(readInt(tx.raw[4]).toString(),"ether")
            const gasLimit =  parseInt(  toHexString(tx.raw[2])  ,16).toString()  
            var gasPrice = web3.utils.fromWei(  parseInt(  toHexString(tx.raw[1])  ,16).toString()  ,"ether") // in Ether for calc
            const fee = gasLimit*gasPrice
            gasPrice = web3.utils.fromWei(  parseInt(  toHexString(tx.raw[1])  ,16).toString()  ,"gwei") // in Gwei

            //const fee ="a"
            // calc Fee in USD
            ethPrice("usd").then(res=>{
                const ethPrice=parseFloat(res.toString().split(":").pop())
                const feeUSD =(ethPrice*parseFloat(fee)).toFixed(2);

                setTxData({to:to,value:value,fee:fee,feeUSD:feeUSD,gasLimit:gasLimit,gasPrice:gasPrice})
            })
        }

    },[])

    // Snackbar
    const [state, setState] = useState({ open: false, Transition: Slide, });
    const handleClose = () => { setState({ ...state, open: false }); };
    const handleClick = (Transition) => () => { setState({ open: true, Transition, })}


  return (

    <div style ={{width: "100%"}}> 

        {openAmountView && <AmountView/> }

        <Snackbar open={state.open} onClose={handleClose} TransitionComponent={state.Transition} message={state.message} key={state.Transition.name} />

        {!openAmountView &&
        <div className={classes.integration}>

            {/*totalAmount*/}
            <div style={{backgroundColor:theme.color2,border:theme.border}} className={classes.box}>

                <div style={{color:theme.font,borderBottom: theme.border,fontSize:'20px'}} className={classes.action}>
                    {props.type}
                </div>

                <div style={{borderBottom: theme.border}} className={classes.details}>

                    <div style={{color:theme.font}} className={classes.data} >  {"To: " }      <div> {txData.to} </div>                      </div>  
                    <div style={{color:theme.font}} className={classes.data} >  {"Value: " }   <div> {txData.value + " Ether"} </div>        </div>
                    <div style={{color:theme.font}} className={classes.data} >  {"Max fee: "}  <div> {txData.fee + " Ether"} </div>         </div>
                    <div style={{color:theme.font}} className={classes.data} >  {" - in USD: "}  <div> {txData.feeUSD + " USD"} </div>        </div>
                    <div style={{color:theme.font}} className={classes.data} >  {"gasLimit: "} <div> {txData.gasLimit } </div>   </div>
                    <div style={{color:theme.font}} className={classes.data} >  {"gasPrice: "} <div> {txData.gasPrice + " Gwei"} </div>   </div>


                </div>

                <div className={classes.approve}>

                    <Button onClick={cancel} sx={{width:'90px'}} variant="outlined"> Cancel</Button>
                    <Button onClick={approve} sx={{width:'90px'}} variant="contained">  Approve</Button>

                </div>

            </div>

        </div>
        }
    </div>
  );
}


export default ApprovalView;