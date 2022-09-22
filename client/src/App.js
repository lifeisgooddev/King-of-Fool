import logo from './logo.svg';
import {
  useWeb3React,
} from "@web3-react/core";
import { ethers } from "ethers"
import { NotificationManager } from 'react-notifications';

import { activeteWallet } from './utils/wallet';
import { useContract } from "./hooks/contractCore"
import FKingABI from "./utils/abis/fking.json"
import USDCABI from "./utils/abis/usdc.json"
import {ADDRESSES} from "./utils/constants"

import './App.css';
import { useState } from 'react';

function App() {
  const {
    activate,
    account,
    chainId
  } = useWeb3React();

  const fkingCtr = useContract({
    abi: FKingABI,
    address: ADDRESSES.FKing
  })

  const usdcCtr = useContract({
    abi: USDCABI,
    address: ADDRESSES.USDC
  })

  const [amount, setAmount] = useState(0)
  const [busy, setBusy] = useState(false)

  const onAmountChange = (e) => {
    try {
      setAmount(parseFloat(e.target.value))
    } catch (error) {
      setAmount(0)
    }
  }

  const onDeposit = async () => {
    if (!account) {
      activeteWallet(activate);
      
    } 
    setBusy(true)
    try {
      let depositAmt = ethers.utils.parseUnits(amount.toString(), 18)
      let tx = await usdcCtr.approve(ADDRESSES.FKing[chainId], depositAmt)
      NotificationManager.success('Approval Transaction Pending', tx.hash);
      await tx.wait()
      NotificationManager.success('Token Approved for Deposit', tx.hash);

      tx = await fkingCtr.deposit(depositAmt);
      NotificationManager.success('Deposition Transaction Pending', tx.hash);
      await tx.wait();
      NotificationManager.success('Deposited', tx.hash);
    } catch (error) {
      console.log(error)
      NotificationManager.success('Error', error.message);
    }
    setBusy(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="number" value={amount} onChange={onAmountChange} className='form__field'/>
        <button onClick={onDeposit} disabled={busy} className='startedBtn'><span>Deposit</span></button>
      </header>
    </div>
  );
}

export default App;
