import { nodes } from './getRpcUrl'
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";

import { connectorsByName } from "./web3React";
/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
 export const setupNetwork = async () => {
   console.log('nodes: ', nodes)
    const provider = window.ethereum
    if (provider) {
    const chainId = 4
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: 'Rinkeby Test Net',
              nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: nodes,
              blockExplorerUrls: [`https://bscscan.com/`],
            },
          ],
        })
        return true
      } catch (error) {
        console.error('Failed to setup the network in Metamask:', error)
        return false
      }
    } else {
      console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
      return false
    }
  }

export const activeteWallet = (activate) => {
  activate(connectorsByName['injected'], async (error) => {
    if (error instanceof UnsupportedChainIdError) {
      const hasSetup = await setupNetwork()
      if (hasSetup) {
        activate(connectorsByName['injected'])
      }
    }
  });
}