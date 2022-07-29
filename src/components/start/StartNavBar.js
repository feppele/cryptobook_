import {useState,useContext,useEffect} from 'react';
//css
import classes from './StartNavBar.module.css';
import LogoMiniCut from '../homePages/LogoMiniCut'

//popup
import PopupFenster from '../PopupFenster/PopupFenster'
import LoginIntegration from '../PopupFenster/LoginIntegration'

//mui
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

//Night Mode
import {NightContext} from '../../NightModeProvider'
import {ChangeNightFunction} from '../../NightModeProvider'
//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'

import AufklappMenu from '../aufklappMenu/AufklappMenu'

function NavBar(){

    const [ loginPageIsOpen, setLoginIsOpen ] = useState(false);
    const [ aufklappMenu, setAufklappMenu ] = useState(false);


    function reload(){
        window.location.reload(true);
    }
    function openLogin(){
        setLoginIsOpen(false);
        setAufklappMenu(true)
    }
    function closeLogin(){
        setLoginIsOpen(false);
    }
    function loginButtonClicked(){
        openLogin();
    }
    const setNightModeFunc = useContext(ChangeNightFunction)
    const nightMode = useContext(NightContext)
    const [theme,setTheme] =useState(themes.bright)
    useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])


    function toggleTheme(){

        setNightModeFunc(nightMode => !nightMode)
    }

    return (

        <div className={classes.container1}>
            <AufklappMenu open={aufklappMenu} onClose={()=>{setAufklappMenu(false)}}/>

            <div style={{backgroundColor:theme.startPage}} className={classes.container}>

            


           { false && <div style={{position: 'absolute',width: '100%',height: '20px',backgroundColor:"yellow",top:'0px',fontSize:'15px',textAlign:'center'}}>
                This Website is still in Alpha Phase and uses the Ropsten Testnet.
            </div>}


           { loginPageIsOpen && <PopupFenster integration={<LoginIntegration nextPage={"/home"}/>} onCloseClicked={closeLogin} text={"Connect Wallet"}/>   }

            <div className={classes.logowrapper}>
                { false &&<LogoMiniCut /> }
                <button style={{color:theme.font}} className={classes.logo} onClick={reload}>  MyCryptoBook </button>
            </div>


            <div className={classes.menuWrapper}>

                <button style={{color:theme.font}} id="loginButton" className={classes.loginButton} onClick={loginButtonClicked}> login </button>

                <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                    {nightMode ? <Brightness7Icon sx={{color:"white"}}/> : <Brightness4Icon />}
                </IconButton>

            </div>

        </div>
        </div>

    );

}

export default NavBar;