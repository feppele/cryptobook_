import classes from './OneNFTPage.module.css';
import {useLocation,useHistory,useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {getAllMetadataFromURI,getTokenUri} from '../../web3/NFTContractHelper';
import {getOwnerOfTokenId,sendNFT} from '../../web3/NFTContractHelper'
import {shortAddr} from '../../web3/LoadingFunctions'
import NFTFormatEasyOnePage from '../../components/NFT/NFTFormatEasyOnePage';
import Button3 from '../../components/standart/Button3';
import BasicButton from '../../components/standart/BasicButton';
import Button7BUY from '../../components/standart/Button7BUY'
//img
import black_herz from '../../images/black_herz.png';
import shareImg from '../../images/share.png';
import sendImg from '../../images/send.png';
import profilePic from '../../images/profilepic.png';
import linkImg from '../../images/link.png';
import detailImg from '../../images/info.png';
import desImg from '../../images/description.png';

import Infobanner from './../../components/standart/Infobanner';
import LikesList from './../../components/standart2/LikesList';
import Backdrop from './../../components/standart2/Backdrop';
import {getOptions} from '../../node/databank';
import SendOneNFT from '../../components/standart2/sendOneNFT/SendOneNFT';
import {getTokenURIDB,getPreisOfNFT} from '../../node/NFTData'
import {buyNFTOff,buyNFTOn} from '../../web3/BuyNFTContractHelper'
import SetNFTPriceModal from '../../components/standart2/SetNFTPriceModal'

import etherSign from '../../images/ethereum.png'

// material UI
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ButtonGroup from '@mui/material/ButtonGroup';

function OneNFTPage(){

    const fetchi = "https://backendserverreact.azurewebsites.net"

    const history = useHistory();
    const {tokenId} = useParams();

    const contractAddress ="0x7D66B92831bc5A7ae77541719526d4693FD9DC35"

    useEffect(() => {
        window.scrollTo(0,0)
        if(!window.ethereum){return;}
        window.ethereum.request({method: 'eth_requestAccounts'});
    },[])



    // const location = useLocation();
    // const data = location.state;

    const [owner,setOwner]=useState();
    const [shortOwner,setShortOwner]=useState();
    const [isOffchain,setIsOffchain] = useState(false);
    const [preis,setPreis] = useState("");
    const [metaData,setMetadata]=useState([]);
    const [shareLink,setShareLink]=useState(false);
    const [NFTLikes,setNFTLikes]=useState(0);
    const [likesList,setLikesList]=useState(false);
    const [NFTLikesArrayForList,setNFTLikesArrayForList] = useState([]);
    const [tokenURI,setTokenURI] = useState("")
    const [sendOneNFTModal,setSendOneNFTModal]=useState(false);
    const [amIOwner,setAmIOwner]=useState(false);
    const [NFTPriceModel,setNFTPriceModal] =useState(false);

    const [alertOpen, setAlertOpen] = useState(true);

    // async function load(){
    //     getTokenUri(tokenId).then((uri)=>{
    //         setTokenURI(uri);
    //         getMetadataFromURI(uri,tokenId).then((metadata)=>{
    //             setMetadata(metadata,tokenId);
    //         })
    //     })
    // }
    // useEffect(() => {load()},[])


    async function loadMetadata(tokenId){

        // try get from blockchain, if error is offchain--> db
        var tokenURI;
        try{
            tokenURI = await getTokenUri(tokenId);

        }catch(err){
            setIsOffchain(true);
            tokenURI = await getTokenURIDB(tokenId);
        }

        setTokenURI(tokenURI);
        setMetadata( await getAllMetadataFromURI(tokenURI,tokenId) );
        return await getAllMetadataFromURI(tokenURI,tokenId);

    }
    useEffect(() => {loadMetadata(tokenId).then((res)=>{ // returns metaData

        getOwner(res)

        getPreisOfNFT(tokenId).then(p =>{setPreis(p)});

        })},[])


    function getOwner(meta){
        // get Owner
        getOwnerOfTokenId(tokenId).then(response =>{

            if(!window.ethereum){return}
            // if not on blockchain owner == creator. 
            if(response === "error"){
                console.log(meta)
                setOwner(meta.creator)
                setShortOwner(shortAddr(meta.creator));
                if(meta.creator.toLowerCase() === window.web3.currentProvider.selectedAddress.toLowerCase()){
                    setAmIOwner(true);
                }
                return;
            }
            //else
            setOwner(response);
             setShortOwner(shortAddr(response));
            if(response.toLowerCase() === window.web3.currentProvider.selectedAddress.toLowerCase()){
                setAmIOwner(true);
            }
        });
    }



    function shortURI(uri){
        if( uri === undefined){return }
        return uri.toString().slice(0,12) +"..."
    }

    function openURI(){
        window.open(metaData.tokenUri);
    }



    function goToProfile(e){
        const person = e.target.id;
        console.log(person);


        history.push({
            pathname:"/profile/"+person
        })

    }

    function openErc721(){
        window.open("https://ethereum.org/en/developers/docs/standards/tokens/erc-721/")
    }

    function getNFTLikes(){
        if(!window.ethereum){return}
        fetch(fetchi+"/databank",getOptions("getNFTLikes",{tokenId: tokenId}))
        .then(res => {return res.json()}).then(res=>{
            if(res==="error"){
                setNFTLikes(0);
            }
            setNFTLikes(res[0][0].count);
        })
    }
    useEffect(() => {getNFTLikes()},[]);


    function copyURL(){
        navigator.clipboard.writeText(window.location.href);
        setShareLink(true);

    }



    function openLikesList(){
        setLikesList(true);
    }
    function closeLikesList(){
        setLikesList(false);
    }

    function getLikesList(){
        if(!window.ethereum){return}
        fetch(fetchi+"/databank",getOptions("getLikesList",{tokenId: tokenId}))
        .then(res => {return res.json()}).then(res=>{

            if(res==="error"){
                setNFTLikesArrayForList([]);
            }
            setNFTLikesArrayForList(res);
        })
    }
    useEffect(() => {getLikesList()},[]);



    function openSend(){
        setSendOneNFTModal(true)
        //sendNFT();
    }
    function closeSend(){
        setSendOneNFTModal(false)
        //sendNFT();
    }


    function openEtherContract(){
        window.open("https://etherscan.io/address/" + contractAddress );
    }


    function openCollection(){

        history.push("/collection/"+metaData.collection)
    }


    function buyButtonClicked(){
        if(!window.ethereum){return}
        if(amIOwner){

            changeNFTPrice();
            return
        }

        // check if on or offchain sell
        getOwnerOfTokenId(tokenId).then(response =>{

            if(response === "error"){
                // buy offchain
                buyNFTOff(tokenURI,tokenId,owner);
            }else{
                //buy onchain
                buyNFTOn(tokenId,owner,metaData.creator)
            }
        })
    }

    function changeNFTPrice(){
        setNFTPriceModal(true);
    }
    function closeSetPrice(){
        setNFTPriceModal(false);
    }

    function nftpriceChanged(preis){
        setPreis(preis)
    }

    return (

        <div className={classes.container}>

            {/*left */}
            <div className={classes.left}>

                <div className={classes.NFTWrapper}>
                     <NFTFormatEasyOnePage tokenId={tokenId}/>
                </div>

            </div>


            {/*right */}
            <div className={classes.right}>


                { NFTPriceModel && <SetNFTPriceModal nftpriceChanged={nftpriceChanged} text={"Set NFT price"} onCloseClick={closeSetPrice} tokenId={tokenId} />  }
                { NFTPriceModel && <Backdrop onBackDropClicked={closeSetPrice} />    }

                {sendOneNFTModal && <SendOneNFT imageName={metaData.name} tokenId={tokenId}  onCloseClick={closeSend}/>}
                {sendOneNFTModal && <Backdrop onBackDropClicked={closeSend}/>}

                {likesList && <Backdrop onBackDropClicked={closeLikesList}/> }
                {likesList && <LikesList text={"Favorited by"} onCloseClick={closeLikesList} likesList={NFTLikesArrayForList}/>  }


                <div className={classes.box}>

                <div className={classes.buyButtonWrapper}>

                    <ButtonGroup orientation="vertical" variant="outlined" aria-label="outlined button group" >

                        <Tooltip title="copy link" disableInteractive arrow placement="left">
                            <Button onClick={copyURL}>< img src={shareImg} style={{height: '20px',width: 'auto'}}></img></Button>
                        </Tooltip>

                        {amIOwner &&
                        <Tooltip title="profile pic" disableInteractive arrow placement="left">
                            <Button onClick={""}><img src={profilePic} style={{height: '20px',width: 'auto'}}></img></Button>
                        </Tooltip>
                        }

                        { !isOffchain && amIOwner &&
                        <Tooltip title="send NFT" disableInteractive arrow placement="left">
                            <Button onClick={openSend}><img src={sendImg} style={{height: '20px',width: 'auto'}}></img></Button>
                        </Tooltip>
                        }

                        <Tooltip title={amIOwner ? "set Price" : "buy"} disableInteractive arrow placement="left">
                            <Button color="secondary" onClick={buyButtonClicked} > {preis} <img src={etherSign} style={{height: '20px',width: 'auto'}}></img> </Button>
                        </Tooltip>

                    </ButtonGroup>

                </div>

                    {/* name + collection */}
                    <div className={classes.h2}>{metaData.name }</div>
                    <div onClick={openCollection} className={classes.h1}>{metaData.collection  }</div>


                    {/* liked */}
                        <div className={classes.likesWrapper}>
                        <img src={black_herz} className={classes.herz}></img>
                        <div onClick={openLikesList} className={classes.text}> {NFTLikes + " favorites"} </div>
                    </div>


                {/* Description Box*/}
                <div className={classes.niceBoxes}>

                    <div className={classes.topBox}>
                        <img src={desImg} className={classes.descriptImg}></img>
                        <div className={classes.h3}>Description:</div>
                    </div>

                    <div className={classes.h4}> {metaData.description}</div>
                </div>


                {/* Detail Box*/}
                <div className={classes.niceBoxes}>

                    <div className={classes.topBox}>
                        <img src={detailImg} className={classes.descriptImg}></img>
                        <div className={classes.h3}>Details:</div>
                    </div>


                    {/* owner*/}
                    <div className={classes.ownerWrapper}>
                        <div className={classes.text}>Owned by</div>
                        <div className={classes.owner}  onClick={goToProfile} id={owner}>    {shortOwner}   </div> 

                    </div>

                    <div className={classes.ownerWrapper}>
                        <div className={classes.text}>Created by</div>
                        <div className={classes.owner} onClick={goToProfile} id={metaData.creator}>    {shortAddr(metaData.creator +"")}   </div>
                    </div>

                    <div className={classes.ownerWrapper}>
                        <div className={classes.text}>Contract Address</div>
                        <div className={classes.owner} onClick={openEtherContract}>    {shortAddr(contractAddress)}   </div>
                    </div>

                    <div className={classes.ownerWrapper}>
                        <div className={classes.text}>Token Type</div>
                        <div className={classes.owner} onClick={openErc721}>    {"ERC721"}   </div>
                    </div>


                    {/* metadata*/}
                    <div className={classes.ownerWrapper}>
                        <div  className={classes.text}> Metadata: </div>
                        <div onClick={openURI} className={classes.owner}>{shortURI(tokenURI)}</div>
                    </div>

                    {/* tokenId*/}
                    <div className={classes.ownerWrapper}>
                        <div  className={classes.text}> TokenId: </div>
                        <div className={classes.owner}>{shortURI(metaData.tokenId)}</div>
                    </div>

                    <div className={classes.place}></div>

                </div>


                {/* EXT Link*/}
                <div className={classes.niceBoxes}>
                    <div className={classes.topBox}>
                    <img src={linkImg} className={classes.descriptImg}></img>
                        <div className={classes.h3}>Link from Creator:</div>
                    </div>
                    <div className={classes.link}> {metaData.extLink}</div>
                </div>


                </div>


                { shareLink && <Collapse in={alertOpen}> <Alert onClose={() => {setAlertOpen(false)}} severity="success" color="info" sx={{position:'absolute', right:'0',bottom:'10px'}}>Link copied!</Alert> </Collapse> }


            </div>

        </div>

    );

}

export default OneNFTPage;