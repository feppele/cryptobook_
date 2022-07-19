
import classes from './App.module.css';
import { Route, Switch } from 'react-router-dom';


// Start
import StartPage from './pages/StartPage';
import NavBar from './components/start/StartNavBar';

//Home
import Home from './pages/home/Home';
//import NavBarHome from './components/home/NavBarHome';
import NavBarHome from './components/home/Navbar3';
import Profil from './pages/home/Profil';
import FriendsPage from './pages/home/FriendsPage';
import OneNFTPage from './pages/home/OneNFTPage';
import FriendProfil from './pages/home/FriendProfil';
import MyNftPage from './components/NFT/MyNftPage'
import CreateNFT from './components/NFT/createNFT/CreateNFT';
import FinishedNFT from './components/NFT/finishedNFTModal/FinishedNFT';
import CollectionPage from './pages/home/CollectionPage';
import Marketplace from './pages/home/Marketplace'
import NoMetaMaskPage from './pages/home/NoMetaMaskPage'
import ChatPage from './pages/home/ChatPage'
import LoginPage from './pages/home/LoginPage'

//Night Mode
import {NightModeProvider} from './NightModeProvider'

function App() {

  return(
    <div>
      <NightModeProvider>

      <Switch>
        <Route path='/' exact>
          <NavBar />
          <StartPage />
        </Route>

        <Route path='/home'>
          <NavBarHome />
          <Home />
        </Route>

        <Route path='/me'>
          <NavBarHome />
          <Profil />
        </Route>

        <Route path='/friends/'>
          <NavBarHome />
          <FriendsPage />
        </Route>

        <Route path='/profile/:address'>
          <NavBarHome />
          <FriendProfil/>
        </Route>

        <Route path='/MyNft'>
          <NavBarHome />
          <MyNftPage/>
        </Route>

        <Route path='/createNFT'>
          <NavBarHome />
          <CreateNFT />
        </Route>

        <Route path='/finishedNFT'>
          <NavBarHome />
          <FinishedNFT />
        </Route>

        <Route path='/thisNFT/:tokenId'>
          <NavBarHome />
          <OneNFTPage />
        </Route>


        <Route path='/collection/:collectionName'>
          <NavBarHome />
          <CollectionPage />
        </Route>

        <Route path='/marketplace/'>
          <NavBarHome />
          <Marketplace />
        </Route>

        <Route path='/noMetaMask'>
          <NavBarHome />
          <NoMetaMaskPage />
        </Route>

        <Route path='/chats'>
          <NavBarHome />
          <ChatPage />
        </Route>

        <Route path='/login'>
          <LoginPage />
        </Route>



      </Switch>

      </NightModeProvider>
    </div>
  );

}

export default App;

