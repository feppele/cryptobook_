import classes from './PopupFenster.module.css';
import closePic from '../../../images/close.png';
import metamaskPic from '../../../images/metamask.png';
import polygonPic from '../../../images/polygon.png';
import {useEffect,useState} from 'react';

function PopupFenster(props){

    const [notPolygon,setNotPolygon] = useState(false)

    async function checkChain(){
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        // Polygon chainID= 0x89
        if(chainId !== "0x89"){
            setNotPolygon(true)
        }
    }

    useEffect(() => {
        checkChain()
    },[])

    function loginMetamask(){
        if(notPolygon){return}
        props.onModalMetamaskClicked()
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
                    <img src={polygonPic} className={classes.pic}></img>

                    <div className={classes.buttonText}>
                        Polygon
                    </div>
                </div>

                { notPolygon && <div onClick={addPolygonChain} className={classes.walletButton}>
                    <div className={classes.redText}>Wrong Network, click to change to Polygon</div>

                </div> }

            </div>


        </div>

    );


}

export default PopupFenster;