import {fetchi} from '../globalData'
import {getOptions} from './databank'


// return [ {notification,von,zu,nft,id} ]
//if no notification: return: [] empty array
async function loadMyNotificationsFromDB(){
    const me = JSON.parse(sessionStorage.getItem("userdata")).address
    var notificcation = await fetch(fetchi+ "/databank",getOptions("loadMyNotifications",{zu: me.toString()}  )).then(res => {return res.json()}).catch(console.log);

    notificcation = notificcation[0]

    console.log(notificcation)
    return notificcation;
}

async function setNotificationsToDB(notification,von,zu,nft){
    const me = JSON.parse(sessionStorage.getItem("userdata")).address
    var notificcation = await fetch(fetchi+ "/databank",getOptions("setNotification",{notification:notification,von: me.toString(),zu:zu,nft:nft}  )).then(res => {return res.json()}).catch(console.log);

    notificcation = notificcation[0]

    console.log(notificcation)
    return notificcation;
}

async function deleteNotificationDB(id){

    await fetch(fetchi+ "/databank",getOptions("deleteNotification",{id:id}  )).then(res => {return res.json()}).catch(console.log);

}




export {loadMyNotificationsFromDB}
export {setNotificationsToDB}
export {deleteNotificationDB}

