import { InjectedConnector } from '@web3-react/injected-connector'

import Web3 from 'web3'
import { ethers } from 'ethers'

const POLLING_INTERVAL = 12000
// const rpcUrl = getNodeUrl()
// const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)

const chainIds = [4]

const injected = new InjectedConnector({ supportedChainIds: chainIds })


// TODO move this enum to the uikit
const ConnectorNames  = {
  Injected : 'injected',
}

export const connectorsByName = {
  [ConnectorNames.Injected]: injected
}

export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}
