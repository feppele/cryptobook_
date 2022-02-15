import classes from './OneNFTPage.module.css';
import {useLocation,useHistory,useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {getMetadataFromURI,getTokenUri} from '../../web3/NFTContractHelper';
import {getOwnerOfTokenId,sendNFT} from '../../web3/NFTContractHelper'
import {shortAddr} from '../../web3/LoadingFunctions'
import NFTFormat from '../../components/NFT/NFTFormat';
import black_herz from '../../images/black_herz.png';
import BasicButton2 from '../../components/standart/BasicButton2';
import BasicButton from '../../components/standart/BasicButton';

function OneNFTPage(){
    const history = useHistory();
    const {tokenId} = useParams();

    var number_likes =0;

    // const location = useLocation();
    // const data = location.state;

    const [owner,setOwner]=useState();
    const [shortOwner,setShortOwner]=useState();
    const [tokenURI,setTokenURI]=useState("");
    const [metaData,setMetadata]=useState("");

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
        sendNFT("0x15Db0F018209098e5e96FF68CB88F7080b65A841",tokenId);
    }


    function goToProfile(){
        history.push({
            pathname:"/friendProfile/"+owner


        })
    }

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

                <div className={classes.name}>{metaData[1] +" " + "#" +metaData[2]}</div> 

                <div className={classes.ownerWrapper}>

                    <div className={classes.text}>Owned by</div>
                    <div className={classes.owner} onClick={goToProfile}>    {shortOwner}   </div>

                    {/* liked */}
                    <div className={classes.likesWrapper}>
                        <img src={black_herz} className={classes.herz}></img>
                        <div className={classes.text}> {number_likes + " favorites"} </div>
                    </div>

                </div>

                <div className={classes.metadataWrapper}>
                    <div  className={classes.text}> Metadata: </div>
                    <div onClick={openURI} className={classes.owner}>{shortURI(tokenURI)}</div>
                </div>


                <div className={classes.buttonWrapper}>
                    <BasicButton text="profile pic"/>
                    <BasicButton2 onButtonClicked={send} text="send"/>

                </div>




            </div>



        </div>





    );


}

export default OneNFTPage;