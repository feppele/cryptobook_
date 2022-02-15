





async function isMetaMaskConnected() {
    const {ethereum} = window;
    const accounts = await ethereum.request({method: 'eth_accounts'});
    return accounts && accounts.length > 0;
}




export {isMetaMaskConnected};