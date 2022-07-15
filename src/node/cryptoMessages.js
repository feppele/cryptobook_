
import {fetchi} from '../globalData'
import {getOptions} from './databank'
import {loadNameFromDB2} from './databank'


//if no Messages amount = 0
// return return {messages:messages[0],amount:amountMessages}
//message = {message,from,to,date}
async function loadMessagesFromDB(me,partner,limit,offset){

    var messages = await fetch(fetchi+ "/databank",getOptions("getMessages",{from: me, to: partner,limit:limit,offset:offset} )).then(res => {return res.json()}).catch(console.log);
    const amountMessages =messages[0].length
    messages = messages[0]
    messages = messages.reverse()

    //Load Also names from DB
    const partnerName = await loadNameFromDB2(partner)

    messages = messages.map((ele)=> {
        ele.von === me ? ele.sender="me" : ele.sender=partnerName.friend_name
        return ele
    })
    const erg = {messages:messages,amount:amountMessages}
    //console.log(erg.messages)

    return erg
}

async function sendMessageToDB(message){

    var res = await fetch(fetchi+ "/databank",getOptions("sendMessage",message )).then(res => {return res.json()}).catch(console.log);

    console.log(res)

}

export async function sendMessageToDBEnrcypt(message){

    var res = await fetch(fetchi+ "/databank",getOptions("sendMessageEnrcypt",message )).then(res => {return res.json()}).catch(console.log);

    console.log(res)

}


// return {messsage,von,zu,date,id}
async function getLatestMessage(partner){

    const me = await window.ethereum.request({method: 'eth_accounts'}).then(res =>{return res[0]})

    var latesMessage = await fetch(fetchi+ "/databank",getOptions("getLatestMessage",{from: me, to: partner}  )).then(res => {return res.json()}).catch(console.log);

    //console.log(latesMessage[0][0])

    return latesMessage[0][0] || {message:""};

}





export {loadMessagesFromDB};
export {sendMessageToDB};
export {getLatestMessage};

