
import classes from './App.module.css';
import { Route, Switch } from 'react-router-dom';


// Start
import StartPage from './pages/StartPage';
import NavBar from './components/start/StartNavBar';

//Home
import Home from './pages/home/Home';
import NavBarHome from './components/home/NavBarHome';
import Profil from './pages/home/Profil';
import FriendsPage from './pages/home/FriendsPage';
import OneNFTPage from './pages/home/OneNFTPage';

import FriendProfil from './pages/home/FriendProfil';
import MyNftPage from './components/NFT/MyNftPage'
import CreateNFT from './components/NFT/createNFT/CreateNFT';
import FinishedNFT from './components/NFT/finishedNFTModal/FinishedNFT';


function App() {


  return(
    <div>

      <Switch>
        <Route path='/' exact>
          <NavBar />
          <StartPage />
        </Route>

        <Route path='/home'>
          <NavBarHome />
          <Home />
        </Route>
        <Route path='/profil'>
          <NavBarHome />
          <Profil />
        </Route>

        <Route path='/friends/'>
          <NavBarHome />
          <FriendsPage />
        </Route>

        <Route path='/friendProfile/:address'>
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

        





      </Switch>


    </div>
  );

}

export default App;

