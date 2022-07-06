import classes from './MyNftPage.module.css';
import NftCollection from './NftCollection';
import React, { Component,useContext } from 'react';
import {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import explorePic from '../../images/adventurer.png';
import createPic from '../../images/paint.png'

//material UI 
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'

function MyNftPage(){

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

    const [myAddress,setMyAddress] = useState("")
    const [address,setAddress] =useState(false)

    const history = useHistory();

    function openCreatePage(){
        history.push("/createNFT");
    }
    function openExplore(){
        history.push("/marketplace");
    }


    useEffect(() => {

        window.ethereum.request({method: 'eth_accounts'}).then(acc =>{
            setMyAddress(acc[0].toString());
            setAddress(true)
        })


    },[])


    console.log(myAddress)
    return (

        <div style={{backgroundColor:theme.color1}} className={classes.container}>


                <div className={classes.header}>

                    <div style={{color:theme.font}} className={classes.headerText}>my NFTs</div>

                    <div className={classes.buttonWrapper}>

                    <ButtonGroup variant="outlined" >
                        <Tooltip title="explore" disableInteractive arrow placement="top">
                            <Button onClick={openExplore}>  < img src={explorePic} style={{height: '33px',width: 'auto',filter:theme.png}}></img>   </Button>
                        </Tooltip>
                        <Tooltip title="create" disableInteractive arrow placement="top">
                            <Button onClick={openCreatePage}>    < img src={createPic} style={{height: '27px',width: 'auto',filter:theme.png}}></img>   </Button>
                        </Tooltip>
                    </ButtonGroup>

                    </div>

                </div>

                <div className={classes.stripe}></div>


                { address && <NftCollection from={myAddress}/>}




        </div>






    );


}

export default MyNftPage;
