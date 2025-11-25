// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";


contract ContestPrize is Ownable {
    constructor() Ownable(msg.sender) {}

    struct comp {
        uint256 Total_amount;
        uint256 Price;
        bool status;
        bool exist;
    }
    // for save each contest wtih ID
    mapping(uint => comp) Components;

    event ContestCreated(uint256 ID, uint256 Price);


    // This function is used to define a contest and takes the ID and cost of participating in the contest.
    function Addcomp(
        uint256 _ID,
        uint256 _Price , uint256 _totalprize
    ) external {
        if (_Price == 0 ){
            Components[_ID] = comp(_totalprize, 0, true, true);
        }
        else {
            Components[_ID] = comp(0, _Price, true, true);
        }
        emit ContestCreated(_ID, _Price);
    }
}