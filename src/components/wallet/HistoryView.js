import {useEffect,useRef,useState,useContext} from 'react'
import classes from './HistoryView.module.css'
//material UI
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import receiveImg from '../../images/download.png'
//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'
import { ethers } from "ethers";
import {shortAddr} from '../../web3/LoadingFunctions'

import {_web3} from '../../web3/Web3'
var web3 = _web3.mcbWallet
var userdata = JSON.parse(sessionStorage.getItem("userdata"))
if(userdata !== null){ userdata.metamask === true ? web3 = _web3.metamask : web3 = _web3.mcbWallet }
const ethPrice = require('eth-price');


const CHAIN = "ropsten"
const URL = "https://ropsten.etherscan.io/tx/"

function numberToDate(number){
    switch(number){
        case 1:
        return "Jan"
        break;
        case 2:
        return "Feb"
        break;
        case 3:
        return "Mar"
        break;
        case 4:
        return "Apr"
        break;
        case 5:
        return "May"
        break;
        case 6:
        return "Jun"
        break;
        case 7:
        return "Jul"
        break;
        case 8:
        return "Aug"
        break;
        case 9:
        return "Sep"
        break;
        case 10:
        return "Oct"
        break;
        case 11:
        return "Nov"
        break;
        case 12:
        return "Dez"
        break;
    } 
}

function HistoryView(props) {

    userdata = JSON.parse(sessionStorage.getItem("userdata"))
    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    //tx.hash,from,to,value,data
    const [txs,setTxs] = useState([])
    async function getTransactions() {
        let provider = new ethers.providers.EtherscanProvider(CHAIN);
        let history = await provider.getHistory(userdata.address);
        history = history.reverse() // latest on top
        setTxs(history)
        console.log(history)
    }

    useEffect(() => {
        getTransactions()


    },[props])

    function openEtherscan(hash){
        window.open(URL + hash )
    }

  return (
        <div  className={classes.integration}>

            <div className={classes.box} style={{backgroundColor:theme.color2,border:theme.border}}>
                <div className={classes.header} style={{color:theme.font}}> 
                    History
                </div>

                <div className={classes.list} style={{borderTop:theme.border}}>
                {txs.map(tx =>{

                    const value = web3.utils.fromWei(web3.utils.hexToNumberString(tx.value._hex),"ether") +" Eth"
                    const action = tx.from.toLowerCase() === userdata.address ? "Send" : "Receive"
                    const actionImg = tx.from.toLowerCase() === userdata.address ? <div style={{filter:theme.png}} className={classes.icon}><ArrowForwardIcon  fontSize="large"/></div> : <img style={{filter:theme.png, height:'25px',marginLeft:'5px'}} src={receiveImg}></img>
                    const date = numberToDate(parseInt(new Date(tx.timestamp*1000).getUTCMonth())  +1 ) +" "+ new Date(tx.timestamp*1000).getUTCDate() +"."
                    const contractInteraction = tx.data==="0x" ? "":"Contract Interaction"

                    const toFrom = tx.from.toLowerCase() === userdata.address ? `to: ${shortAddr(tx.to)}` : `to: ${shortAddr(tx.from)}`
                    return(
                    <div style={{borderBottom:theme.border}} className={classes.txElement} onClick={()=>{ openEtherscan(tx.hash) } }>

                        <div style={{display:'flex',gap:'10px'}}>
                        {actionImg}
                        <div style={{display:'flex',flexDirection:'column',gap:'4px',fontSize:'18px'}}>
                            <div style={{color:theme.font}}>{action } </div>

                            <div style={{display:'flex',gap:"10px"}}> 
                                <div className={classes.time}> 
                                    {date}  
                                </div>  
                                <div style={{color:theme.font}} className={classes.fromto}>{toFrom }</div>  
                                <div  className={classes.contractInteraction}> {contractInteraction}</div>
                            </div>

                        </div>
                        </div>

                        <div>
                            {}
                        </div>

                        <div style={{display:'flex',flexDirection:'column',gap:'4px',position:'absolute',left:'200px',top:'16px',width:'120px'}}>
                            <div style={{color:theme.font,display:'flex',width:'100%',justifyContent:'flex-end',fontSize:'18px'}}>  {value} </div>

                            <div style={{visibility: 'hidden'}}>
                                {" a"}
                            </div>

                        </div>

                    </div>)


                })}
                </div>


            </div>

        </div>
  );
}


export default HistoryView