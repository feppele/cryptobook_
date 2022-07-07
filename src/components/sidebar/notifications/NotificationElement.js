import classes from './NotificationElement.module.css';
import {shortAddr} from '../../../web3/LoadingFunctions';
import {useHistory} from 'react-router-dom';
import {useEffect,useState,useContext,useLayoutEffect} from 'react'
import {loadNameFromDB2} from '../../../node/databank'
import closePng from '../../../images/close.png'
import {getNFTInfoFromTokenId} from '../../../node/NFTData'

//ColorTheme - Night Mode
import {themes} from '../../../ColorTheme'
import {NightContext} from '../../../NightModeProvider'

import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';


//props.notification :
////[ {notification,von,zu,nft,id} ]
function NotificationElement(props){

    console.log(props)

            // Night Mode
            const nightMode = useContext(NightContext)
            const [theme,setTheme] =useState(themes.bright)
            useEffect(()=>{
                if(nightMode){
                    setTheme(themes.dark)
                }else{
                    setTheme(themes.bright)
                }
            },[nightMode])

            const [actorName,setActorName] =useState({friend_name:""})
            const [NFTName,setNFTName] =useState("")

            async function loadActorName(){
                setActorName(await loadNameFromDB2(props.notification.von))
            }
            useEffect(()=>{
                loadActorName()
            },[props])

            const history = useHistory()
            function openActorProfile(){

                history.push(`/profile/${props.notification.von}`)
                props.close()
            }

            async function loadNFTName(){
                if(props.notification.notification === "nftlike"){
                    const info = await getNFTInfoFromTokenId(props.notification.nft)
                    console.log(info)
                    setNFTName(info[0][0].name)
                }
            }
           useLayoutEffect(() => {loadNFTName()},[])

            function openNFTPage(){
                history.push(`/thisNFT/${props.notification.nft}`)
                props.close()
            }



    return (

        <div  style={{borderBottom:theme.border}} className={classes.container}>

                {props.notification.notification === "follow" &&
                <div className={classes.text}>
                          <Link sx={{cursor: "pointer"}} onClick={openActorProfile} underline="hover"> {actorName.friend_name} </Link> <div>is following you</div>
                </div>
                }
                {props.notification.notification === "nftlike" &&
                <div className={classes.text}>
                          <Link sx={{cursor: "pointer"}} onClick={openActorProfile} underline="hover"> {actorName.friend_name} </Link> <div>likes your NFT: </div> <Link sx={{cursor: "pointer"}} onClick={openNFTPage} underline="hover"> {NFTName} </Link>
                </div>
                }


        <IconButton onClick={()=>{props.deleteNotification(props.notification.id)}} sx={{marginRight:'10px'}}> <img style={{height:'15px',width:'auto',filter:theme.png}} src={closePng}></img> </IconButton>


        </div>


    )


}

export default NotificationElement;