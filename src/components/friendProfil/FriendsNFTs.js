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
        useEffect(()=>{
            if(nightMode){
                setTheme(themes.dark)
            }else{
                setTheme(themes.bright)
            }
        },[nightMode])

    return (

        <div style={{backgroundColor:theme.color1}} className={classes.container}>

                <div className={classes.header}>

                    <div style={{color: theme.font}} className={classes.headerText}> {props.personData.friend_name +"'s NFTs"}</div>

                    <div className={classes.buttonWrapper}>

                    </div>

                </div>

                <div className={classes.stripe}></div>

                { <NftCollection from={props.personData.friend_addr}/>}

        </div>

    );

}

export default FriendsNFTs;