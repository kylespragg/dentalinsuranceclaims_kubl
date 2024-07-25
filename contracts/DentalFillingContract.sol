// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract DentalFillingContract {
    address public owner;

    enum FillingType { SilverAmalgam, ToothColoredComposite, CastGoldPorcelain }

    struct Filling {
        FillingType fillingType;
        uint256 minPrice;
        uint256 maxPrice;
    }

    mapping(FillingType => Filling) public fillings;

    event FillingChecked(address indexed user, FillingType fillingType, uint256 price, bool isValid);

    constructor() {
        owner = msg.sender;
        fillings[FillingType.SilverAmalgam] = Filling(FillingType.SilverAmalgam, 50, 150);
        fillings[FillingType.ToothColoredComposite] = Filling(FillingType.ToothColoredComposite, 90, 250);
        fillings[FillingType.CastGoldPorcelain] = Filling(FillingType.CastGoldPorcelain, 250, 4500);
    }

    function checkFillingPrice(FillingType _fillingType, uint256 _price) public returns (bool) {
        Filling memory filling = fillings[_fillingType];
        bool isValid = (_price >= filling.minPrice && _price <= filling.maxPrice);
        emit FillingChecked(msg.sender, _fillingType, _price, isValid);
        return isValid;
    }

    function updateFillingPriceRange(FillingType _fillingType, uint256 _minPrice, uint256 _maxPrice) public {
        fillings[_fillingType] = Filling(_fillingType, _minPrice, _maxPrice);
    }
}
