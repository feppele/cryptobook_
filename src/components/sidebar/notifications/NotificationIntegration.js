import * as React from 'react';

import {useEffect,useRef,useState,useContext} from 'react'
import classes from './NotificationIntegration.module.css'
import {loadMyNotificationsFromDB,deleteNotificationDB} from '../../../node/NotificationManagement'

import NotificationElement from './NotificationElement'

//ColorTheme - Night Mode
import {themes} from '../../../ColorTheme'
import {NightContext} from '../../../NightModeProvider'

//get deleteNotification(id) from NotificationElement
export default function NotificationIntegration(props) {

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

          const [notifications,setNotifications] = useState([])

          async function loadNotifications(){

            //[ {notification,von,zu,nft,id} ]
            const notifications = await loadMyNotificationsFromDB()
            // reverse that new notis are on top
            setNotifications(notifications.reverse())
            return
          }

          useEffect(()=>{
            loadNotifications()
          },[])

          function deleteNotification(id){
            setTimeout(()=>{
              //delete React
              console.log(notifications)
              var notis =[...notifications];
              setNotifications(notis.filter(ele => {return ele.id !==id}))

              console.log(notifications)
            },400)
            //delete Database
            deleteNotificationDB(id)

          }


  return (

    <div className={classes.container}>

      <div style={{borderBottom:theme.border}} className={classes.header}>

        <div style={{color: theme.font,fontSize:'22px'}} >Notifications</div>

      </div>

      <div className={classes.list}>

        {notifications.map((ele)=>{return <NotificationElement deleteNotification={deleteNotification} close={props.close} notification={ele}/>})}

      </div>

    </div>

  );
}
