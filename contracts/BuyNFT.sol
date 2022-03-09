// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



interface IMCBNFT{
    function transferFrom(address from, address to, uint256 tokenId) external;
    function mintToken(address owner, string memory metadataURI, uint256 id) external returns (uint256);
}


contract BuyNFT {

    address public MCBNFTAddress = 0xd02EAb066d439D935055DaC5ACB515b8c7bB4Bd7;

    address owner =0x2Bc17547AaF80Ad457633Bd55B8827269a72EEcf;

    // onchain
    function buyTokenOn(address from, uint256 tokenId,address creator) public payable{

        (bool success, ) = from.call{value: (msg.value /100)*98 }("");
        require(success, "Transfer failed.");
        (success, ) = creator.call{value: (msg.value /100)*1 }("");
        require(success, "Transfer failed.");

        IMCBNFT(MCBNFTAddress).transferFrom(from,msg.sender,tokenId);

    }

    //offchain
    function buyTokenOff( string memory metadataURI, uint256 id,address payable seller) public payable returns (uint256){

        (bool success, ) = seller.call{value: (msg.value /100)*98 }("");
        require(success, "Transfer failed.");

        IMCBNFT(MCBNFTAddress).mintToken(msg.sender,metadataURI,id);

        return id;
    }


    function withdraw() public{
        require(msg.sender == owner);
        
        (bool success, ) = owner.call{value: address(this).balance }("");
        require(success, "Transfer failed.");
    }

    function balance() public view returns(uint256){
        return address(this).balance;
    }


}