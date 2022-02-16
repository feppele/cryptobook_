// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyCryptoBookNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

        using Strings for uint256;
        
        // tokenId => tokenURI
        mapping (uint256 => string) private _tokenURIs;

        mapping(address => uint256[] )private _ownersTokenIds;

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

        _ownersTokenIds[from].remove(tokenId);

        _ownersTokenIds[to].push(tokenId);

        _transfer(from, to, tokenId);
    }

        function ownersTokenIds(address owner) public view returns (uint256 [] memory) {

            return _ownersTokenIds[owner];
        }

    constructor(string memory tokenName, string memory symbol) ERC721(tokenName, symbol) {
    }

    function mintToken(address owner, string memory metadataURI)
    public
    returns (uint256)
    {
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _safeMint(owner, id);
        _setTokenURI(id, metadataURI);

        _ownersTokenIds[owner].push(id);

        return id;
    }
}