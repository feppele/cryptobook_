
import {fetchi} from '../globalData'
import {getOptions} from './databank'
import {loadNameFromDB2} from './databank'
import {decryptedMessage,encryptMessage} from '../encryption'


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

    // encrypt
    const senderMessage = await encryptMessage(message.message,message.from)
    const receiverMessage = await encryptMessage(message.message,message.to)
    message.senderMessage=senderMessage
    message.receiverMessage=receiverMessage
    message.message ="" // delete real message

    var res = await fetch(fetchi+ "/databank",getOptions("sendMessageEnrcypt",message )).then(res => {return res.json()}).catch(console.log);

    console.log(res)
}



//messages : {message,von,zu,date,id,receivermessage,sendermessage}
export async function loadMessagesFromDBEncrypt(me,partner,limit,offset){

    var messages = await fetch(fetchi+ "/databank",getOptions("getMessages",{from: me, to: partner,limit:limit,offset:offset} )).then(res => {return res.json()}).catch(console.log);
    const amountMessages =messages[0].length
    messages = messages[0]
    messages = messages.reverse()


    messages = messages.map(ele=>{

        return {message: decryptedMessage(ele.sendermessage) , von:ele.von,zu:ele.zu,date:ele.date,id:ele.id,receivermessage:ele.receivermessage,sendermessage:ele.sendermessage}
    })

    console.log(messages)

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



// return {messsage,von,zu,date,id}
async function getLatestMessage(me,partner){

    var latesMessage = await fetch(fetchi+ "/databank",getOptions("getLatestMessage",{from: me, to: partner}  )).then(res => {return res.json()}).catch(console.log);

    //console.log(latesMessage[0][0])

    return latesMessage[0][0] || {message:""};

}





export {loadMessagesFromDB};
export {sendMessageToDB};
export {getLatestMessage};

