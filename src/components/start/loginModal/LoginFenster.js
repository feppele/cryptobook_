import classes from './LoginFenster.module.css';
import closePic from '../../../images/close.png';
import metamaskPic from '../../../images/metamask.png';
import polygonPic from '../../../images/polygon.png';
import etherPic from '../../../images/ether.png';
import {useEffect,useState} from 'react';
import { useHistory } from "react-router-dom";

function LoginFenster(props){
    window.scrollTo(0, 0);
    const history = useHistory();

    const [notPolygon,setNotPolygon] = useState(false)

    async function checkChain(){
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        // Polygon chainID= 0x89
        // Ropsten =0x3
        if(chainId !== "0x3"){
            setNotPolygon(true)
        }
    }

    useEffect(() => {
        checkChain()
    },[])

    async function loginMetamask(){
        if(notPolygon){return}

        const accounts =  await window.ethereum.request({method: 'eth_requestAccounts'});
        history.push(props.nextPage);
    }

    window.ethereum.on('chainChanged', ()=>{setNotPolygon(false)})

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

        <div className={classes.container}>

            <img onClick={props.onModalCancelClicked} src={closePic} className={classes.close}></img>


            <div className={classes.top}>
                {props.text}
            </div>

            <div className={classes.list}>

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

            </div>


        </div>

    );


}

export default LoginFenster;