
import {_web3} from '../web3/Web3'
var web3 = _web3.mcbWallet
const userdata = JSON.parse(sessionStorage.getItem("userdata"))
if(userdata !== null){
    userdata.metamask === true ? web3 = _web3.metamask : web3 = _web3.mcbWallet
}



function getCurrentUser2(){

    return window.web3.currentProvider.selectedAddress;
}


async function getCurrentUser(){
    const address = JSON.parse(sessionStorage.getItem("userdata")).address
    return address
}




function isValidAddress(address){
    return web3.utils.isAddress(address);
}


export{getCurrentUser}
export{isValidAddress}