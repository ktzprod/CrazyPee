// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./admin.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CrazyPee is ERC721URIStorage, Admin {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("CrazyPee", "CYP") {}

    function mintNFT(address _recipient, string memory _uri) external isAdmin() returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_recipient, newItemId);
        _setTokenURI(newItemId, _uri);

        return newItemId;
    }
}
