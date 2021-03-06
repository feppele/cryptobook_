import * as React from 'react';

import {useEffect,useRef,useState,useContext} from 'react'
import classes from './Sidebar.module.css'


//material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { height } from '@mui/material/node_modules/@mui/system';

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

import { useClickOutside } from '@mantine/hooks';


const ethPrice = require('eth-price');

//props.walletOpen:Boolean
//props.closeWalletFunc:Function
export default function Sidebar(props) {

        // Night Mode
        const nightMode = useContext(NightContext)
        const [theme,setTheme] =useState(themes.bright)
        useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])


    const wallet = useRef()
    const backdrop = useRef()

    const closeRef = useClickOutside(() => closeWallet());


    function closeWallet(){

        wallet.current.style.right= '-500px';
        backdrop.current.style.opacity= '0'

        setTimeout(()=>{props.closeWalletFunc()},500)
    }



  return (

    <div ref={closeRef} className={classes.container}>

        <div ref={backdrop} onClick={closeWallet} className={classes.backdrop}>

        </div>

        {/*wallet*/}
        <div style={{backgroundColor:theme.color1}} ref={wallet} className={classes.wallet}>

            {props.integration}

        </div> {/*wallet*/}

    </div>

  );
}
