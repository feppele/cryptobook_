import classes from './ChatPage.module.css';
import React, {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useHistory } from "react-router-dom";


import PopupFenser from '../../components/PopupFenster/PopupFenster'

function ChatPage(){



    return (

        <div>

            <PopupFenser text={"Hallo2"}/>

            Chats

        </div>

    );


}

export default ChatPage;