import classes from './ChatPage.module.css';
import React, {useState,useEffect,useContext,useLayoutEffect,useRef} from 'react';
import {useParams} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {getAllFriendsPromise} from '../../web3/GetAllFriends'
import FriendListElement from '../../components/chatPage/FriendListElement'
import Message from '../../components/chatPage/Message'
import sendImg from '../../images/send.png'
import {shortAddr} from '../../web3/LoadingFunctions'
import {loadMessagesFromDB} from '../../node/cryptoMessages'
import {sendMessageToDB} from '../../node/cryptoMessages'


import PopupFenser from '../../components/PopupFenster/PopupFenster'

//mui
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';


//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'


// Message : {message,from,to,date}
function ChatPage(){

    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    const [friends,setFriends] = useState([])
    const [selectedFriend,setSelectedFriends] = useState(false) //{friend_name:String, friend_addr:String, blockchain:Boolean, pic:String}
    const [currentMessages,setCurrentMessages] = useState([]) //{messages:[{message,from,to,date}],amount:amountMessages}]
    const [inputValue,setInputValue] = useState("")

    useEffect(()=>{
        if(nightMode){
            setTheme(themes.dark)
        }else{
            setTheme(themes.bright)
        }
    },[nightMode])


    const messageInput = useRef()


    async function loadFriends(){
        setFriends( await getAllFriendsPromise() )// return [{friend_name:String, friend_addr:String, blockchain:Boolean} ]

    }

    useEffect(() => {
        loadFriends()
    },[])


    async function send(text){
        const myAddress = await window.ethereum.request({method: 'eth_accounts'}).then(res=>{return res[0]})

        const message = {message:text,from:myAddress,to:selectedFriend.friend_addr,date:new Date().toLocaleString('en-US', { timeZone: 'UTC' })}

        console.log(message)

        sendMessageToDB(message)

    }
    function sendWithEnter(e){
        if(e.key === "Enter"){
            send(e.target.value)
            setInputValue("")
        }
    }
    function inputChanged(e){
        setInputValue(e.target.value)
    }

    function selectFriend(pic,friend){ // friend: {friend_name:String, friend_addr:String, blockchain:Boolean}
        friend.pic=pic[0];  // add selectedFriendPicURL: // friend: {friend_name:String, friend_addr:String, blockchain:Boolean, pic:String}
        setSelectedFriends(friend)
    }

    async function loadMessages(){
        const myAddress = await window.ethereum.request({method: 'eth_accounts'}).then(res=>{return res[0]})
        const partnerAddress = selectedFriend.friend_addr

        //loadMessagesFromDB(me,partner)
        //Load all Messages from me and partner from DB
        //{messages: [{message,from,to,date}],amount:amountMessages}] if no messages amount = 0
        // message = {message,from,to,date}
        setCurrentMessages( await loadMessagesFromDB(myAddress,partnerAddress) )
    }

    // Load Messages everyTime SelectedFriend changes
    useEffect(() =>{
        loadMessages()
    },[selectedFriend])

    console.log(currentMessages)
    console.log(Boolean(currentMessages))

    return (

        <div style={{backgroundColor:theme.color1}} className={classes.container}>

            <div style={{backgroundColor:theme.color1,border:theme.border}}  className={classes.container2}>

                {/*Menu */}
                <div style={{borderRight:theme.border}} className={classes.menu}>

                    {friends.map(friend =><FriendListElement onClick={(pic)=>{selectFriend(pic,friend)}} friend={friend}/>)}

                </div>

                {/*ChatFenster */}
                <div className={classes.chatWindow}>

                    {/*chatPartner */}

                    <div className={classes.chatPartner} style={{borderBottom:theme.border}}>
                    {Boolean(selectedFriend) &&
                        <div style={{display: 'flex',alignItems:'center'}}>
                        <Avatar sx={{height:'33px',width:'33px',marginLeft:'10px',marginRight:'10px'}} src={selectedFriend.pic} />
                        <div>
                            <div style={{fontWeight:'bold',fontSize:'15px',color:theme.font}}>{selectedFriend.friend_name}</div>
                            <div style={{opacity:'0.6',fontSize:'11px',color:theme.font}}>{shortAddr(selectedFriend.friend_addr)}</div>
                        </div>
                        </div>
                    }
                    </div>

                    {/*messageArea */}
                    <div className={classes.messageArea} style={{borderBottom:theme.border}}>

                    { currentMessages.messages!==undefined && currentMessages.messages.map(item =>{

                        return <Message person={item.sender} message={item.message} date={item.date}/>

                    })}

                    </div>

                    {/*messageField */}
                    <div className={classes.messageField}>

                        <TextField ref={messageInput} inputProps={{ style: { color: theme.font } }} id="outlined-multiline-flexible" label="Your Message" fullWidth maxRows={3} value={inputValue} onChange={inputChanged} onKeyDown={sendWithEnter}>
                        </TextField>

                    </div>


                </div>

            </div>

        </div>

    );


}

export default ChatPage;