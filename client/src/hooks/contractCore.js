import { Contract } from '@ethersproject/contracts';
import {ethers} from 'ethers';

import { useWeb3React } from '@web3-react/core';
import React, { useState, useEffect } from "react";

export function useContract(contractJson) { 
  const { chainId, library, account}= useWeb3React()

  if (!chainId) {
    return null;
  } else {
    if (!contractJson.address || !contractJson.address[chainId]) {
      return null
    }
    const signer = library.getSigner(account).connectUnchecked()
    return new Contract(contractJson.address[chainId], contractJson.abi, signer)
  }
}