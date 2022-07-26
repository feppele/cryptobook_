import classes from './LoginIntegration.module.css';
import metamaskPic from '../../images/metamask.png';
import etherPic from '../../images/ether.png';
import lockImg from '../../images/lock-2.png'

import {useEffect,useState,useContext} from 'react';
import { useHistory } from "react-router-dom";
import {addPublicKeyToDB} from '../../node/databank'
//userdata
import {ChangeUserContext} from '../../UserProvider'


function LoginIntegration(props){
    const history = useHistory();
    const [notPolygon,setNotPolygon] = useState(false)
    // set userdata Kotect also here loginMetamask()
    //userData context
    const setUserDataFunc = useContext(ChangeUserContext)


    async function checkChain(){
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        // Polygon chainID= 0x89
        // Ropsten =0x3
        if(chainId !== "0x3"){
            setNotPolygon(true)
            return true
        }
        return false
    }

    // useEffect(() => {
    //     checkChain()

    // },[])

    function isMetaMaskInstalled() {
        return Boolean(window.ethereum && window.ethereum.isMetaMask);
    }
    async function loginMetamask(){
        if(!isMetaMaskInstalled()){
            window.open("https://metamask.io");
            return;
        }
        window.ethereum.on('chainChanged', ()=>{setNotPolygon(false)})
        if(await checkChain()){return}


        const accounts =  await window.ethereum.request({method: 'eth_requestAccounts'});

        // erstmal weglassen bis fertig implementriert
        // Add Public KEy to DB
        addPublicKeyToDB(accounts[0])
        //set userdata Context
        setUserDataFunc({address:accounts[0],metamask:true})

        history.push(props.nextPage);
    }

    function loginCryptoBookWallet(){

       history.push("/login");

    }


    //window.ethereum.on('chainChanged', ()=>{setNotPolygon(false)})

    function addPolygonChain(){
        window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
            chainId: '0x89',
            chainName: 'Polygon',
            nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
            },
            rpcUrls: ['https://polygon-rpc.com'],
            blockExplorerUrls: ['https://polygonscan.com/']
            }]
            })
            .catch((error) => {
            console.log(error)
            })
    }
    function addRopstenChain(){
        window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: "0x3" }],
        });
    }

    return (

            <div className={classes.integration}>

                <div onClick={loginMetamask} className={classes.walletButton}>

                    <img src={metamaskPic} className={classes.pic}></img>

                    <div className={classes.buttonText}>
                        MetaMask /
                    </div>
                    <img src={etherPic} className={classes.pic}></img>

                    <div className={classes.buttonText}>
                        Ropsten
                    </div>
                </div>


                { notPolygon && <div onClick={addRopstenChain} className={classes.walletButton}>
                    <div className={classes.redText}>Wrong Network, click to change to Ropsten</div>

                </div> }

                <div onClick={loginCryptoBookWallet} className={classes.walletButton}>
                    <img src={lockImg} style={{height: '28px',width: 'auto'}}></img>
                    MyCryptoBook-Wallet

                </div>


            </div>



    );


}

export default LoginIntegration;