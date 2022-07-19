import classes from './Marketplace.module.css';
import {useState,useEffect,useContext} from 'react'

import NFTUbersicht from './Marketplace/NFTUbersicht'

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'




function Marketplace(){


        // Night Mode
        const nightMode = useContext(NightContext)
        const [theme,setTheme] =useState(themes.bright)
        useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

        
        return(

            <NFTUbersicht header = "Marketplace"/>
    );

}

export default Marketplace;