import classes from './AddFriendIntegration.module.css';

import React,{useState} from 'react';

import {UserContract,userContractAddress} from '../../web3/UserContract'
import validImage from '../../images/valid.png';
import inValidImage from '../../images/invalid.png';
import plusImg from '../../images/plus.png';
import {follow} from '../../node/followFunction';
import {updateFriendsfura} from '../../web3/SendEtherInfura'

//material UI
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import {_web3} from '../../web3/Web3'
var web3 = _web3.mcbWallet
const userdata = JSON.parse(sessionStorage.getItem("userdata"))
if(userdata !== null){
    userdata.metamask === true ? web3 = _web3.metamask : web3 = _web3.mcbWallet
}



function AddFriendIntegration(props){



    const [imgSource,setImgSource] = useState(inValidImage);
    const [alignment,setAlignment] = React.useState('left');

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
          setAlignment(newAlignment);
        }
      };
    
    function isValidAddress(){
        return web3.utils.isAddress(document.getElementById("addressInput").value);
    }
    function check(){
        if(isValidAddress()){
            setImgSource(validImage);
        }else{
            setImgSource(inValidImage);
        }
    }

    async function addFriend(){

        const addr= document.getElementById("addressInput").value;
        //BlockchainFriend
        if(alignment ==="left"){
            const name= document.getElementById("inputName").value;
            if(name!=="" && addr!==""){

                const userdata = JSON.parse(sessionStorage.getItem("userdata"))
                if(userdata.metamask === true){// Metamask
                    UserContract.methods.updateFriends(name,addr).send({
                        from: userdata.address,
                        to: userContractAddress
                    });
                }else{ //MCB Wallet
                    const tx = await updateFriendsfura(userdata.privatekey,userdata.address,name,addr)
                    props.openApproveWallet(tx)
                }

            }
        }else{ // FollowFried
            follow(addr.toLowerCase())
            props.openSnackbar()
        }
    }



    return (


            <div className={classes.integration}>

                <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment" sx={{width:'100%'}}>
                    <ToggleButton value="left" aria-label="left aligned" sx={{width:'100%'}}>
                    Blockchain Friend
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="right aligned" sx={{width:'100%'}}>
                    Follow Friend
                    </ToggleButton>

                </ToggleButtonGroup>

                    {alignment==="left" &&
                    <input id="inputName" type="text" placeholder="friend name" className={classes.input}></input>
                    }

                    <div style={{display: 'flex',flexDirection: 'row',width:'100%'}}>
                        <input onChange={check} id="addressInput" type="text" placeholder="friend address" className={classes.input}></input>

                        <Tooltip title={imgSource===validImage ? "valid address" : "unvalid address"} placement="top" disableInteractive arrow>
                            <Button  ><img src={imgSource} style={{height:'33px',width:'auto'}}></img></Button>
                        </Tooltip>
                    </div>


                <Tooltip title="add" placement="top" disableInteractive arrow>
                    <Button sx={{width:'100%'}}variant="outlined" onClick={addFriend} ><img src={plusImg} style={{height:'20px',width:'auto'}}></img></Button>
                </Tooltip>

            </div>


    );


}

export default AddFriendIntegration;