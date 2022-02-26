import classes from './OneNFTPage.module.css';
import {useLocation,useHistory,useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {getAllMetadataFromURI,getTokenUri} from '../../web3/NFTContractHelper';
import {getOwnerOfTokenId,sendNFT} from '../../web3/NFTContractHelper'
import {shortAddr} from '../../web3/LoadingFunctions'
import NFTFormatEasy from '../../components/NFT/NFTFormatEasy';
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

function OneNFTPage(){

    const contractAddress ="0x7D66B92831bc5A7ae77541719526d4693FD9DC35"

    useEffect(() => {window.scrollTo(0,0)},[])

    const history = useHistory();
    const {tokenId} = useParams();

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
        return uri.toString().slice(0,12) +"..."
    }

    function openURI(){
        window.open(metaData.tokenUri);
    }



    function goToProfile(e){
        const person = e.target.id;
        console.log(person);
        window.ethereum.request({method: 'eth_accounts'}).then(accounts=>{

            if(accounts[0].localeCompare(person) === -1){
                history.push({
                    pathname:"/me/"
                })
            }else{
                history.push({
                    pathname:"/profile/"+person
                })
            }
        })
    }

    function openErc721(){
        window.open("https://ethereum.org/en/developers/docs/standards/tokens/erc-721/")
    }

    function getNFTLikes(){
        fetch("/databank",getOptions("getNFTLikes",{tokenId: tokenId}))
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
        fetch("/databank",getOptions("getLikesList",{tokenId: tokenId}))
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

        if(amIOwner){
            return
        }


        



    }

    return (

        <div className={classes.container}>

            {/*left */}
            <div className={classes.left}>

                <div className={classes.NFTWrapper}>
                     <NFTFormatEasy tokenId={tokenId}/>
                </div>

            </div>


            {/*right */}
            <div className={classes.right}>



                {sendOneNFTModal && <SendOneNFT imageName={metaData.name} tokenId={tokenId}  onCloseClick={closeSend}/>}
                {sendOneNFTModal && <Backdrop onBackDropClicked={closeSend}/>}

                {likesList && <Backdrop onBackDropClicked={closeLikesList}/> }
                {likesList && <LikesList text={"Favorited by"} onCloseClick={closeLikesList} likesList={NFTLikesArrayForList}/>  }


                <div className={classes.box}>

                    <div className={classes.buttonWrapper}>
                        <Button3 onButtonClicked={copyURL} img={shareImg} popupText={"share link"}/>
                        {amIOwner && <Button3 img={profilePic} popupText={"profile pic"}/>  }
                        { !isOffchain && amIOwner && <Button3 onButtonClicked={openSend} img={sendImg} popupText={"send NFT"}/> }
                    </div>

                    {/* name + collection */}
                    <div className={classes.h2}>{metaData.name }</div>
                    <div onClick={openCollection} className={classes.h1}>{metaData.collection  }</div>


                    {/* liked */}
                        <div className={classes.likesWrapper}>
                        <img src={black_herz} className={classes.herz}></img>
                        <div onClick={openLikesList} className={classes.text}> {NFTLikes + " favorites"} </div>
                    </div>

                    <div className={classes.buyButtonWrapper}>
                     { amIOwner &&  <Button7BUY preis={preis} onButtonClickded={buyButtonClicked} />  }
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
                        <div className={classes.owner}>{metaData.tokenId}</div>
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








                { shareLink && <Infobanner text ={"Link copied !"}/> }



            </div>



        </div>





    );


}

export default OneNFTPage;