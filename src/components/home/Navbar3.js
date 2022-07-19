import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

// Sidebar
import Sidebar from '../sidebar/Sidebar';
import NotificationIntegration from '../sidebar/notifications/NotificationIntegration';


//Image
import profilePic from '../../images/profil.png'
import logoutPic from '../../images/log-out.png'
import mondPic from '../../images/mond.png'
import walletPic from '../../images/wallet.png'


//myCode
import { useHistory } from "react-router-dom";
import Wallet from '../wallet/Wallet'
import {useState,useEffect,useContext} from 'react'
import logo from '../../images/logo.png'
import profilColor from '../../images/background.jpeg';
import notificationImg from '../../images/notification.png';
import {getProfilePicURL} from '../../node/images'
import {getCurrentUser} from '../../web3/HelperFunctions'

//Night Mode
import {ChangeNightFunction} from '../../NightModeProvider'

//ColorTheme - Night Mode
import {themes} from '../../ColorTheme'
import {NightContext} from '../../NightModeProvider'



const profile = <div id={"profile"} style={{display:'flex',flexDirection:'row',gap:'26px'}}> <img src={profilePic} style={{height: '20px',width: 'auto'}}></img> <div style={{fontSize:'13px'}}>Profile</div> </div>
const wallet = <div id={"profile"} style={{display:'flex',flexDirection:'row',gap:'26px'}}> <img src={walletPic} style={{height: '20px',width: 'auto'}}></img> <div style={{fontSize:'13px'}}>Wallet</div> </div>
const notification = <div style={{display:'flex',flexDirection:'row',gap:'23px'}}><img src={notificationImg} style={{height: '20px',width: 'auto',marginLeft:'1px',marginRight:'2px'}}></img>  <div style={{fontSize:'13px'}}>Notification</div> </div>
const logout = <div style={{display:'flex',flexDirection:'row',gap:'23px'}}> <img src={logoutPic} style={{height: '20px',width: 'auto',marginLeft:'3px'}}></img>  <div style={{fontSize:'13px'}}>Logout</div> </div>



const pages = ['Friends', 'My-NFT','Create-NFT','NFT-Marketplace','Crypto-Chat'];
const settings = [{a:profile,b:"profile"},{a:wallet,b:"wallet"},{a:notification,b:"notification"},{a:logout,b:"logout"} ];



const ResponsiveAppBar = () => {



  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [walletOpen,setWalletOpen] =React.useState(false)
  const [notificationOpen,setNotificationOpen] =React.useState(false)
  const [profilePic,setProfilePic] = useState(profilColor);

  const [nightMode,setNightMode] = useState(false)
  const setNightModeFunc = useContext(ChangeNightFunction)
  // Night Mode
  const [theme,setTheme] =useState(themes.bright)
  useEffect(()=>{ nightMode ? setTheme(themes.dark) : setTheme(themes.bright) },[nightMode])

  function handleNightChange(e){
    setNightMode(e.target.checked)
    setNightModeFunc(e.target.checked)
  }

  //load ProfilePic
  useEffect(() => {
    getCurrentUser().then(address=>{
      getProfilePicURL(address).then(url => {
        if(url.length >0){
          setProfilePic(url);
        }
      })
    })
  },[])

  function closeWallet(){
    setWalletOpen(false)
  }

  function openWallet(){
    setWalletOpen(true)
  }

  function closeNotification(){
    setNotificationOpen(false)
  }

  function openNotification(){
    setNotificationOpen(true)
  }


  const history = useHistory();
  function openPage(page){
    if(!window.ethereum){ history.push("/")}else{
      closeWallet()
      if(page==="Friends"){
        history.push("/friends")
      }else if(page==="wallet"){
        openWallet()
      }else if(page==="My-NFT"){
        history.push("/mynft");
      }else if(page==="NFT-Marketplace"){
        history.push("/marketplace");
      }else if(page==="Crypto-Chat"){
        history.push("/chats");
      }else if(page==="profile"){
        history.push("/me");
      }else if(page==="notification"){
        openNotification()
      }else if(page==="logout"){
        history.push("/");
      }else if(page==="Create-NFT"){
        history.push("/createNFT");
      }
    }
  }



  const handleOpenNavMenu = (event) => {
    openPage(event.currentTarget.id)
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {

    openPage(event.currentTarget.id)
    setAnchorElNav(null);

  };


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    openPage(event.currentTarget.id)
  };


  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    console.log(event.currentTarget.id)
    openPage(event.currentTarget.id)
  };

  return (

  <div style={{width: '100%', position:'sticky',top:'0px',zIndex:'3000'}}> 

    {notificationOpen && <Sidebar integration={<NotificationIntegration notifications={[1,2,3]} close={closeNotification}/>} closeWalletFunc={closeNotification}/>}

    {walletOpen && <Wallet closeWalletFunc={closeWallet}/>}

    <AppBar  sx={{backgroundColor:theme.navbar,position:'relative',zIndex:'3002'}}>


      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex',alignItems:'center' },
              fontFamily: 'monospace',
              fontWeight: 300,
              color: theme.font,
              textDecoration: 'none',
              fontSize:'22px'
            }}
          >
            MyCryptoBook

          </Typography>

          {/** Breites Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                id={page}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: theme.font, display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/** Eingeklapptes Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' ,color:theme.font} }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none',zIndex:'3005' },
              }}
            >
              {pages.map((page) => (
                <MenuItem id={page} key={page} onClick={handleCloseNavMenu}> 
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>


          {/** Mittleres Logo */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            
            sx={{
              mr: 2,
              ml: 1,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={logo} style={{height:'25px',width:'auto'}}></img>
          </Typography>

          <Box sx={{ flexGrow: 0 }}>

            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={profilePic} sx={{border: '2px solid grey',height: '40px',width: '40px'}}/>
            </IconButton>


            <Menu
              sx={{ mt: '45px' ,zIndex:'3005'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              {settings.map((setting) => (
                <MenuItem id={setting.b} key={setting} onClick={handleCloseUserMenu} >
                  <Typography textAlign="center">{setting.a}</Typography>
                </MenuItem>
              ))}
              <div style={{display:'flex',flexDirection:'row',alignItems: 'center',gap:'5px'}}>
                  
                  <img src={mondPic} style={{height: '25px',width: 'auto',marginLeft: '17px',marginRight:'14px'}}></img>

                  <div style={{fontSize:'13px',marginRight: '0px'}}>Night Mode</div>
                  <Switch checked={nightMode} onChange={handleNightChange}/>


              </div>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  </div>
  );
};
export default ResponsiveAppBar;
