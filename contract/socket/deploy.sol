// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "../main/LocalGovernancePlatform.sol";
import "./socket-protocol/contracts/base/AppDeployerBase.sol";

contract MyTokenDeployer is AppDeployerBase {
    bytes32 public myToken = _createContractId("myToken");

    constructor(
        address addressResolver_,
        FeesData memory feesData_,
        string memory name_,
        string memory symbol_,
        uint8 decimals_
    ) AppDeployerBase(addressResolver_) {
        creationCodeWithArgs[myToken] = abi.encodePacked(
            type(MyToken).creationCode,
            abi.encode(name_, symbol_, decimals_)
        );
        _setFeesData(feesData_);
    }

    function deployContracts(uint32 chainSlug) external async {
        _deploy(myToken, chainSlug);
    }
    }