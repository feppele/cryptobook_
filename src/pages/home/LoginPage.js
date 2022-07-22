import classes from './LoginPage.module.css'
import {useEffect,useState,useRef,useContext} from 'react'
import { useHistory } from "react-router-dom";
//mui
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import Link from '@mui/material/Link';

import lockImg from '../../images/lock-2.png'
import { ethers } from 'ethers';
import {registerDB,loginDB} from '../../node/username'

//userdata
import {ChangeUserContext} from '../../UserProvider'

function LoginPage(){
    const history = useHistory()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [passwordCheck,setPasswordCheck] = useState("")
    const [loginpage,setLoginpage] = useState(true)
    const [helperText,setHelperText] = useState("")
    const [helperTextUser,setHelperTextUser] = useState("")
    const [loginError,setLoginError] = useState("")    
    const [randomMnemonic,setrandomMnemonic] = useState("")
    //userData context
    const setUserDataFunc = useContext(ChangeUserContext)

    useEffect(() => {
        console.log("HII")
    },[])


    function openRegister(){
        setLoginpage(false)
    }
    function openLogin(){
        setLoginpage(true)
    }

    async function register(){
        //first check pw = checkPW else return
        if(password !==passwordCheck){
            setHelperText("not identical")
            return
        }
        // check PW length
        if(password.length < 12){
            setHelperText("more than 12 symbols")
            return
        }
        // check usename length
        if(username.length < 8){
            setHelperTextUser("more than 8 symbols")
            return
        }

        const mnemonic = ethers.Wallet.createRandom().mnemonic;
        setrandomMnemonic(mnemonic)
        const privkey = ethers.Wallet.fromMnemonic(mnemonic.phrase);

        // send to DB
        await registerDB(username,password,privkey.privateKey,privkey.publicKey,privkey.address)

        setPassword("")
        setPasswordCheck("")
        setUsername("")

    }

    async function login(){
        const res = await loginDB(username,password) // not exist: return "error" else: {name:'',pw:'',publickey,privatekey,address}

        if( res === "error"){
            setLoginError("unvalid username or password")
            return
        }

        console.log(res)
        
        // login Valid:
        //set privkey,pubkey,address to useContext!! and go to home
        setUserDataFunc(res) //context {name:'',pw:'',publickey,privatekey,address}
        history.push("/home")

    }



    return (
        <div className={classes.container}>

            <img style={{height: '60px', width:'auto'}} src={lockImg}></img>

            <div className={classes.headerText}>MyCryptoBook-Wallet Login</div>

            {loginpage &&
            <div className={classes.box}>

                <div style={{fontSize:'18px'}}>Login to MyCryptoBook-Wallet</div>

                <TextField value={username} onChange={(e)=>{setUsername(e.target.value);setLoginError("")}}  error={loginError!==""}  label="Username"   />

                <TextField  value={password} onChange={(e)=>{setPassword(e.target.value);setLoginError("")}} helperText={loginError} error={loginError!==""} label="Password" type="password"   />

                <Button sx={{height:'50px'}} onClick={login} variant="contained" > Login</Button>

                <Link sx={{cursor: "pointer",alignSelf:"flex-end"}} onClick={openRegister} underline="hover"> {"Don't have an account? Sign Up"} </Link>

            </div>
            }

            {!loginpage &&
            <div className={classes.box}>

                {randomMnemonic==="" &&<div style={{fontSize:'18px'}}>Register to MyCryptoBook-Wallet</div>  }

                {randomMnemonic==="" && <TextField  helperText={helperTextUser} error={helperTextUser !==""} value={username} onChange={(e)=>{setUsername(e.target.value);setHelperTextUser("")}} label="Username"   />    }

                {randomMnemonic==="" && <TextField  value={password} onChange={(e)=>{setPassword(e.target.value);setHelperText("")}} label="Password" type="password"   />      }
                {randomMnemonic==="" && <TextField  helperText={helperText} error={helperText !==""} value={passwordCheck} onChange={(e)=>{setPasswordCheck(e.target.value);setHelperText("")}} label="Password" type="password"   />   }

                {randomMnemonic==="" && <Button sx={{height:'50px'}} onClick={register} variant="contained" > Register</Button> }

                {randomMnemonic!=="" && <div style={{color:'green',fontSize:'20px'}}>{randomMnemonic.phrase}</div> }
                {randomMnemonic!=="" && <div style={{color:'red'}}>{"Read this carefully"}</div> }
                {randomMnemonic!=="" && <div>These 12 words are the Seed Phrase for your account. You can use it to transfer your private Key to another Wallet or if you loose your credentials you can restore your account with this phrase. Store it at a save place. The person who has the seed phrase has accsess to all your funds. </div>  }
                {randomMnemonic!=="" && <div>Also take care of your password. We do not store your password, so if you forget it, we cannot restore it. For the case you forget it you need your Seed Phrase to restore it.</div> }


                <Link sx={{cursor: "pointer",alignSelf:"flex-end"}} onClick={openLogin} underline="hover"> {"Already have an account? Login"} </Link>
            </div>
            }

        <div style={{fontSize:'12px'}}> Copyright © MyCryptoBook.io 2022</div>

        </div>

    );

}

export default LoginPage;