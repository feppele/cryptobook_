import classes from './Friends.module.css';
import React, { Component,useContext } from 'react';
import {useState,useEffect,useRef} from 'react';
import FriendElementCreator from './FriendElementCreator';
//modals
import NoFriendsSign from './NoFriendsSign';
import addImg from '../../images/add-user.png'
import saveFriend from '../../images/saveFriend2.png';
import {getAllFriendsPromise} from  '../../web3/GetAllFriends';


//popup
import PopupFenster from '../PopupFenster/PopupFenster'
import AddFriendIntegration from '../PopupFenster/AddFriendIntegration'

//material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';

import { SnackbarComp } from './Snackbar';

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'


 function Friends(){

        // Night Mode
        const nightMode = useContext(NightContext)
        const [theme,setTheme] =useState(themes.bright)
        useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    const searchIn= useRef()

    const [showSad, setShowSad] = useState(false);
    const [addFriendIsOpen, setAddFriendIsOpen ] = useState(false);
    const [searchResult,setSearchResult] = useState([]);
    const [allFriends,setAllFriends] = useState([]);

    function openAddFriend(){
        setAddFriendIsOpen(true);
    }
    function closeAddFriend(){
        setAddFriendIsOpen(false);
    }

    
    // Load Friends Stuff
    useEffect(() => {
        getAllFriendsPromise().then(res => { // return [{friend_name:String, friend_addr:String, blockchain:Boolean} ]
            setSearchResult(res);
            setAllFriends(res);
            if(res.length <1 ){
                setShowSad(true);
            }
        })
    },[])

    // Search stuff
    function filter(){
        var results =[];
        for(var i=0;i<allFriends.length;i++){

            if(allFriends[i].blockchain === true ){
                results.push(allFriends[i]);
            }
        }
        setSearchResult(results);
    }

    function search(e){
        if(e.key !== "Enter"){
            return
        }

        const searchName = document.getElementById("searchInput").value;
        var results =[];
        for(var i=0;i<allFriends.length;i++){
            if((allFriends[i].friend_name.search(searchName) !== -1) || (allFriends[i].friend_addr.search(searchName) !== -1) ){
                results.push(allFriends[i]);
            }
        }
        setSearchResult(results);
    }

    console.log({backgroundColor:theme.color2})

    // Snackbar
    const [state, setState] = useState({ open: false, Transition: Slide, });
    const handleClose = () => { setState({ ...state, open: false }); };
    const handleClick = (Transition) => () => { setState({ open: true, Transition, })}


    return (

        <div style={{backgroundColor:theme.color1}} className={classes.container1}>

        <Snackbar open={state.open} onClose={handleClose} TransitionComponent={state.Transition} message={state.message} key={state.Transition.name} />


            <div style={{borderBottom: theme.border}} className={classes.header}>
                <div style={{color:theme.font,fontSize:'40px',marginLeft:'40px'}}>friends</div>
            </div>

        <div className={classes.container}>

            {/* LEFT SIDE */}
            <div  className={classes.menu}>

                <div style={{backgroundColor:theme.color2,border:theme.border}} className={classes.box}>

                    {  addFriendIsOpen && <PopupFenster integration={<AddFriendIntegration openSnackbar={()=>{closeAddFriend(); setState({ ...state, open: true,message:"Friend added" })}}/>}  onCloseClicked={closeAddFriend} text={"Add Friend"}/>}

                    <ButtonGroup sx={{marginRight:'1px'}}variant="outlined" aria-label="outlined primary button group">
                        <Tooltip title="Add" placement="top" disableInteractive arrow>
                            <Button onClick={openAddFriend} ><img src={addImg} style={{height:'20px',width:'auto',filter:theme.png}}></img></Button>
                        </Tooltip>
                        <Tooltip title="filter" placement="top" disableInteractive arrow>
                            <Button onClick={filter} ><img src={saveFriend} style={{height:'20px',width:'auto'}}></img></Button>
                        </Tooltip>
                    </ButtonGroup>

                    <input style={{backgroundColor:theme.color2,color:theme.font}}onKeyDown={search} id="searchInput" type="text" placeholder="  search name or address" className={classes.searchInput}></input>


                </div>

            </div>{/* LEFT SIDE */}

            {/* RIGHT SIDE */}
            <div className={classes.friendsListSite}>

                {allFriends.length<1 && <NoFriendsSign load={showSad} text= "no friends yet"/>}

                <div id="friendList" className={classes.friendList}>
                    <FriendElementCreator friends ={searchResult} />
                </div>

            </div>{/* RIGHT SIDE */}
        </div>
        </div>

    );
}

export default Friends;