import * as React from 'react';

import {useEffect,useRef,useState,useContext} from 'react'
import classes from './Wallet.module.css'

import {getProfilePicURL} from '../../node/images'
import {shortAddr} from '../../web3/LoadingFunctions'
import etherSign from '../../images/ethereum.png'

//material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { height } from '@mui/material/node_modules/@mui/system';

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'


const Web3 =require('web3');
const web3 = new Web3(window.ethereum);

const ethPrice = require('eth-price');

//props.walletOpen:Boolean
//props.closeWalletFunc:Function
export default function Wallet(props) {

        // Night Mode
        const nightMode = useContext(NightContext)
        const [theme,setTheme] =useState(themes.bright)
        useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    const [profilePicURL,setURL] = useState("")
    const [addr,setAddr] = useState({})//{long:String,short:String}
    const [ethBalance,setEthBalance] = useState("")

    const [ethPrice1,setEthPrice] = useState("")

    useEffect(() => {

        getProfilePicURL("me").then(res=>{setURL(res)})
        window.ethereum.request({method: 'eth_accounts'}).then(res=>{setAddr({long:res,short:shortAddr(res)})})
        window.ethereum.request({method: 'eth_accounts'}).then(res=>{web3.eth.getBalance(res[0]).then(res=>{setEthBalance(web3.utils.fromWei(res,"ether").slice(0,6))})})
    },[])

    ethPrice("usd").then(res=>{

        const price=parseFloat(res.toString().split(":").pop())
        setEthPrice(price)
        
    })

    const wallet = useRef()
    const backdrop = useRef()

    console.log("wallet")

    function closeWallet(){

        wallet.current.style.right= '-500px';
        backdrop.current.style.opacity= '0'

        setTimeout(()=>{props.closeWalletFunc()},500)
    }



  return (

    <div className={classes.container}>

        <div ref={backdrop} onClick={closeWallet} className={classes.backdrop}>

        </div>

        {/*wallet*/}
        <div style={{backgroundColor:theme.color1}} ref={wallet} className={classes.wallet}>

            {/*header*/}
            <div className={classes.header}>

                <div style={{display: 'flex'}}>
                    <Avatar src={profilePicURL}  sx={{ width: 33, height: 33,marginLeft:'10px',marginRight:'10px' }}  />
                    <div style={{fontSize:'22px',color:theme.font}} >My Wallet</div>
                </div>
                <Tooltip title="Copy" placement="right" >
                    <Button sx={{marginRight:'10px'}} >{addr.short}</Button>
                </Tooltip>

            </div>

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

        </div> {/*wallet*/}

    </div>

  );
}
