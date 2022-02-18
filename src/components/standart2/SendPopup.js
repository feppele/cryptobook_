import classes from './SendPopup.module.css';
import Button6 from '../standart/Button6';
import closePic from '../../images/close.png';
import sendImg from '../../images/send.png';
import {useState} from 'react';
import equalImg from'../../images/equal.png';

import {web3} from '../../web3/Web3';

const ethPrice = require('eth-price');
 

function SendPopup(props){


    const [etherPrice,setEtherPrice]= useState(false);
    const [oneEther,setOneEther] =useState(false);

    const[sendEther,setSendEther] = useState(0);

    async function send(){
        const transactionParameters = {
            to: props.longAddr,
            from: window.web3.currentProvider.selectedAddress,
            value: sendEther.toString()
          };

          const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });
    }


    function calc(){

        var inputValue = document.getElementById("inputValue");
        var usdValue = document.getElementById("usdValue");

        setSendEther(inputValue.value);

        ethPrice("usd").then(res=>{

            const ethPrice=parseFloat(res.toString().split(":").pop())
            console.log(ethPrice)
            const calc =(ethPrice*parseFloat(inputValue.value)).toFixed(2);
            usdValue.value=calc;
            setEtherPrice(calc);
        })
    }

    console.log(typeof(sendEther));
    console.log(web3.utils.toWei(sendEther.toString()));

    function calcFromUSD(){

        var inputValue = document.getElementById("inputValue");
        var usdValue = document.getElementById("usdValue");

        ethPrice("usd").then(res=>{

            const ethPrice=parseFloat(res.toString().split(":").pop())
            console.log(ethPrice)
            const calc =(parseFloat(usdValue.value)/ethPrice).toFixed(10);
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

        <div className={classes.container}>

            <img onClick={props.onCloseClicked} src={closePic} className={classes.close}></img>


            <div className={classes.top}>
                Send Ether to {props.friendName}
            </div>


            <div className={classes.box}>

                <div className={classes.inputwrapper}>
                    <div className={classes.inputwrapper2}>

                        <input id="inputValue" onChange={calc} type="text" placeholder="1 ether" className={classes.textInput}></input>
                        <img src={equalImg} className={classes.equalimg}></img>
                        <input id="usdValue" onChange={calcFromUSD} type="text"  className={classes.textInput}></input>

                    </div>
                    <div className={classes.button}>    <Button6 onButtonClicked={ send} popupText={"send"} img={sendImg}/>    </div>
            </div>



            </div>




        </div>

    );


}

export default SendPopup;