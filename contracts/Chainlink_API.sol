// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

interface IMCBNFT{
    function transferFrom(address from, address to, uint256 tokenId) external;
}

contract APIConsumer is ChainlinkClient {
    using Chainlink for Chainlink.Request;
  
    uint256 public volume;
    
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    address public MCBNFTAddress = 0x169D1B930c425b971Ef51bdBd84bfFde77Aa87fD;


    address private _owner;
    string public API_URL ="http://62b4-2003-e8-4705-a644-b034-eb87-885f-463b.ngrok.io/price?tokenid=";
    /**
     * Network: Kovan
     * Oracle: 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8 (Chainlink Devrel   
     * Node)
     * Job ID: d5270d1c311941d0b08bead21fea7747
     * Fee: 0.1 LINK
     */
    constructor() {
        setPublicChainlinkToken();
        oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;
        jobId = "d5270d1c311941d0b08bead21fea7747";
        fee = 0.1 * 10 ** 18; // (Varies by network and job)

        _owner= msg.sender;
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
        int timesAmount = 10**18;
        request.addInt("times", timesAmount);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    

    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
        volume = _volume;
    }

    // send token to buyer
    function buyToken(address from, uint256 tokenId) public payable{

        (bool success, ) = from.call{value: msg.value}("");
        require(success, "Transfer failed.");

        IMCBNFT(MCBNFTAddress).transferFrom(from,msg.sender,tokenId);

    }

}
