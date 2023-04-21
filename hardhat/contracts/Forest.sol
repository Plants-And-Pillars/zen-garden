// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Forest is ERC721, ERC721URIStorage {
    constructor() ERC721("Forest", "FOR") {}

    /*
        - This function is checking if the caller already owns an NFT (non-fungible token) by calling the `balanceOf()` function to get the number of tokens owned by the caller.
        - If the balance is not equal to 0, it will revert with an error message.
    */
    function checkIfUserHasNFT() public view returns (uint256[] memory) {
        require(
            balanceOf(msg.sender) == 0,
            "ERC721: caller does not have a token"
        );

        uint256[] memory tokenId;
        tokenId = tokenOfOwnerByIndex(msg.sender, 0);

        return tokenId;
    }

    /*
        - This function takes a `tokenId` as input and returns the URI associated with the token.
        - It calls the `tokenURI` function from the `ERC721URIStorage` contract, which returns the URI associated with the given `tokenId`.
        - This function is useful for retrieving the metadata associated with a specific NFT.
    */
    function getTokenURI(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return tokenURI(tokenId);
    }

    /*
        - This function is used to mint a new NFT (non-fungible token) and assign it to the caller's address.
        - It takes two parameters: `tokenId` and `uri`. The `tokenId` is a unique identifier for the new NFT, and the `uri` is a string that represents the metadata associated with the NFT.
    */
    function safeMint(uint256 tokenId, string memory uri) public {
        require(
            balanceOf(msg.sender) < 1,
            "ERC721: caller already has a token"
        );

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    /*
        - A public function that allows the owner or an approved address to modify the URI associated with a specific token.
        - It takes the token ID and the new URI as inputs and uses the internal '_setTokenURI' function to update the token URI.
        - If the caller is not the owner nor approved, it reverts with an error message.
    */
    function modifyTokenURI(uint256 tokenId, string memory uri) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: caller is not owner nor approved"
        );
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
