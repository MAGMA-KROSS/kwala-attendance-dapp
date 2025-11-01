// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// We import the standard OpenZeppelin contracts for a secure ERC721
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title AttendanceNFT
 * @dev A simple Proof-of-Presence (PoP) NFT.
 * Minting is restricted to a specific 'minter' address (your Kwala workflow).
 */
contract AttendanceNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // This address will be your Kwala workflow's wallet address
    address public minterAddress;

    // Modifier to ensure only the authorized minter can call a function
    modifier onlyMinter() {
        require(msg.sender == minterAddress, "Error: Caller is not the authorized minter");
        _;
    }

    /**
     * @dev Sets the token name ("PoP Attendance") and symbol ("POP").
     * The deployer is set as the initial Owner.
     */
    constructor(address initialOwner) ERC721("PoP Attendance", "POP") Ownable(initialOwner) {
        // The deployer can initially be set as the minter,
        // but it's better to set it to the Kwala address later.
    }

    /**
     * @dev The core minting function.
     * Only the 'minterAddress' (Kwala) can call this.
     * It mints a new NFT to the 'to' address with a specific token URI.
     */
    function safeMint(address to, string memory tokenURI) public onlyMinter {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    /**
     * @dev Allows the contract Owner (you) to set or update the
     * address authorized to mint NFTs (your Kwala workflow).
     */
    function setMinter(address _minterAddress) public onlyOwner {
        minterAddress = _minterAddress;
    }
}