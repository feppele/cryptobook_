import classes from './OneNFTPage.module.css';
import {useLocation,useHistory,useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {getMetadataFromURI,getTokenUri} from '../../web3/NFTContractHelper';
import {getOwnerOfTokenId,sendNFT} from '../../web3/NFTContractHelper'
import {shortAddr} from '../../web3/LoadingFunctions'
import NFTFormat from '../../components/NFT/NFTFormat';
import Button3 from '../../components/standart/Button3';
import BasicButton from '../../components/standart/BasicButton';

//img
import black_herz from '../../images/black_herz.png';
import shareImg from '../../images/share.png';
import sendImg from '../../images/send.png';
import profilePic from '../../images/profilepic.png';

import Infobanner from './../../components/standart/Infobanner';
import LikesList from './../../components/standart2/LikesList';
import Backdrop from './../../components/standart2/Backdrop';
import {getOptions} from '../../node/databank';

function OneNFTPage(){

    useEffect(() => {window.scrollTo(0,0)},[])

    const history = useHistory();
    const {tokenId} = useParams();

    // const location = useLocation();
    // const data = location.state;

    const [owner,setOwner]=useState();
    const [shortOwner,setShortOwner]=useState();
    const [tokenURI,setTokenURI]=useState("");
    const [metaData,setMetadata]=useState("");
    const [shareLink,setShareLink]=useState(false);
    const [NFTLikes,setNFTLikes]=useState(0);
    const [likesList,setLikesList]=useState(false);
    const [NFTLikesArrayForList,setNFTLikesArrayForList] = useState([]);


    async function load(){
        getTokenUri(tokenId).then((uri)=>{
            setTokenURI(uri);
            getMetadataFromURI(uri,tokenId).then((metadata)=>{
                setMetadata(metadata,tokenId);
            })
        })
    }
    useEffect(() => {load()},[])

    getOwnerOfTokenId(tokenId).then(response =>{

        setOwner(response);
        setShortOwner(shortAddr(response));
    });

    function shortURI(uri){
        return uri.toString().slice(0,12) +"..."
    }

    function openURI(){
        window.open(tokenURI);
    }

    function send(){
        sendNFT();
    }

    function goToProfile(){
        window.ethereum.request({method: 'eth_accounts'}).then(accounts=>{
           console.log("LOCAL COMPAREEE")
            console.log(accounts[0]);
            console.log(owner);
            if(accounts[0].localeCompare(owner) === -1){
                console.log("SOllte zu my PRofil gehenowner");
                history.push({
                    pathname:"/profil/"
                })
            }else{
                history.push({
                    pathname:"/friendProfile/"+owner
                })
            }
        })
    }

    function getNFTLikes(){
        fetch("/databank",getOptions("getNFTLikes",{tokenId: tokenId}))
        .then(res => {return res.json()}).then(res=>{
            console.log(res);
            console.log(res[0][0]);
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

            console.log(res);
            if(res==="error"){
                setNFTLikesArrayForList([]);
            }
            setNFTLikesArrayForList(res);
        })
    }
    useEffect(() => {getLikesList()},[]);
    

    console.log(NFTLikes);


    return (

        <div className={classes.container}>

            {/*left */}
            <div className={classes.left}>

                <div className={classes.NFTWrapper}>
                     <NFTFormat imageURL={metaData[0]} imageName={metaData[1]} tokenId={metaData[2]}/>
                </div>

            </div>

            {/*right */}
            <div className={classes.right}>

                {likesList && <Backdrop onBackDropClicked={closeLikesList}/> }
                {likesList && <LikesList text={"Favorited by"} onCloseClick={closeLikesList} likesList={NFTLikesArrayForList}/>  }

                <div className={classes.nameAndButton}>
                    <div className={classes.name}>{metaData[1] +" " + "#" +metaData[2]}</div>
                    <div className={classes.buttonWrapper}>
                        <Button3 img={profilePic} popupText={"profile pic"}/>
                        <Button3 onButtonClicked={copyURL} img={shareImg} popupText={"share link"}/>
                        <Button3 onButtonClicked={send} img={sendImg} popupText={"send NFT"}/>
                    </div>
                </div>

                <div className={classes.ownerWrapper}>

                    <div className={classes.text}>Owned by</div>
                    <div className={classes.owner} onClick={goToProfile}>    {shortOwner}   </div>

                    {/* liked */}
                    <div className={classes.likesWrapper}>
                        <img src={black_herz} className={classes.herz}></img>
                        <div onClick={openLikesList} className={classes.text}> {NFTLikes + " favorites"} </div>
                    </div>

                </div>

                <div className={classes.metadataWrapper}>
                    <div  className={classes.text}> Metadata: </div>
                    <div onClick={openURI} className={classes.owner}>{shortURI(tokenURI)}</div>
                </div>



                { shareLink && <Infobanner text ={"Link copied !"}/> }



            </div>



        </div>





    );


}

export default OneNFTPage;