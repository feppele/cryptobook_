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

//myCode
import { useHistory } from "react-router-dom";
import Wallet from '../wallet/Wallet'

const cryptoChat = <Badge badgeContent={4} color="error"> <MailIcon /> </Badge>

const pages = ['Friends', 'Wallet', 'My-NFT','NFT-Marketplace','Crypto-Chat'];
const settings = ['Profile', 'Logout'];



const ResponsiveAppBar = () => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [page,setPage] = React.useState("ne")
  const [walletOpen,setWalletOpen] =React.useState(false)

  function closeWallet(){
    setWalletOpen(false)
  }

  function openWallet(){
    setWalletOpen(true)
  }


  const history = useHistory();
  function openPage(page){
    if(!window.ethereum){ history.push("/")}else{
      closeWallet()
      if(page==="Friends"){
        history.push("/friends")
      }else if(page==="Wallet"){
        openWallet()
      }else if(page==="My-NFT"){
        history.push("/mynft");
      }else if(page==="NFT-Marketplace"){
        history.push("/marketplace");
      }else if(page==="Crypto-Chat"){
        history.push("/chats");
      }else if(page==="Profile"){
        history.push("/me");
      }else if(page==="Logout"){
        history.push("/");
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
    openPage(event.currentTarget.id)
  };

  return (

  
  <div style={{width: '100%', position:'sticky',top:'0px',zIndex:'3000'}}> 

    

    {walletOpen && <Wallet closeWalletFunc={closeWallet}/>}
    

    <AppBar  sx={{backgroundColor:'rgb(6, 29, 42);',position:'relative',zIndex:'3002'}}>



      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/** Breites Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                id={page}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/** Eingeklapptes Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          








          <Box sx={{ flexGrow: 0 }}>



          <IconButton sx={{marginRight:'10px'}} size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>



            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem id={setting} key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  </div>
  );
};
export default ResponsiveAppBar;
