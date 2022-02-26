// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface IMCBNFT{
    function mintToken(address owner, string memory metadataURI, uint256 id) external returns (uint256);
}


contract BuyNFT {

    address public MCBNFTAddress = 0xAacdF7a348d5317A74D8B3C902E235D7aDb988e4;

    function buyToken( string memory metadataURI, uint256 id,address payable seller,uint256 preis) public payable returns (uint256){

        (bool success, ) = seller.call{value: preis}("");
        require(success, "Transfer failed.");

        IMCBNFT(MCBNFTAddress).mintToken(msg.sender,metadataURI,id);

        return id;
    }

    



}