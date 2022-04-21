import {ContractCallContext} from "ethereum-multicall";
import * as config from "../../../../../config";
import Web3 from "web3";
import {doMulticall} from "../../../../../service/multicall.service";



const _generateContext = (): ContractCallContext[] => {
    const contracts = config.defaultChain.deployments
    return  [
        {
            reference: 'epoch',
            contractAddress: contracts.Boardroom.address,
            abi: contracts.Boardroom.abi,
            calls: [{reference: 'epoch', methodName: "epoch", methodParameters: [] }]
        },
        {
            reference: 'nextEpochPoint',
            contractAddress: contracts.Boardroom.address,
            abi: contracts.Boardroom.abi,
            calls: [{reference: 'nextEpochPoint', methodName: "nextEpochPoint", methodParameters: [] }]
        },
        {

            reference: 'epochsUnderOne',
            contractAddress: contracts.Treasury.address,
            abi: contracts.Treasury.abi,
            calls: [{reference: 'epochsUnderOne', methodName: "epochsUnderOne", methodParameters: [] }]
        },
        {
            reference: 'twap',
            contractAddress: contracts.Oracle.address,
            abi: contracts.Oracle.abi,
            calls: [{reference: 'twap', methodName: "twap", methodParameters: [contracts.Static.address, 1e14] }]
        },
    ];
}


export const getProtocolStats = async(web3: Web3) => {
    const call = await doMulticall(web3, _generateContext())
    return {
        epoch: call.results.epoch.callsReturnContext[0].returnValues[0].hex / 1,
        nextEpochPoint: call.results.nextEpochPoint.callsReturnContext[0].returnValues[0].hex * 1e3,
        epochsUnderOne: call.results.epochsUnderOne.callsReturnContext[0].returnValues[0].hex / 1,
        twap: call.results.twap.callsReturnContext[0].returnValues[0].hex / 1e14,
    }
}
