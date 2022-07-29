import * as React from 'react';

import {useEffect,useRef,useState,useContext} from 'react'
import classes from './Wallet.module.css'

import {getProfilePicURL} from '../../node/images'
import {shortAddr} from '../../web3/LoadingFunctions'
import etherSign from '../../images/ethereum.png'
import keyImg from '../../images/schlussel.png'
import LittleMenu from '../littleMenu/LittleMenu'

//material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Tooltip from '@mui/material/Tooltip';

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

//User Context
import {UserContext} from '../../UserProvider'

// import Waller Views
import AmountView from './AmountView'
import HistoryView from './HistoryView'

import ApprovalView from './ApprovalView'
import SendView from './SendView'


import {_web3} from '../../web3/Web3'
var web3 = _web3.mcbWallet
const userdata = JSON.parse(sessionStorage.getItem("userdata"))
console.log(userdata)
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

    useEffect(() => {
        getProfilePicURL(userData.address).then(res=>{setURL(res)})
        setAddr({long:userData.address,short:shortAddr(userData.address)})
    },[])

    const wallet = useRef()
    const backdrop = useRef()

    function closeWallet(){
        wallet.current.style.right= '-500px';
        backdrop.current.style.opacity= '0'
        setTimeout(()=>{props.closeWalletFunc()},500)
    }


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const [opened, setOpened] = useState(false);

  return (

    <div className={classes.container}>

        <div ref={backdrop} onClick={closeWallet} className={classes.backdrop}>

        </div>

        {/*wallet*/}
        <div style={{backgroundColor:theme.color1}} ref={wallet} className={classes.wallet}>

            {/*header*/}
            <div style={{borderBottom: theme.border}} className={classes.header}>
 

                <div style={{display: 'flex',alignItems: 'center'}}>
                    <Avatar src={profilePicURL}  sx={{ width: 33, height: 33,marginLeft:'10px',marginRight:'10px' }}  />
                    <div style={{}}>
                        <div style={{fontSize:'22px',color:theme.font}} >My Wallet</div>
                        { userdata && <div style={{fontSize:'12px',color:theme.font}}>{userdata.metamask === true ? "Metamask": "Integrated Wallet"}</div> }
                    </div>
                </div>

                <div>
                <Tooltip title="Copy" disableInteractive arrow placement="left" >
                    <Button  >{addr.short}</Button>
                </Tooltip>


                <Tooltip title="Copy" placement="right">
                    <IconButton sx={{marginRight:'10px'}} ><img src={keyImg} style={{height: '20px',width: 'auto'}}></img></IconButton>
                </Tooltip>
                </div>


            </div>

            {/*Integration*/}

                {props.children}



        </div> {/*wallet*/}


    </div>

  );
}
