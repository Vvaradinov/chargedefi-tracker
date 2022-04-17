import {ContractCallContext} from "ethereum-multicall";
import * as config from "../../../../../config"
import Web3 from "web3";
import {doMulticall} from "../../../../../service/multicall.service";

const _generateContext = (address: string): ContractCallContext[] => {
    const contracts = config.defaultChain.deployments
    return  [
        {
            reference: 'chargeFarmInfo',
            contractAddress: contracts.FarmChargeAllocation.address,
            abi: contracts.FarmChargeAllocation.abi,
            calls: [{reference: 'chargeFarmInfo', methodName: "userInfo", methodParameters: [0, address] }]
        },
        {
            reference: 'chargeFarmPendingRewards',
            contractAddress: contracts.FarmChargeAllocation.address,
            abi: contracts.FarmChargeAllocation.abi,
            calls: [{reference: 'chargeFarmPendingRewards', methodName: "pendingReward", methodParameters: [address, 0] }]
        },
        {
            reference: 'chargeFarmAPR',
            contractAddress: contracts.FarmChargeAllocation.address,
            abi: contracts.FarmChargeAllocation.abi,
            calls: [{reference: 'chargeFarmAPR', methodName: "APR", methodParameters: [0] }]
        },
        {
            reference: 'chargeFarmTVL',
            contractAddress: contracts.FarmChargeAllocation.address,
            abi: contracts.FarmChargeAllocation.abi,
            calls: [{reference: 'chargeFarmTVL', methodName: "TVL", methodParameters: [0] }]
        },
        {
            reference: 'staticFarmInfo',
            contractAddress: contracts.FarmCharge2Allocation.address,
            abi: contracts.FarmCharge2Allocation.abi,
            calls: [{reference: 'staticFarmInfo', methodName: "userInfo", methodParameters: [0, address] }]
        },
        {
            reference: 'staticFarmPendingRewards',
            contractAddress: contracts.FarmCharge2Allocation.address,
            abi: contracts.FarmCharge2Allocation.abi,
            calls: [{reference: 'staticFarmPendingRewards', methodName: "pendingReward", methodParameters: [address, 0] }]
        },
        {
            reference: 'staticFarmAPR',
            contractAddress: contracts.FarmCharge2Allocation.address,
            abi: contracts.FarmCharge2Allocation.abi,
            calls: [{reference: 'staticFarmAPR', methodName: "APR", methodParameters: [0] }]
        },
        {
            reference: 'staticFarmTVL',
            contractAddress: contracts.FarmCharge2Allocation.address,
            abi: contracts.FarmCharge2Allocation.abi,
            calls: [{reference: 'staticFarmTVL', methodName: "TVL", methodParameters: [0] }]
        },


    ];
}

export const getFarmData = async (web3: Web3, address: string, chargePrice: any, staticLp:any, chargeLp: any) => {
    const call = await doMulticall(web3, _generateContext(address))
    const staticLpAmount = call.results.staticFarmInfo.callsReturnContext[0].returnValues[0].hex / 1e18
    const chargeLpAmount = call.results.chargeFarmInfo.callsReturnContext[0].returnValues[0].hex / 1e18
    const staticFarmPendingRewards = call.results.staticFarmPendingRewards.callsReturnContext[0].returnValues[0].hex / 1e18
    const chargeFarmPendingRewards = call.results.chargeFarmPendingRewards.callsReturnContext[0].returnValues[0].hex / 1e18
    const staticFarmTVL = call.results.staticFarmTVL.callsReturnContext[0].returnValues[0].hex / 1e18
    const chargeFarmTVL = call.results.chargeFarmTVL.callsReturnContext[0].returnValues[0].hex / 1e18
    const staticFarmAPR = call.results.staticFarmAPR.callsReturnContext[0].returnValues[0].hex / 1e18
    const chargeFarmAPR = call.results.chargeFarmAPR.callsReturnContext[0].returnValues[0].hex / 1e18
    const staticDaily =  staticFarmAPR / 365 * 100
    const chargeDaily =  chargeFarmAPR / 365 * 100

    const chargeRewardValue = (chargeFarmPendingRewards * chargePrice).toFixed(2)
    const staticRewardValue = (staticFarmPendingRewards * chargePrice).toFixed(2)
    const staticLpValue = (staticLpAmount * staticLp)
    const chargeLpValue = (chargeLpAmount * chargeLp)

    // console.log(staticLp)
    // console.log(staticLp)
    // console.log(staticLpAmount * staticLpValue)
    return {
        staticLpAmount,
        chargeLpAmount,
        staticLpValue: staticLpValue.toFixed(2),
        chargeLpValue: chargeLpValue.toFixed(2),
        // Rewards
        staticPoolReward: staticFarmPendingRewards.toFixed(3),
        staticRewardValue,
        chargePoolReward: chargeFarmPendingRewards.toFixed(3),
        chargeRewardValue,
        // Stats
        chargeTVL: chargeFarmTVL,
        staticTVL: staticFarmTVL,
        staticChangeDaily: {percent: staticDaily.toFixed(2), value: (staticLpValue * staticDaily / 100).toFixed(2)},
        chargeChangeDaily: {percent: chargeDaily.toFixed(2), value: (chargeLpValue * chargeDaily / 100).toFixed(2)},
    }
}
