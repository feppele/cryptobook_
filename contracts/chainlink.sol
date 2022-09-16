// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

import "@openzeppelin/contracts/utils/Strings.sol";

interface IMCBNFT{
    function transferFrom(address from, address to, uint256 tokenId) external;
    function mintToken(address owner, string memory metadataURI, uint256 id) external returns (uint256);
}

contract APIConsumer is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    uint256 public volume;    
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    string public API_URL ="https://backendserverreact.azurewebsites.net/price?tokenid=";

    address public MCBNFTAddress = 0x169D1B930c425b971Ef51bdBd84bfFde77Aa87fD;
    address _owner =0x2Bc17547AaF80Ad457633Bd55B8827269a72EEcf;

    struct Sachen { 
        address from;
        uint256 tokenId;
        address creator;
    }

    // reqId => sachen. 
    mapping (bytes32 => Sachen) public map ;


    // call this function. connects reqId with all all neded inputs for buyTokenOn
    function buy(address from, uint256 tokenId,address creator) public payable{

        bytes32 reqId= requestVolumeData(Strings.toString(tokenId));

        map[reqId] = Sachen(from,tokenId,creator);

    }
    // after this function oracle will call fullfill

    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
       //buyTokenOn(map[_requestId].from,map[_requestId].tokenId,map[_requestId].creator,_preis);

       volume=_volume;
    }


    // onchain
    function buyTokenOn(address from, uint256 tokenId,address creator,uint256 preis) public payable{

        require(msg.value == preis);

        (bool success, ) = from.call{value: (msg.value /100)*98 }("");
        require(success, "Transfer failed.");
        (success, ) = creator.call{value: (msg.value /100)*1 }("");
        require(success, "Transfer failed.");

        IMCBNFT(MCBNFTAddress).transferFrom(from,msg.sender,tokenId);

    }



    constructor() {
        setPublicChainlinkToken();
        oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;

        jobId = "d5270d1c311941d0b08bead21fea7747";
        fee = 0.1 * 10 ** 18; // (Varies by network and job)
    }


    function changeAPI_URL(string memory url) public {
        require(msg.sender == _owner);
        API_URL = url;   
    }
    

    function requestVolumeData(string memory tokenid) public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("get", string(abi.encodePacked(API_URL,tokenid))      ) ;
        request.add("path", "preis");
        
        // Multiply the result by 1000000000000000000 to remove decimals
        int timesAmount = 10 ** 18;
        request.addInt("times", timesAmount);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee); // returns requestId
    }
    


    // send token to buyer
    function buyToken(address from, uint256 tokenId) public payable{

        (bool success, ) = from.call{value: msg.value}("");
        require(success, "Transfer failed.");

        IMCBNFT(MCBNFTAddress).transferFrom(from,msg.sender,tokenId);

    }

}
