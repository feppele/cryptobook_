
import {fetchi} from '../globalData'
import {getOptions} from './databank'
import {loadNameFromDB2} from './databank'


//if no Messages amount = 0
// return return {messages:messages[0],amount:amountMessages}
//message = {message,from,to,date}
async function loadMessagesFromDB(me,partner){

    var messages = await fetch(fetchi+ "/databank",getOptions("getMessages",{from: me, to: partner} )).then(res => {return res.json()}).catch(console.log);
    const amountMessages =messages[0].length
    messages = messages[0]

    //Load Also names from DB
    const partnerName = await loadNameFromDB2(partner)

    messages = messages.map((ele)=> {
        ele.von === me ? ele.sender="me" : ele.sender=partnerName.friend_name
        return ele
    })
    const erg = {messages:messages,amount:amountMessages}
    console.log(erg)

    return erg
}

async function sendMessageToDB(message){

    var res = await fetch(fetchi+ "/databank",getOptions("sendMessage",message )).then(res => {return res.json()}).catch(console.log);

    console.log(res)

}





export {loadMessagesFromDB};
export {sendMessageToDB};
