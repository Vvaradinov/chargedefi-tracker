import {ContractCallContext} from "ethereum-multicall";
import * as config from "../../../../../config";
import Web3 from "web3";
import {doMulticall} from "../../../../../service/multicall.service";

const _generateContext = (address: string): ContractCallContext[] => {
    const contracts = config.defaultChain.deployments
    return  [
        {
            reference: 'earned',
            contractAddress: contracts.Boardroom.address,
            abi: contracts.Boardroom.abi,
            calls: [{reference: 'earned', methodName: "earned", methodParameters: [address] }]
        },
        {
            reference: 'balanceOf',
            contractAddress: contracts.Boardroom.address,
            abi: contracts.Boardroom.abi,
            calls: [{reference: 'balanceOf', methodName: "balanceOf", methodParameters: [address] }]
        },
        {
            reference: 'totalSupply',
            contractAddress: contracts.Boardroom.address,
            abi: contracts.Boardroom.abi,
            calls: [{reference: 'totalSupply', methodName: "totalSupply", methodParameters: [] }]
        },
        {
            reference: 'TVL',
            contractAddress: contracts.BoardroomStats.address,
            abi: contracts.BoardroomStats.abi,
            calls: [{reference: 'TVL', methodName: "TVL", methodParameters: [contracts.Boardroom.address] }]
        },
        {
            reference: 'APR',
            contractAddress: contracts.BoardroomStats.address,
            abi: contracts.BoardroomStats.abi,
            calls: [{reference: 'APR', methodName: "APR", methodParameters: [contracts.Boardroom.address] }]
        },
    ];
}

export const getBoardroomEarnings = async (web3: Web3, address: string, staticPrice: any, chargePrice: any) => {
    const call = await doMulticall(web3, _generateContext(address))
    const earned = call.results.earned.callsReturnContext[0].returnValues
    const balance = call.results.balanceOf.callsReturnContext[0].returnValues[0].hex / 1e18
    const tvl = call.results.TVL.callsReturnContext[0].returnValues[0].hex / 1e18
    const daily = call.results.APR.callsReturnContext[0].returnValues[0].hex / 1e16 / 365
    const value = (balance * chargePrice)
    const earnedTokens = (earned[0].hex / 1e18)
    const earnedValue = ((earned[0].hex / 1e18) * staticPrice)

    return {
        earnedTokens, earnedValue,
        tokens: balance,
        value: value.toFixed(2),
        tvl: tvl.toFixed(0),
        daily: daily.toFixed(2),
        dailyIncrease: ((daily / 100) * value).toFixed(2)

    }
}
