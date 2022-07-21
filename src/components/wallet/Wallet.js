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


//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

//User Context
import {UserContext} from '../../UserProvider'

import {_web3} from '../../web3/Web3'
var web3 = _web3.mcbWallet
const userdata = JSON.parse(sessionStorage.getItem("userdata"))
if(userdata !== null){
    userdata.metamask === true ? web3 = _web3.metamask : web3 = _web3.mcbWallet
}

const ethPrice = require('eth-price');

//props.walletOpen:Boolean
//props.closeWalletFunc:Function
export default function Wallet(props) {
    const userData = useContext(UserContext)
        // Night Mode
        const nightMode = useContext(NightContext)
        const [theme,setTheme] =useState(themes.bright)
        useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    const [profilePicURL,setURL] = useState("")
    const [addr,setAddr] = useState({})//{long:String,short:String}
    const [ethBalance,setEthBalance] = useState("")

    const [ethPrice1,setEthPrice] = useState("")

    useEffect(() => {

        getProfilePicURL(userData.address).then(res=>{setURL(res)})
        setAddr({long:userData.address,short:shortAddr(userData.address)})
        web3.eth.getBalance(userData.address).then(bal=>{setEthBalance(web3.utils.fromWei(bal,"ether").slice(0,6))})
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

                <div style={{display: 'flex',alignItems: 'center'}}>
                    <Avatar src={profilePicURL}  sx={{ width: 33, height: 33,marginLeft:'10px',marginRight:'10px' }}  />
                    <div style={{}}>
                        <div style={{fontSize:'22px',color:theme.font}} >My Wallet</div>
                        <div style={{fontSize:'12px',color:theme.font}}>{userdata.metamask === true ? "Metamask": "Integrated Wallet"}</div>
                    </div>
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
