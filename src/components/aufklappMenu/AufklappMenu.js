import classes from './AufklappMenu.module.css';
import {useState,useEffect,useContext} from 'react';
import { useClickOutside } from '@mantine/hooks';

import LoginIntegration from './LoginIntegration'

// use like thise
// <Button onClick={e => {setMenuOpened(e)}}> click </Button>
// {menuOpened && <LittleMenu open={menuOpened}/> }

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

function AufklappMenu(props){

    // Night Mode
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    

    const [open,setOpen] = useState()
    const ref = useClickOutside(() => {
       props.onClose()
        setOpen(false)
    });

    useEffect(() => {
        setOpen(props.open)
    },[props])

    return (

        <div ref={ref} style={open? {top:'64px',backgroundColor:theme.startPage} : {top:'-200px',backgroundColor:theme.startPage} } className={classes.container}>

            <div style= {{color: theme.font}} className={classes.header}>Connect Wallet</div>

            <LoginIntegration nextPage={"/home"}/>

            <div className={classes.blurr}>

            </div>

        </div>
    );



}

export default AufklappMenu;