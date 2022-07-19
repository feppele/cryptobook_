import classes from './FriendsNFTs.module.css';
import {useEffect,useContext,useState} from 'react';
import NftCollection from '../NFT/NftCollection';


//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

function FriendsNFTs(props){

        // Night Mode
        const nightMode = useContext(NightContext)
        const [theme,setTheme] =useState(themes.bright)
        useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

    return (

        <div style={{backgroundColor:theme.color1}} className={classes.container}>


            { <NftCollection header={props.personData.friend_name + "'s NFTs"} from={props.personData.friend_addr}/>}

        </div>

    );

}

export default FriendsNFTs;