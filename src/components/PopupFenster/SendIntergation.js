import classes from './SendIntergation.module.css';
import sendImg from '../../images/send.png';
import {useState} from 'react';
import equalImg from'../../images/equal.png';

import {web3} from '../../web3/Web3';
import {sendEtherInfura} from '../../web3/SendEtherInfura'

 
//material UI 
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';


const ethPrice = require('eth-price');


function SendIntergation(props){


    const [etherPrice,setEtherPrice]= useState(false);
    const [oneEther,setOneEther] =useState(false);

    const[sendEther,setSendEther] = useState(0);



    function send(){
        // if Metamask is conncted userdata = {address} if MCB Wallet userdata={address,privkey,pubkey,....}
        const userdata = JSON.parse(sessionStorage.getItem("userdata"))
        if(Object.keys(userdata).length === 1){// Metamask

            web3.eth.sendTransaction({
                from:window.web3.currentProvider.selectedAddress,
                to:props.longAddr,
                value: web3.utils.toWei(sendEther.toString())
            });

        }else{// MCB Wallet

            sendEtherInfura(  userdata.address, props.longAddr, userdata.privatekey, web3.utils.toWei(sendEther.toString())  ) //(from,to,privateKey,value)

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

    }oneEtherCalc();

    



    return (

        <div className={classes.integration}>

            <div className={classes.inputwrapper}>
                <div className={classes.inputwrapper2}>

                    <input id="inputValue" onChange={calc} type="text" placeholder="1 ether" className={classes.textInput}></input>
                    <img src={equalImg} className={classes.equalimg}></img>
                    <input id="usdValue" onChange={calcFromUSD} type="text"  className={classes.textInput}></input>


                    <Tooltip title="send" disableInteractive arrow placement="top">
                        <Button variant="outlined" sx={{width:'100%'}} onClick={send}>  < img src={sendImg} style={{height: '33px',width: 'auto'}}></img>   </Button>
                    </Tooltip>
                </div>

            </div>

        </div>

    );


}

export default SendIntergation;