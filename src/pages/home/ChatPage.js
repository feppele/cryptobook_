import classes from './ChatPage.module.css';
import React, {useState,useEffect,useContext,useLayoutEffect,useRef} from 'react';
import {useParams} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {getAllFriendsPromise} from '../../web3/GetAllFriends'
import FriendListElement from '../../components/chatPage/FriendListElement'
import Message from '../../components/chatPage/Message'
import sendImg from '../../images/send.png'
import backImg from '../../images/zuruck.png'
import addImg from '../../images/plus.png'
import {shortAddr} from '../../web3/LoadingFunctions'
import {loadMessagesFromDB,loadMessagesFromDBEncrypt} from '../../node/cryptoMessages'
import {sendMessageToDB,sendMessageToDBEnrcypt} from '../../node/cryptoMessages'
import {getLatestMessage} from '../../node/cryptoMessages'
import {web3} from '../../web3/Web3'
import { ethers } from "ethers";
// import {crypto} from'crypto';
import {getPublicKey} from '../../node/databank'


import {encryptMessage} from '../../encryption'

//popup
import PopupFenster from '../../components/PopupFenster/PopupFenster'
import AddFriendIntegration from '../../components/PopupFenster/AddFriendIntegration'

//mui
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';


//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

const crypto = require('crypto');


    // amount of Messages which load when load older messages Button pressed
    const LIMIT = 15
    const OFFSET = 15

// Message : {message,from,to,date}
function ChatPage(){
    const history =useHistory();
    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    const [friends,setFriends] = useState([])
    const [selectedFriend,setSelectedFriends] = useState({})
    const [friendIsSelected,setFriendIsSelected] = useState(false) //{friend_name:String, friend_addr:String, blockchain:Boolean, pic:String}
    const [currentMessages,setCurrentMessages] = useState([]) //[{message,from,to,date}]
    const [inputValue,setInputValue] = useState("")

    const [chatOpen,setChatOpen] = useState(true)
    const [openAddModal,setOpenFriendModal] = useState(false)
    const [loading,setLoading] = useState(true)

    function addFriend(){
        setOpenFriendModal(true)
    }

    function closeAddFriend(){
        setOpenFriendModal(false)
        loadFriends()
    }



    // CSS OPEN CLOSE chat window for phone Version
    const chatWindowRef = useRef()
    window.addEventListener("resize", ()=>{
        if(window.innerWidth>=1000){
            setChatOpen(true)
        }
    });
    function openChatWindow(){
        setChatOpen(true)
        setTimeout(()=>{chatWindowRef.current.style.right= '0px'},100)
    }
    function closeChatWindow(){
        chatWindowRef.current.style.right= '-1000px'
        setTimeout(()=>{setChatOpen(false)},1000)
    }








    function openProfile(){
        history.push(`/profile/${selectedFriend.friend_addr}`)
    }




    const messageInput = useRef()


    async function loadFriends(){
        const res = await getAllFriendsPromise() // return [{friend_name:String, friend_addr:String, blockchain:Boolean} ]
        // SORT 
        var array =[]
        for (const ele of res){
            const res1 = await getLatestMessage(ele.friend_addr).then(message=>{
                var id 
                if(message.message===""){
                    id=0
                }else{
                    id=message.id
                }
                const push={friend_name:ele.friend_name, friend_addr:ele.friend_addr, blockchain:ele.blockchain,id: id }
                return push
            })
            array.push(res1)
        }
        // sort nach ID
        array.sort(function(a,b){return b.id-a.id;})
        // filter double. bacuse blockchain and same followfriend could be in array
        array = array.filter((v, i, a) => a.findIndex(t => (t.friend_addr === v.friend_addr)) === i);

        setFriends(array)
        if(array.length>0){
            setSelectedFriends(array[0])
            setFriendIsSelected(true)
        }
        setLoading(false)
    }

    useEffect(() => {
        loadFriends()
    },[])

    async function send(text){
        const myAddress = await window.ethereum.request({method: 'eth_accounts'}).then(res=>{return res[0]})
        var message = {message:text,from:myAddress,to:selectedFriend.friend_addr,date:new Date().toLocaleString('en-US', { timeZone: 'UTC' })} //new Date().toLocaleString('en-US', { timeZone: 'UTC' })
        // Send MEssage to DB
        sendMessageToDB(message)
        // send encrypt
        //sendMessageToDBEnrcypt(message)
        // Also add direkt to State, that I see my new message immediatley. add message.sender, which also happens in cryptomessages.js
        message.sender="me"
        setCurrentMessages(currentMessages=>[...currentMessages,message]   )
        var messageArea = document.getElementById('messageArea');
        messageArea.scrollTop = messageArea.scrollHeight
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

    // when on MenuFriend clicked
    function selectFriend(pic,friend){ // friend: {friend_name:String, friend_addr:String, blockchain:Boolean}
        // just if friend switch, not when press 2 timies on same friend
        if(selectedFriend ==friend){return}
        friend.pic=pic[0];  // add selectedFriendPicURL: // friend: {friend_name:String, friend_addr:String, blockchain:Boolean, pic:String}
        setSelectedFriends(friend)
        setMsgOffset(0) //msgOffset
        openChatWindow()
        setCurrentMessages([])
    }

    // load messages
    const [msgOffset,setMsgOffset] =useState(0)
    var bottom =0
    async function loadMessages(){
        //if(!friendIsSelected){return}
        console.log(selectedFriend.friend_addr)
        const myAddress = await window.ethereum.request({method: 'eth_accounts'}).then(res=>{return res[0]});
        const partnerAddress = selectedFriend.friend_addr;
        // bevore new message calculate Bottom
        var messageArea = document.getElementById('messageArea');
        bottom = messageArea.scrollHeight -messageArea.scrollTop -messageArea.clientHeight
        // load Messages from DB
        const res = await loadMessagesFromDB(myAddress,partnerAddress,LIMIT,msgOffset)
        //const res = await loadMessagesFromDBEncrypt(myAddress,partnerAddress,LIMIT,msgOffset)
        setCurrentMessages(currentMessages=>[...res.messages,...currentMessages])
        // after new messages Load set scrollTop
        messageArea.scrollTop = messageArea.scrollHeight - bottom - messageArea.clientHeight
    }

    // Load Messages everyTime SelectedFriend and msgOffset changes
    useEffect(() =>{
        loadMessages()
    },[selectedFriend,msgOffset])


    return (

        <div style={{backgroundColor:theme.color1}} className={classes.container}>


        { openAddModal && <PopupFenster integration={<AddFriendIntegration/>} onCloseClicked={closeAddFriend} text={"Add Friend"}/>}


            <div style={{backgroundColor:theme.color1,border:theme.border}}  className={classes.container2}>

                {/*Menu */}
                <div style={{borderRight:theme.border}} className={classes.menu}>

                    <div style={{borderBottom:theme.border}} className={classes.menuHeader}>

                        <IconButton onClick={addFriend} sx={{marginRight:'10px'}}> <img style={{height:'20px',width:'auto',filter:theme.png}} src={addImg}></img> </IconButton>

                    </div>

                    {false && <CircularProgress color="inherit" sx={{position: 'relative',left:'50%',transform:'translateX(-50%)' }}/>}

                    {loading && <LinearProgress color="inherit" sx={{backgroundColor:'white'}}/>}
                    {friends.map(friend =><div style={friend.friend_addr===selectedFriend.friend_addr? {backgroundColor:theme.color2} : {backgroundColor:theme.color1}}><FriendListElement onClick={(pic)=>{selectFriend(pic,friend)}} friend={friend} seleced={selectedFriend}/></div>)}

                </div>

                {/*ChatFenster */}

                {chatOpen && <div ref={ chatWindowRef} style={{backgroundColor:theme.color1}} className={classes.chatWindow}>

                    {/*chatPartner */}

                    <div className={classes.chatPartner} style={{borderBottom:theme.border}}>


                    <div className={classes.backButton}><IconButton onClick={closeChatWindow}> <img style={{height:'25px',width:'auto',filter:theme.png}} src={backImg}></img>  </IconButton></div>
                    {friendIsSelected &&
                        <div style={{display: 'flex',alignItems:'center',cursor:'pointer'}} onClick={openProfile}>
                            <Avatar sx={{height:'33px',width:'33px',marginLeft:'10px',marginRight:'10px'}} src={selectedFriend.pic} />
                            <div>
                                <div style={{fontWeight:'bold',fontSize:'15px',color:theme.font}}>{selectedFriend.friend_name}</div>
                                <div style={{opacity:'0.6',fontSize:'11px',color:theme.font}}>{shortAddr(selectedFriend.friend_addr)}</div>
                            </div>
                        </div>
                    }
                    </div>

                    {/*messageArea */}
                    <div id="messageArea" className={classes.messageArea} style={{borderBottom:theme.border}}>

                        <Button onClick={()=>{setMsgOffset(msgOffset+OFFSET)}} sx={{width:'200px',position:'relative',left:'50%',transform: 'translate(-50%, 0)'}}>load older messages</Button>

                    {  currentMessages.map(item =>{

                        return <Message person={item.sender} message={item.message} date={item.date}/>

                    })}

                    </div>

                    {/*messageField */}
                    <div className={classes.messageField}>

                        <TextField ref={messageInput} inputProps={{ style: { color: theme.font } }} id="outlined-multiline-flexible" label="Your Message" fullWidth maxRows={3} value={inputValue} onChange={inputChanged} onKeyDown={sendWithEnter}>
                        </TextField>

                    </div>


                </div>
                }

            </div>

        </div>

    );


}

export default ChatPage;