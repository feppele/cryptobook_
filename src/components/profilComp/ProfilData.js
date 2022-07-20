import classes from './ProfilData.module.css';
import settingsPic from '../../images/settings2.png';
import savePic from '../../images/save.png';
import StandartProfilPic from '../../images/background.jpeg';
import etherSign from '../../images/Crypto-Icons/eth-logo.svg';
import {web3} from '../../web3/Web3';
import {getAddress} from '../../web3/LoadingFunctions'
//import {onLoad} from '../../web3/LoadingFunctions'
import {shortAddr} from '../../web3/LoadingFunctions'
import coverImage from '../../images/image.png';
import {getCurrentUser} from '../../web3/HelperFunctions'
import ImageSetting from './ImageSetting';
import React, {useState,useEffect,useHistory,useContext} from 'react';
import {query,getOptions,queryFetch} from '../../node/databank';
import {getProfilePicURL} from '../../node/images'
import black_herz from '../../images/backherz.png'

import {fetchi} from '../../globalData'

import PopupFenster from '../PopupFenster/PopupFenster'
import LikesIntegration from '../PopupFenster/LikesIntegration'

//material UI 
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

//User Context
import {UserContext} from '../../UserProvider'


function uploadImage (userAddress) {

    // this returns a File().
    var image= document.getElementById("imageInput").files[0];
    var type = image.type;
    var imgType = type.substring(type.lastIndexOf("/")+1,1000);
    console.log(imgType);

    // because comes from Context now
    //getCurrentUser().then(userAddress =>{
        // cannot change name of file so copy file and create new one with other name
        // set Name to address from person
        var blob = image.slice(0, image.size);
        var newFile = new File([blob], userAddress +"." + imgType);

        // FromData is a list from keys and values. set key=image and value = File. 'image is important because same name is used in server'
        var formData = new FormData();
        formData.set('image',newFile);

        // delete old picture
        const params = { userAddress: userAddress};
        const options = { method: 'POST',headers:{'content-type': 'application/json'},body: JSON.stringify( params ) };
        fetch(fetchi+  '/deleteProfilPic',options).then(res => { return res.json()}).then(res=>{console.log(res)

        }).then(()=>{
             //upload new picture

            console.log(formData)
            fetch( fetchi+ '/uploadUserImage', {
                method: 'POST',
                body: formData
            }).then(console.log)//.then(window.location.reload())
        })
    
    //})
}

function ProfilData(){
        const userData = useContext(UserContext)
        // Night Mode
        const nightMode = useContext(NightContext)
        const [theme,setTheme] =useState(themes.bright)
        useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    const [settingMode,setSettingMode] =useState(false);
    const [usernameDB,setUsernameDB] =useState("noch net da");
    const [userNameIsLoad,setUserNameIsLoad] =useState(false);
    const [saved,setSaved] =useState(false);
    const [address,setAddress] =useState(userData.address);
    const [followArrayList,setFollowArrayForList]= useState([]);
    const [followList,setFollowList]= useState(false);
    
    // for Alert
    const [alertOpen, setAlertOpen] = useState(true);


    // Follower
    function getFollowList(){
        fetch(fetchi + "/databank",getOptions("getFollowList",{person: address}))
        .then(res => {return res.json()}).then(res=>{
            console.log("getFollowList");
            console.log(res);
            if(res==="error"){
                setFollowArrayForList([]);
            }
            setFollowArrayForList(res);
        })
    }
    function closeFollowList(){
        setFollowList(false);
    }
    function openFollowList(){
        setFollowList(true);
    }

    useEffect(()=>{
        getFollowList()
    },[address])
    


    useEffect(() => {

        //getCurrentUser().then(res=>{setAddress(res);})
        setAddress(userData.address)
    },[])

    function activateSetting(){
        setSettingMode(true);
    }


    function onSaveClick(){
        const username =  document.getElementById("userName").value;

        console.log(username)

        // if username is change
        if(username !== ""){

            //window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{
                //const res = query("add",{ address: currentUsers[0], username: username});
                const res = query("add",{ address: userData.address, username: username});
                console.log(res)
            //})
            setUsernameDB(username)
        }

        setSettingMode(false);
        // just for infobanner
        setSaved(true);

        var image= document.getElementById("imageInput").files[0];
        // if image is change
        if(image !== undefined){
            //upload image to backend
            uploadImage(userData.address);
            // set image direct without loading from DB
            var reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = function(e) {
                setProfilePicSource(e.target.result)
            };
        }

    }


    // on Load get name from databank
    function loadNameFromDB(){
        if(!window.ethereum){return}

        //window.ethereum.request({method: 'eth_accounts'}).then(currentUsers =>{


            const options=getOptions("find",{address: userData.address });

            fetch(fetchi+ "/databank",options).then(res => { return res.json()}).then(res=>{
                if(res[0].length===0){
                    setUsernameDB("unnamed");
                }else{
                    setUsernameDB(res[0][0].name);
                }
                setUserNameIsLoad(true);
            });
        //});

    }
    useEffect(() => {loadNameFromDB();},[])

    // IMAGE SETTINGS___________________________________________________



    // GET Profile Picture
    const [profilePicSource,setProfilePicSource] = useState(StandartProfilPic)
    const [profilePic,setProfilePic] = useState(false);

    function getProfilePic(){

        getProfilePicURL(userData.address).then(url =>{
            if(url.length !==0){
                setProfilePic(true);
                setProfilePicSource(url[0])
                console.log(url[0])
            }
        })

    }
    useEffect(() => {getProfilePic()},[])



    // Image Settings__________________________________
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

    // input Tag has ugly Button. So make input invisible in css. Create new button and ref!! on click to input tag
    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    // Image Settings__________________________________^^^^^


    return (

        <div style={{backgroundColor:theme.color1}} id="cont" className={classes.container}>

            {followList && <PopupFenster text={"My Followers"} onCloseClicked={closeFollowList} integration={<LikesIntegration likesList={followArrayList}/>} /> }

            <div className={classes.greyBox}>

            <img className={classes.backgroundPic} src={profilePicSource}></img>

            </div>

            { !settingMode && <img src={profilePicSource} className={classes.profilePicture}></img>    }


            {/* SETTINGS MODE    PICTURE*/}
            { settingMode &&

            <div className={classes.imageUploadWrapper}>
            <form id="imageupload" >
                <input ref={hiddenFileInput} id ="imageInput" type="file" name="image" accept="image/jpg image/png " onChange={changeHandler}  className={classes.imageInput}/>
            </form>
            <div onClick={handleClick} className={classes.hiddenFileButton}></div>

            { !isSelected && <img src ={coverImage} className={classes.coverImage}></img>}
            { isSelected &&   <img src={URL.createObjectURL(selectedFile)} className={classes.image}></img>  }
            </div>

           }{/* SETTINGS MODE    PICTURE*/}


            { !settingMode && userNameIsLoad && <p style={{color:theme.font}} id="name" className={classes.name}> {usernameDB}</p>    }

            {/* SETTINGS MODE    NAME*/}
            { settingMode && <div className={classes.editNameWrapper}>
                                <input id="userName"type="text" placeholder="your name" className={classes.textInput}></input>

                                <Tooltip title="save" disableInteractive arrow placement="top">
                                    <Button variant="outlined" onClick={onSaveClick}>    < img src={savePic} style={{height: '20px',width: 'auto'}}></img>   </Button>
                                </Tooltip>

                            </div>   }


                {/*Crypto Address */}
                <Button sx={{gap:'10px',border:'1px solid black'}}> <img id="cryptoSign" src={etherSign} className={classes.cryptoSign}></img> {shortAddr(address)}</Button>


            <div className={classes.buttonPosition}>
                <Tooltip title="settings" disableInteractive arrow placement="top">
                    <Button variant="outlined" onClick={activateSetting}>    < img src={settingsPic} style={{height: '20px',width: 'auto',filter:theme.png}}></img>   </Button>
                </Tooltip>
            </div>


            <div className={classes.followWrapper}>
                    <img src={black_herz} className={classes.herz}></img>
                    <div style={{color:theme.font}} onClick={openFollowList} className={classes.text}> {"My Followers"} </div>
            </div>



            { saved && <Collapse in={alertOpen}> <Alert autoHideDuration={1000} onClose={() => {setAlertOpen(false)}} severity="success" color="info" sx={{position:'fixed', right:'0',bottom:'10px'}}>Saved sucessfully!</Alert> </Collapse> }

        </div>


    );


}

export default ProfilData;

