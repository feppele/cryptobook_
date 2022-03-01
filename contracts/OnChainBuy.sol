// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



interface IMCBNFT{
    function transferFrom(address from, address to, uint256 tokenId) external;
}


contract BuyNFTOnChain {

    address public MCBNFTAddress = 0x169D1B930c425b971Ef51bdBd84bfFde77Aa87fD;

    // send token to buyer
    function buyToken(address from, uint256 tokenId) public payable{

        (bool success, ) = from.call{value: msg.value}("");
        require(success, "Transfer failed.");

        IMCBNFT(MCBNFTAddress).transferFrom(from,msg.sender,tokenId);

    }

    



}