import Web3 from 'web3';
import { HttpProviderOptions } from 'web3-core-helpers';
import {defaultChain} from "../../config"

const RPC_URL = defaultChain.defaultProvider;
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {timeout: 10000,} as HttpProviderOptions);
const web3NoAccount = new Web3(httpProvider);


const getWeb3NoAccount = () => {
  return web3NoAccount;
};

export { getWeb3NoAccount };
export default web3NoAccount;


