// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.19;

import "./Clip.sol";

// CBiomaHClipper - Specialized Clipper for BiomeH Conservation Credit Token
contract CBiomaHClipper is Clipper {
    constructor(address vat_, address spotter_, address dog_)
        Clipper(vat_, spotter_, dog_, bytes32("CBiomaH")) {}
}
