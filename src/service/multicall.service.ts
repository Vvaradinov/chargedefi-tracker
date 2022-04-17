import Web3 from "web3";
import {ContractCallContext} from "ethereum-bsc-multicall";
import * as config from "../config"
import {Multicall} from "ethereum-multicall";


export const doMulticall = async (web3: Web3, contractCallContext: ContractCallContext[]) => {
    const multicall = new Multicall({ web3Instance: web3, multicallCustomContractAddress:  config.defaultChain.multicall});
    return await  multicall.call(contractCallContext)
}
