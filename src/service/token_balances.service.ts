import {ContractCallContext} from "ethereum-multicall";
import {doMulticall} from "./multicall.service";
import Web3 from "web3";
import {defaultChain} from "../config";


const _generateContext = (address: string): ContractCallContext[] => {
    const contracts = defaultChain.deployments
    return  [
        {
            reference: 'staticBalance',
            contractAddress: contracts.Static.address,
            abi: contracts.Static.abi,
            calls: [{reference: 'staticBalance', methodName: "balanceOf", methodParameters: [address] }]
        },
        // {
        //     reference: 'staticBUSDBalance',
        //     contractAddress: "0x1Bcd2aeCa58C3899083cdd63F38c31d8336Cc36f",
        //     abi: config.deployments.MockToken.abi,
        //     calls: [{reference: 'staticBUSDBalance', methodName: "balanceOf", methodParameters: [address] }]
        // },
        // {
        //     reference: 'chargeBUSDBalance',
        //     contractAddress: "0xAC1c6A03eB62D375Ff895abD062AC91cA74704Ea",
        //     abi: config.deployments.MockToken.abi,
        //     calls: [{reference: 'chargeBUSDBalance', methodName: "balanceOf", methodParameters: [address] }]
        // },
        {
            reference: 'chargeBalance',
            contractAddress: contracts.Charge.address,
            abi: contracts.Charge.abi,
            calls: [{reference: 'chargeBalance', methodName: "balanceOf", methodParameters: [address] }]
        },
    ];
}


export const getTokenBalances = async (web3: Web3, address: string, staticPrice: any, chargePrice: any) => {
    const call = await doMulticall(web3, _generateContext(address))
    const staticAmount = call.results.staticBalance.callsReturnContext[0].returnValues[0].hex / 1e18
    const chargeAmount = call.results.chargeBalance.callsReturnContext[0].returnValues[0].hex / 1e18
    return {
        staticAmount, chargeAmount,
        staticValue: staticAmount * staticPrice,
        chargeValue: chargeAmount * chargePrice
    }
}
