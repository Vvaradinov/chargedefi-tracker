import {ContractCallContext} from "ethereum-multicall";
import * as config from "../../../../../config";
import Web3 from "web3";
import {doMulticall} from "../../../../../service/multicall.service";

const _generateContext = (address: string): ContractCallContext[] => {
    const contracts = config.defaultChain.deployments
    return  [
        {
            reference: 'earned',
            contractAddress: contracts.LPTokenBoardroom.address,
            abi: contracts.LPTokenBoardroom.abi,
            calls: [{reference: 'earned', methodName: "earned", methodParameters: [address] }]
        },
        {
            reference: 'balanceOf',
            contractAddress: contracts.LPTokenBoardroom.address,
            abi: contracts.LPTokenBoardroom.abi,
            calls: [{reference: 'balanceOf', methodName: "balanceOf", methodParameters: [address] }]
        },
        {
            reference: 'totalSupply',
            contractAddress: contracts.LPTokenBoardroom.address,
            abi: contracts.LPTokenBoardroom.abi,
            calls: [{reference: 'totalSupply', methodName: "totalSupply", methodParameters: [] }]
        },
        {
            reference: 'epoch',
            contractAddress: contracts.Boardroom.address,
            abi: contracts.Boardroom.abi,
            calls: [{reference: 'epoch', methodName: "epoch", methodParameters: [] }]
        },
        {
            reference: 'TVL',
            contractAddress: contracts.BoardroomStats.address,
            abi: contracts.BoardroomStats.abi,
            calls: [{reference: 'TVL', methodName: "TVL", methodParameters: [contracts.LPTokenBoardroom.address] }]
        },
        {
            reference: 'APR',
            contractAddress: contracts.BoardroomStats.address,
            abi: contracts.BoardroomStats.abi,
            calls: [{reference: 'APR', methodName: "APR", methodParameters: [contracts.LPTokenBoardroom.address] }]
        },

    ];
}

const _generateContext2 = (epoch: number): ContractCallContext[] => {
    const contracts = config.defaultChain.deployments

    return [
        {
            reference: 'boardHistory',
            contractAddress: contracts.LPTokenBoardroom.address,
            abi: contracts.LPTokenBoardroom.abi,
            calls: [{reference: 'boardHistory', methodName: "boardHistory", methodParameters: [epoch] }]
        },
        {
            reference: 'prevBoardHistory',
            contractAddress: contracts.LPTokenBoardroom.address,
            abi: contracts.LPTokenBoardroom.abi,
            calls: [{reference: 'boardHistory', methodName: "boardHistory", methodParameters: [epoch-1] }]
        },
    ]
}

export const getLpBoardroomStats = async (web3: Web3, address: string, staticPrice: any, chargePrice: any, staticLpPrice: any) => {
    const call = await doMulticall(web3, _generateContext(address))
    const earned = call.results.earned.callsReturnContext[0].returnValues
    const balance = call.results.balanceOf.callsReturnContext[0].returnValues[0].hex / 1e18
    const tvl = call.results.TVL.callsReturnContext[0].returnValues[0].hex / 1e18
    const epoch = call.results.epoch.callsReturnContext[0].returnValues[0].hex / 1
    const call2 = await doMulticall(web3, _generateContext2(epoch))
    const lastRewards0PerShare = call2.results.boardHistory.callsReturnContext[0].returnValues[2].hex / 1;
    const lastRewards1PerShare = call2.results.boardHistory.callsReturnContext[0].returnValues[4].hex / 1;
    const prevRewards0PerShare = call2.results.prevBoardHistory.callsReturnContext[0].returnValues[2].hex / 1;
    const prevRewards1PerShare = call2.results.prevBoardHistory.callsReturnContext[0].returnValues[4].hex / 1;
    const epochRewards0PerShare = (lastRewards0PerShare - prevRewards0PerShare) / 1e18;
    const epochRewards1PerShare = (lastRewards1PerShare - prevRewards1PerShare) / 1e18;
    const rewards0PerYear = epochRewards0PerShare*(24/8)*365*staticPrice;
    const rewards1PerYear = epochRewards1PerShare*(24/8)*365*chargePrice;
    const staticDaily = (rewards0PerYear * 100 / staticLpPrice) / 365
    const chargeDaily = (rewards1PerYear * 100 / staticLpPrice) / 365


    const value = (balance * staticLpPrice)

    const earnedStaticTokens = (earned[0].hex / 1e18)
    const earnedStaticValue = ((earned[0].hex / 1e18) * staticPrice)

    const earnedChargeTokens = (earned[1].hex / 1e18)
    const earnedChargeValue = ((earned[1].hex / 1e18) * chargePrice)

    return {
        earnedStaticTokens, earnedStaticValue,
        earnedChargeTokens, earnedChargeValue,
        tokens: balance,
        value: value.toFixed(2),
        tvl: tvl.toFixed(0),
        chargeChangeDaily: {
            percent: chargeDaily.toFixed(2),
            value: (value * (chargeDaily / 100)).toFixed(2)
        },
        staticChangeDaily: {
            percent: staticDaily.toFixed(2),
            value: (value * (staticDaily / 100)).toFixed(2)
        }

    }
}
