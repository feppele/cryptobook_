// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyCryptoBookNFT is ERC721 {

    using Strings for uint256;

    address private _OnChainSellContract;
    address _owner;
        
    // tokenId => tokenURI
    mapping (uint256 => string) private _tokenURIs;

    // all TokenIds of certain owner
    mapping(address => uint256[] )private _ownersTokenIds;

    // change sell Contract
    function setOnChainSellContract(address addr) public {
        require(msg.sender == _owner);
        _OnChainSellContract=addr;
    }

    // if msg.sender == OnChainSellContract: OnChainSellContract is allowed to send
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual override returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ERC721.ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender) || msg.sender == _OnChainSellContract);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
        
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];

        return _tokenURI;
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
   
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        //_ownersTokenIds[from].remove(tokenId);
        for(uint256 i=0; i< _ownersTokenIds[from].length; i++){
            if(_ownersTokenIds[from][i] == tokenId ){

                _ownersTokenIds[from][i] = _ownersTokenIds[from][_ownersTokenIds[from].length - 1];
                _ownersTokenIds[from].pop();
                break;
            }
        }

        _ownersTokenIds[to].push(tokenId);
        _transfer(from, to, tokenId);
    }

    function ownersTokenIds(address owner) public view returns (uint256 [] memory) {

        return _ownersTokenIds[owner];
    }

    constructor(string memory tokenName, string memory symbol) ERC721(tokenName, symbol) {
        _owner=msg.sender;
    }

    function mintToken(address owner, string memory metadataURI, uint256 id) external returns (uint256)
    {
        _safeMint(owner, id);
        _setTokenURI(id, metadataURI);

        _ownersTokenIds[owner].push(id);

        return id;
    }
}