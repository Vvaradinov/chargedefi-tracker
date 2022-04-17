import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { BscConnector } from '@binance-chain/bsc-connector';
import { ConnectorNames } from '@pancakeswap-libs/uikit';
import Web3 from 'web3';
import {defaultChain} from "../../config";
import {Web3Provider} from "@ethersproject/providers";

const POLLING_INTERVAL = 12000;
const rpcUrl = defaultChain.defaultProvider;
const chainId = defaultChain.chainId;

const injected = new InjectedConnector({ supportedChainIds: [chainId] });

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});

const bscConnector = new BscConnector({ supportedChainIds: [chainId] });

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector,
};

export const getLibrary = (provider:any): Web3 => {
  return provider;
};

export const getLibrarySwap = (provider:any): Web3Provider => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 15000
  return library
}
