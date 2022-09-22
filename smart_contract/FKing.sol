// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
contract Fking {
    using SafeERC20 for IERC20;

    address public USDC = 0xd5cDc62D46f4fd9A9975ed223EA3eb53eF84df31;  // rinkeby USDC token addr

    uint256 preAmount = 0;
    address preDepositer;

    constructor() {
        preDepositer = msg.sender;
    }

    function deposit(uint256 _amount) external {
        require(_amount >= (preAmount * 3 /2), "too_little");
        IERC20(USDC).safeTransferFrom(msg.sender, preDepositer, _amount);

        preAmount = _amount;
        preDepositer = msg.sender;
    }
}