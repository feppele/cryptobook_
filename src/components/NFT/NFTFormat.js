import classes from './NFTFormat.module.css';

import herz from '../../images/herz.png';
import ethereum from '../../images/ethereum.png';

import {NFTContract,NFTContractAddress} from '../../web3/NFTContract';
import {useHistory} from 'react-router-dom';
import {getOptions} from '../../node/databank';
import {useState,useEffect} from 'react';
import redHerz from '../../images/redherz.png';
import blackHerz from '../../images/backherz.png';
import MiniButton from '../standart/MiniButton';


function NFTFormat(props){

    const history =useHistory();

    const [NFTLikes,setNFTLikes]= useState(0);
    const [iLike,setILike]= useState(false);
    const [user,setUser]= useState();


    function openThisNFTPage(){
        const data ={_imageURL: props.imageURL,
                    _imageName: props.imageName,
                    _tokenId: props.tokenId}

        history.push({
            pathname:"/thisNFT/"+props.tokenId,
            state:data
        });

    }

    function getNFTLikes(){

        fetch("/databank",getOptions("getNFTLikes",{tokenId: props.tokenId}))
        .then(res => {return res.json()}).then(res=>{
            if(res==="error"){
                setNFTLikes(0);
            }
            setNFTLikes(res[0][0].count);
        })
    }


    function likeNFT(){

        window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
            fetch("/databank",getOptions("likeNFT",{tokenId: props.tokenId,address: currentUsers[0]} )).catch(console.log);
        })

        setILike(true);
        console.log(typeof(NFTLikes));
        setNFTLikes(parseInt(NFTLikes)+1);

    }
    function dislikeNFT(){
        console.log(user);
        console.log("disloke");
        fetch("/databank",getOptions("dislikeNFT",{tokenId: props.tokenId,address: user}))
        .then(res => {return res.json()})

        setILike(false);
        setNFTLikes(parseInt(NFTLikes)-1);
    }

    function doILike(){

        window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
            fetch("/databank",getOptions("doILike",{tokenId: props.tokenId, address: currentUsers[0] }))
            .then(res => {return res.json()}).then(res=>{

                console.log(res)
                if(res==="error" || res[0][0].count==="0"){
                    setILike(false);
                }else{
                    setILike(true);
                }
            })
        })
    }


    useEffect(()=>{
        if(props.tokenId !== undefined){
            console.log(props.tokenId);
            getNFTLikes();
            doILike();
            console.log("load NFT LIKES NEW")
        }

        window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{setUser(currentUsers[0])});


    },[props])



    return (

        <div className={classes.container} >

            {/*NFT IMAGE */}
            <img src={props.imageURL} className={classes.NFTimage} onClick={openThisNFTPage}></img>
            {/*NFT IMAGE */}
            <div className={classes.bottom}>

                <div className={classes.nameAndFrom}> {props.imageName}</div>
                <div className={classes.nameAndNumber}>{"#"+props.tokenId}</div>


            </div>

            <div className={classes.bottom2}>

            <img src={ethereum} className={classes.ethereum}></img>

                <div className={classes.likesWrapper}>

                { !iLike &&  <MiniButton onButtonClicked={likeNFT} img={blackHerz} popupText={"like"}/>  }
                { iLike  &&   <MiniButton onButtonClicked={dislikeNFT} img={redHerz} popupText={"dislike"}/>  }


                    <div className={classes.numberlikes}> {NFTLikes} </div>
                </div>



            </div>


        </div>





    );


}

export default NFTFormat;