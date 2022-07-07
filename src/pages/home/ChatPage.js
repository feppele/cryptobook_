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
import {getLatestMessage} from '../../node/cryptoMessages'




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
    const history =useHistory();
    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    const [friends,setFriends] = useState([])
    const [selectedFriend,setSelectedFriends] = useState({})
    const [friendIsSelected,setFriendIsSelected] = useState(false) //{friend_name:String, friend_addr:String, blockchain:Boolean, pic:String}
    const [currentMessages,setCurrentMessages] = useState([]) //[{message,from,to,date}]
    const [inputValue,setInputValue] = useState("")


    useEffect(()=>{
        if(nightMode){
            setTheme(themes.dark)
        }else{
            setTheme(themes.bright)
        }
    },[nightMode])


    useLayoutEffect(() => {

        var elem = document.getElementById('messageArea');
        elem.scrollTop = elem.scrollHeight;

    })

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
                console.log(message)
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
        console.log(array)

        setFriends(array)
        setSelectedFriends(array[0])
        setFriendIsSelected(true)
    }
    
  

    useEffect(() => {
        loadFriends()
    },[])


    async function send(text){
        const myAddress = await window.ethereum.request({method: 'eth_accounts'}).then(res=>{return res[0]})

        const message = {message:text,from:myAddress,to:selectedFriend.friend_addr,date:new Date().toLocaleString('en-US', { timeZone: 'UTC' })} //new Date().toLocaleString('en-US', { timeZone: 'UTC' })

        console.log(message)

        // Send MEssage to DB
        sendMessageToDB(message)
        // Also add direkt to State, that I see my new message immediatley. add message.sender, which also happens in cryptomessages.js
        message.sender="me"
        setCurrentMessages(currentMessages=>[...currentMessages,message]   )

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
        console.log(selectedFriend.friend_addr)
        const myAddress = await window.ethereum.request({method: 'eth_accounts'}).then(res=>{return res[0]});
        const partnerAddress = selectedFriend.friend_addr;

        //loadMessagesFromDB(me,partner)
        //Load all Messages from me and partner from DB
        //{messages: [{message,from,to,date}],amount:amountMessages}] if no messages amount = 0
        // message = {message,from,to,date}
        const res = await loadMessagesFromDB(myAddress,partnerAddress)
        setCurrentMessages(res.messages)
        //console.log(res.messages)
    }

    // Load Messages everyTime SelectedFriend changes
    useEffect(() =>{
        loadMessages()
    },[selectedFriend])


    //Load new Messages in Interval
    // useEffect(() => {
    //     setInterval(() =>{
    //         loadMessages();
    //     },6000)

    // },[])

    return (

        <div style={{backgroundColor:theme.color1}} className={classes.container}>

            <div style={{backgroundColor:theme.color1,border:theme.border}}  className={classes.container2}>

                {/*Menu */}
                <div style={{borderRight:theme.border}} className={classes.menu}>

                    {friends.map(friend =><FriendListElement onClick={(pic)=>{selectFriend(pic,friend)}} friend={friend} seleced={selectedFriend}/>)}

                </div>

                {/*ChatFenster */}
                <div className={classes.chatWindow}>

                    {/*chatPartner */}

                    <div className={classes.chatPartner} style={{borderBottom:theme.border}}>
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

            </div>

        </div>

    );


}

export default ChatPage;