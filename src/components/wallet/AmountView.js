import * as React from 'react';

import {useEffect,useRef,useState,useContext} from 'react'
import classes from './AmountView.module.css'

import {getProfilePicURL} from '../../node/images'
import {shortAddr} from '../../web3/LoadingFunctions'
import etherSign from '../../images/ethereum.png'

//material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';


//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

//User Context
import {UserContext} from '../../UserProvider'

import {_web3} from '../../web3/Web3'
var web3 = _web3.mcbWallet
var userdata = JSON.parse(sessionStorage.getItem("userdata"))
console.log(userdata)
if(userdata !== null){
    userdata.metamask === true ? web3 = _web3.metamask : web3 = _web3.mcbWallet
}

const ethPrice = require('eth-price');

//props.walletOpen:Boolean
//props.closeWalletFunc:Function
function AmountView(props) {
    userdata = JSON.parse(sessionStorage.getItem("userdata"))
    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    const [ethBalance,setEthBalance] = useState("")
    const [ethPrice1,setEthPrice] = useState("")

    useEffect(() => {
        web3.eth.getBalance(userdata.address).then(bal=>{setEthBalance(web3.utils.fromWei(bal,"ether").slice(0,6))})
    },[])

    ethPrice("usd").then(res=>{
        const price=parseFloat(res.toString().split(":").pop())
        setEthPrice(price)
    })


  return (
        <div className={classes.integration}>
            {/*totalAmount*/}
            <div style={{backgroundColor:theme.color2,border:theme.border}} className={classes.totalAmount}>

                <div style={{marginTop:'10px',opacity:'0.6',color:theme.font}}> Total Amount</div>
                <div style={{fontSize:'24px',marginBottom:'10px',color:theme.font}}>{(ethPrice1* ethBalance).toFixed(2) + " USD"}</div>

                <div style={{width:'100%',borderTop:'1px solid rgb(212, 212, 212)',borderTop:theme.border}}>
                    <Button sx={{width:'100%'}}><div style={{fontSize:'15px'}}>Add Funds</div></Button>
                </div>

            </div>
            {/*asset*/}
            <div style={{backgroundColor:theme.color2,border:theme.border}} className={classes.asset}>

                <div style={{display: 'flex',margin:'10px',gap:'5px',color:theme.font}}>
                    <img src={etherSign} style={{height: '22px',width: 'auto'}}></img>
                    ETH
                </div>

                <div style={{margin:'10px',fontSize:'18px',color:theme.font}}>{ethBalance}</div>
            </div>


        </div>
  );
}


export default AmountView