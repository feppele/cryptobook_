
const Web3 =require('web3');
const web3_infura = new Web3('https://ropsten.infura.io/v3/13185221b99744cda86c46e02a3ded8f');
var web3 = new Web3(window.ethereum);

var ropstenAlchemy='wss://eth-ropsten.alchemyapi.io/v2/YdR1ysbKAahCXjlkJTCwbikRTC9Ap9wp'
var web3Alchemy = new Web3(new Web3.providers.WebsocketProvider(ropstenAlchemy));

const _web3 = {metamask:web3,mcbWallet:web3_infura}
export {_web3};

// export window.ethereum & alchemi api.
