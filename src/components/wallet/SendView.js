import classes from './SendView.module.css';
import sendImg from '../../images/send.png';
import {useState,useContext,useEffect} from 'react';
import equalImg from'../../images/equal.png';
import {sendEtherInfura} from '../../web3/SendEtherInfura'

//material UI 
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

import ApprovalView from './ApprovalView'


import {_web3} from '../../web3/Web3'
var web3 = _web3.mcbWallet
const userdata = JSON.parse(sessionStorage.getItem("userdata"))
if(userdata !== null){
    userdata.metamask === true ? web3 = _web3.metamask : web3 = _web3.mcbWallet
}

const ethPrice = require('eth-price');



// to close: closeWalletFunc()
function SendView(props){

    const [etherPrice,setEtherPrice]= useState(false);
    const [oneEther,setOneEther] =useState(false);
    const [txObj,setTxObj] =useState(false);
    const[sendEther,setSendEther] = useState(0);

    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])




    async function send(){
        //props.closeWalletFunc()

        // if Metamask is conncted userdata = {address} if MCB Wallet userdata={address,privkey,pubkey,....}
        const userdata = JSON.parse(sessionStorage.getItem("userdata"))
        if(userdata.metamask === true){// Metamask

            web3.eth.sendTransaction({
                from:window.web3.currentProvider.selectedAddress,
                to:props.longAddr,
                value: web3.utils.toWei(sendEther.toString())
            });
        }else{// MCB Wallet
            // Create Tx and then send to Approval View to sign
            const tx = await sendEtherInfura(  userdata.address, props.longAddr, userdata.privatekey, web3.utils.toWei(sendEther.toString())  ) //(from,to,privateKey,value)
            setTxObj(tx) //open ApprovalView
        }

    }


    // calc the USD price
    function calc(){

        var inputValue = document.getElementById("inputValue");
        var usdValue = document.getElementById("usdValue");

        var ethValue =inputValue.value;
        if(inputValue.value === ""){
            inputValue.value="0";
            ethValue=0;
        }

        setSendEther(inputValue.value);

        ethPrice("usd").then(res=>{
            const ethPrice=parseFloat(res.toString().split(":").pop())
            const calc =(ethPrice*parseFloat(ethValue)).toFixed(2);
            usdValue.value=calc;
            setEtherPrice(calc); // in usd
        })
    }

    function calcFromUSD(){

        var inputValue = document.getElementById("inputValue");
        var usdValue = document.getElementById("usdValue");

        var usdValue2 =usdValue.value;
        if(usdValue.value === ""){
            usdValue.value="0";
            usdValue2=0;
        }

        ethPrice("usd").then(res=>{
            const ethPrice=parseFloat(res.toString().split(":").pop())
            const calc =(parseFloat(usdValue2)/ethPrice).toFixed(10);
            inputValue.value=calc;
            setSendEther(calc);
        })
    }

    function oneEtherCalc(){
        ethPrice("usd").then(res=>{
            const ethPrice=parseFloat(res.toString().split(":").pop())
            var usdValue = document.getElementById("usdValue");
            usdValue.placeholder = ethPrice.toString() + " usd";
            setOneEther(ethPrice);
        })

    }
    useEffect(()=>{
        oneEtherCalc();
    },[])


    


    return (

        <div style={{width:'100%'}}>


            { txObj && <ApprovalView closeWalletFunc={props.closeWalletFunc} type="send Ether" tx={txObj}  />  }
            { !txObj &&
            <div className={classes.integration}>

                    <div className={classes.box}>

                        <div style={{color:theme.font,fontSize:'20px'}}> {props.text} </div>

                        <input style={{color:theme.font,backgroundColor:theme.color1}} id="inputValue" onChange={calc} type="text" placeholder="1 ether" className={classes.textInput}></input>

                        <img style={{filter:theme.png}} src={equalImg} className={classes.equalimg}></img>

                        <input style={{color:theme.font,backgroundColor:theme.color1}} id="usdValue" onChange={calcFromUSD} type="text"  className={classes.textInput}></input>




                        <Tooltip title="send" disableInteractive arrow placement="top">
                            <Button variant="contained" sx={{width:'100%',height:'40px',marginTop:'10px'}} onClick={send}>  < img src={sendImg} style={{height: '30px',width: 'auto'}}></img>   </Button>
                        </Tooltip>
                    </div>
            </div>
            }
        </div>

    );


}

export default SendView;