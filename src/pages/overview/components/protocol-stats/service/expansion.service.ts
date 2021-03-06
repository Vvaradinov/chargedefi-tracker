import {ContractCallContext} from "ethereum-multicall";
import * as config from "../../../../../config";
import Web3 from "web3";
import {doMulticall} from "../../../../../service/multicall.service";
import {defaultChain} from "../../../../../config";

const _generateContextBsc = (): ContractCallContext[] => {
    const contracts = config.defaultChain.deployments
    return  [
        {
            reference: 'boardroomBalance',
            contractAddress: contracts.Static.address,
            abi: contracts.Static.abi,
            calls: [{reference: 'balanceOf', methodName: "balanceOf", methodParameters: [contracts.Boardroom.address] }]
        },
        {
            reference: 'lpBoardroomBalance',
            contractAddress: contracts.Static.address,
            abi: contracts.Static.abi,
            calls: [{reference: 'balanceOf', methodName: "balanceOf", methodParameters: [contracts.LPTokenBoardroom.address] }]
        },
        {
            reference: 'staticTotalSupply',
            contractAddress: contracts.Static.address,
            abi: contracts.Static.abi,
            calls: [{reference: 'totalSupply', methodName: "totalSupply", methodParameters: [] }]
        },
        {
            reference: 'staticTreasurySupply',
            contractAddress: contracts.Static.address,
            abi: contracts.Static.abi,
            calls: [{reference: 'balanceOf', methodName: "balanceOf", methodParameters: [contracts.Treasury.address] }]
        },
        {
            reference: 'chargeMintLimit',
            contractAddress: contracts.Charge.address,
            abi: contracts.Charge.abi,
            calls: [{reference: 'mintLimitOf', methodName: "mintLimitOf", methodParameters: [contracts.Treasury.address] }]
        },
        {
            reference: 'mintedAmountOf',
            contractAddress: contracts.Charge.address,
            abi: contracts.Charge.abi,
            calls: [{reference: 'mintedAmountOf', methodName: "mintedAmountOf", methodParameters: [contracts.Treasury.address] }]
        },
        {
            reference: 'sharesMintedPerEpoch',
            contractAddress: contracts.Treasury.address,
            abi: contracts.Treasury.abi,
            calls: [{reference: 'sharesMintedPerEpoch', methodName: "sharesMintedPerEpoch", methodParameters: [] }]
        },

        {
            reference: 'bondDepletionFloorPercent',
            contractAddress: contracts.Treasury.address,
            abi: contracts.Treasury.abi,
            calls: [{reference: 'bondDepletionFloorPercent', methodName: "bondDepletionFloorPercent", methodParameters: [] }]
        },
        {
            reference: 'pulseTotalSupply',
            contractAddress: contracts.Pulse.address,
            abi: contracts.Pulse.abi,
            calls: [{reference: 'totalSupply', methodName: "totalSupply", methodParameters: [] }]
        },
        {
            reference: 'twap',
            contractAddress: contracts.Oracle.address,
            abi: contracts.Oracle.abi,
            calls: [{reference: 'twap', methodName: "twap", methodParameters: [contracts.Static.address, 1e14] }]
        },
    ];
}
const _generateContextFtm = (): ContractCallContext[] => {
    const contracts = config.defaultChain.deployments
    return  [
        {
            reference: 'boardroomBalance',
            contractAddress: contracts.Static.address,
            abi: contracts.Static.abi,
            calls: [{reference: 'balanceOf', methodName: "balanceOf", methodParameters: [defaultChain.chargeBoardroom] }]
        },
        {
            reference: 'lpBoardroomBalance',
            contractAddress: contracts.Static.address,
            abi: contracts.Static.abi,
            calls: [{reference: 'balanceOf', methodName: "balanceOf", methodParameters: [defaultChain.staticLpBoardroom] }]
        },
        {
            reference: 'staticTotalSupply',
            contractAddress: contracts.Static.address,
            abi: contracts.Static.abi,
            calls: [{reference: 'totalSupply', methodName: "totalSupply", methodParameters: [] }]
        },
        {
            reference: 'staticTreasurySupply',
            contractAddress: contracts.Static.address,
            abi: contracts.Static.abi,
            calls: [{reference: 'balanceOf', methodName: "balanceOf", methodParameters: [contracts.Treasury.address] }]
        },
        {
            reference: 'chargeMintLimit',
            contractAddress: contracts.Charge.address,
            abi: contracts.Charge.abi,
            calls: [{reference: 'mintLimitOf', methodName: "mintLimitOf", methodParameters: [contracts.Treasury.address] }]
        },
        {
            reference: 'mintedAmountOf',
            contractAddress: contracts.Charge.address,
            abi: contracts.Charge.abi,
            calls: [{reference: 'mintedAmountOf', methodName: "mintedAmountOf", methodParameters: [contracts.Treasury.address] }]
        },
        {
            reference: 'sharesMintedPerEpoch',
            contractAddress: contracts.Treasury.address,
            abi: contracts.Treasury.abi,
            calls: [{reference: 'sharesMintedPerEpoch', methodName: "sharesMintedPerEpoch", methodParameters: [] }]
        },

        {
            reference: 'twap',
            contractAddress: contracts.Oracle.address,
            abi: contracts.Oracle.abi,
            calls: [{reference: 'twap', methodName: "twap", methodParameters: [contracts.Static.address, 1e14] }]
        },
    ];

}


export const getExpansionStats = async(web3: Web3, pulsePrice: any, chargePrice: any, staticPrice: any) => {
    const isBsc = defaultChain.shortName === "BSC"
    const call = await doMulticall(web3, isBsc ? _generateContextBsc() : _generateContextFtm())
    const mintLimit = call.results.chargeMintLimit.callsReturnContext[0].returnValues[0].hex / 1e18
    const mintedAmount = call.results.mintedAmountOf.callsReturnContext[0].returnValues[0].hex / 1e18
    const chargeMint = mintLimit > mintedAmount ? mintLimit - mintedAmount : 0
    const chargeAmount = Math.min(chargeMint, call.results.sharesMintedPerEpoch.callsReturnContext[0].returnValues[0].hex / 1e18)
    const twap = call.results.twap.callsReturnContext[0].returnValues[0].hex / 1e14
    const staticTotalSupply = call.results.staticTotalSupply.callsReturnContext[0].returnValues[0].hex / 1e18
    const lpBoardroomBalance = call.results.lpBoardroomBalance.callsReturnContext[0].returnValues[0].hex / 1e18
    const boardroomBalance = call.results.boardroomBalance.callsReturnContext[0].returnValues[0].hex / 1e18
    const staticTreasurySupply = call.results.staticTreasurySupply.callsReturnContext[0].returnValues[0].hex / 1
    const circulatingSupply = staticTotalSupply - lpBoardroomBalance - boardroomBalance - staticTreasurySupply

    const bondDepletionFloorPercent = isBsc ? call.results.bondDepletionFloorPercent.callsReturnContext[0].returnValues[0].hex / 1 : 1
    const totalBondsToRepay = isBsc ? call.results.pulseTotalSupply.callsReturnContext[0].returnValues[0].hex / 1e19 : 1
    let staticValue
    let staticAmount
    let pulseRepayValue = 0
    let pulseRepayAmount = 0
    // console.log(staticPrice)
    // console.log(twap * staticPrice)

    if(twap < 1.01){
        staticValue = (twap - 1.01) * circulatingSupply  * twap
        staticAmount = (twap - 1.01) * circulatingSupply
    } else {
        pulseRepayAmount = (twap - 1.01) * 0.1 * circulatingSupply * 0.05
        pulseRepayValue = pulseRepayAmount * twap
        staticValue = ((twap - 1.01) * 0.1 * circulatingSupply - pulseRepayAmount) * twap
        staticAmount = (twap - 1.01) * 0.1 * circulatingSupply - pulseRepayAmount
    }

    return {
        chargeAmount,
        chargeValue: chargeAmount * chargePrice,
        staticValue, staticAmount,
        pulseRepayAmount, pulseRepayValue,
        pulseLeftAmount: totalBondsToRepay * bondDepletionFloorPercent / 1000,
        pulseLeftValue: (totalBondsToRepay * bondDepletionFloorPercent / 1000) * twap

    }
}
