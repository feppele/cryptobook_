import React,{useState,createContext} from 'react';
const Web3 =require('web3');
const web3_infura = new Web3('https://ropsten.infura.io/v3/13185221b99744cda86c46e02a3ded8f');
var web3MetaMask = new Web3(window.ethereum);

var ropstenAlchemy='wss://eth-ropsten.alchemyapi.io/v2/YdR1ysbKAahCXjlkJTCwbikRTC9Ap9wp'
var web3Alchemy = new Web3(new Web3.providers.WebsocketProvider(ropstenAlchemy));



export const UserContext = createContext(false);
export const ChangeUserContext = createContext();

//{name:'',pw:'',publickey,privatekey,address}
export function Web3Provider(props){

    const [web3,setWeb3] = useState(web3MetaMask)

    function setWeb3Func(data){
        setWeb3(data)
        // store also in sessionStorage, because when pageReload all state is gone!!! 
        sessionStorage.setItem('userdata', JSON.stringify(data));
    }

    return <UserContext.Provider value={web3}>
                <ChangeUserContext.Provider value={setWeb3Func}>
                    {props.children}
                </ChangeUserContext.Provider>
            </UserContext.Provider>


}

