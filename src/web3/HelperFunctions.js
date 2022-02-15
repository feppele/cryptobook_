const Web3 =require('web3');
//const web3 = new Web3('https://ropsten.infura.io/v3/13185221b99744cda86c46e02a3ded8f');
const web3 = new Web3(window.ethereum);




function getCurrentUser(){

    return window.web3.currentProvider.selectedAddress;
}

function isValidAddress(address){
    return web3.utils.isAddress(address);
}


export{getCurrentUser}
export{isValidAddress}