// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



interface IMCBNFT{
    function transferFrom(address from, address to, uint256 tokenId) external;
    function mintToken(address owner, string memory metadataURI, uint256 id) external returns (uint256);
}


contract BuyNFT {

    address public MCBNFTAddress = 0xd02EAb066d439D935055DaC5ACB515b8c7bB4Bd7;

    // onchain
    function buyTokenOn(address from, uint256 tokenId) public payable{

        (bool success, ) = from.call{value: msg.value}("");
        require(success, "Transfer failed.");

        IMCBNFT(MCBNFTAddress).transferFrom(from,msg.sender,tokenId);

    }

    //offchain
    function buyTokenOff( string memory metadataURI, uint256 id,address payable seller) public payable returns (uint256){

        (bool success, ) = seller.call{value: msg.value}("");
        require(success, "Transfer failed.");

        IMCBNFT(MCBNFTAddress).mintToken(msg.sender,metadataURI,id);

        return id;
    }


}