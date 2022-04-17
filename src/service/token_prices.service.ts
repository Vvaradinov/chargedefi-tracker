import {doMulticall} from "./multicall.service";
import Web3 from "web3";
import * as config from "../config";

const contracts = config.defaultChain.deployments
const defaultChain = config.defaultChain

const getContext = () => {
    switch(defaultChain.shortName){
        case "BSC":
            return [
                {
                    reference: 'staticPrice',
                    contractAddress: contracts.GeneralRouter.address,
                    abi: contracts.GeneralRouter.abi,
                    calls: [{reference: 'getAmountsOutCall', methodName: "getAmountsOut", methodParameters: [1e9, [contracts.Static.address, defaultChain.externalTokens.BUSD[0]]] }]
                },
                {
                    reference: 'chargePrice',
                    contractAddress: contracts.GeneralRouter.address,
                    abi: contracts.GeneralRouter.abi,
                    calls: [{reference: 'getAmountsOutCall', methodName: "getAmountsOut", methodParameters: [1e9, [contracts.Charge.address, defaultChain.externalTokens.BUSD[0]]] }]
                },
                {
                    reference: 'staticBUSDBalance',
                    contractAddress: defaultChain.externalTokens.BUSD[0],
                    abi: contracts.BEPToken.abi,
                    calls: [{reference: 'balanceOfBUSD', methodName: "balanceOf", methodParameters: [defaultChain.doubleEarnBoardrooms[0].address] }]
                },
                {
                    reference: 'staticLpBalance',
                    contractAddress: contracts.Static.address,
                    abi: contracts.BEPToken.abi,
                    calls: [{reference: 'balanceOfStaticLp', methodName: "balanceOf", methodParameters: [defaultChain.doubleEarnBoardrooms[0].address] }]
                },
                {
                    reference: 'cakeLPStaticBusdSupply',
                    contractAddress: contracts.StaticLP.address,
                    abi: contracts.StaticLP.abi,
                    calls: [{reference: 'totalSupply', methodName: "totalSupply", methodParameters: [] }]
                },
                {
                    reference: 'chargeBUSDBalance',
                    contractAddress: defaultChain.externalTokens.BUSD[0],
                    abi: contracts.BEPToken.abi,
                    calls: [{reference: 'balanceOfBUSD', methodName: "balanceOf", methodParameters: [defaultChain.doubleEarnBoardrooms[1].address] }]
                },
                {
                    reference: 'chargeLpBalance',
                    contractAddress: contracts.Charge.address,
                    abi: contracts.BEPToken.abi,
                    calls: [{reference: 'balanceOfStaticLp', methodName: "balanceOf", methodParameters: [defaultChain.doubleEarnBoardrooms[1].address] }]
                },
                {
                    reference: 'cakeLPChargeBusdSupply',
                    contractAddress: contracts.ChargeLP.address,
                    abi: contracts.ChargeLP.abi,
                    calls: [{reference: 'totalSupply', methodName: "totalSupply", methodParameters: [] }]
                },
            ];
        case "FTM":
            return [
                {
                    reference: 'staticPrice',
                    contractAddress: contracts.GeneralRouter.address,
                    abi: contracts.GeneralRouter.abi,
                    calls: [{reference: 'getAmountsOutCall', methodName: "getAmountsOut", methodParameters: [1e14, [contracts.Static.address, defaultChain.externalTokens.USDC[0]]] }]
                },
                {

                    reference: 'chargePrice',
                    contractAddress: contracts.GeneralRouter.address,
                    abi: contracts.GeneralRouter.abi,
                    calls: [{reference: 'getAmountsOutCall', methodName: "getAmountsOut", methodParameters: [1e14, [contracts.Charge.address, defaultChain.externalTokens.USDC[0]]] }]
                },
                {
                    reference: 'staticBUSDBalance',
                    contractAddress: defaultChain.externalTokens.USDC[0],
                    abi: contracts.BEPToken.abi,
                    calls: [{reference: 'balanceOfBUSD', methodName: "balanceOf", methodParameters: [defaultChain.doubleEarnBoardrooms[0].address] }]
                },
                {
                    reference: 'staticLpBalance',
                    contractAddress: contracts.Static.address,
                    abi: contracts.BEPToken.abi,
                    calls: [{reference: 'balanceOfStaticLp', methodName: "balanceOf", methodParameters: [defaultChain.doubleEarnBoardrooms[0].address] }]
                },
                {
                    reference: 'cakeLPStaticBusdSupply',
                    contractAddress: contracts.StaticLP.address,
                    abi: contracts.StaticLP.abi,
                    calls: [{reference: 'totalSupply', methodName: "totalSupply", methodParameters: [] }]
                },
                {
                    reference: 'chargeBUSDBalance',
                    contractAddress: defaultChain.externalTokens.USDC[0],
                    abi: contracts.BEPToken.abi,
                    calls: [{reference: 'balanceOfBUSD', methodName: "balanceOf", methodParameters: [defaultChain.doubleEarnBoardrooms[1].address] }]
                },
                {
                    reference: 'chargeLpBalance',
                    contractAddress: contracts.Charge.address,
                    abi: contracts.BEPToken.abi,
                    calls: [{reference: 'balanceOfStaticLp', methodName: "balanceOf", methodParameters: [defaultChain.doubleEarnBoardrooms[1].address] }]
                },
                {
                    reference: 'cakeLPChargeBusdSupply',
                    contractAddress: contracts.ChargeLP.address,
                    abi: contracts.ChargeLP.abi,
                    calls: [{reference: 'totalSupply', methodName: "totalSupply", methodParameters: [] }]
                },
            ]
        default:
            return []
    }
}


const _computeLpPrice = (totalSupply:any, t0price:any, t0supply:any, t1price:any, t1supply:any): number => {
    const token0In1Lp = ((t0supply * 1e12) / totalSupply ) / 1e12
    const token1In1Lp = ((t1supply * 1e12) / totalSupply ) / 1e12
    return token0In1Lp * t0price  + token1In1Lp * t1price;
}

export const getTokenPricesMulticall = async(web3: Web3) => {
    const h = await doMulticall(web3, getContext())

    const decimal = defaultChain.shortName === "BSC" ? 1e9 : 1e2
    const priceStableMultiplier = defaultChain.shortName === "BSC" ? 1 : 1e12
    const staticPrice = h.results.staticPrice.callsReturnContext[0].returnValues[1].hex / decimal
    const chargePrice = h.results.chargePrice.callsReturnContext[0].returnValues[1].hex / decimal

    const totalStaticStableSupply = h.results.cakeLPStaticBusdSupply.callsReturnContext[0].returnValues[0].hex
    const staticStableT0Supply = h.results.staticLpBalance.callsReturnContext[0].returnValues[0].hex
    const staticStableT1Supply = h.results.staticBUSDBalance.callsReturnContext[0].returnValues[0].hex

    const totalChargeStableSupply = h.results.cakeLPChargeBusdSupply.callsReturnContext[0].returnValues[0].hex
    const chargeStableT0Supply = h.results.chargeLpBalance.callsReturnContext[0].returnValues[0].hex
    const chargeStableT1Supply = h.results.chargeBUSDBalance.callsReturnContext[0].returnValues[0].hex


    const staticLpPrice = _computeLpPrice(
        totalStaticStableSupply, staticPrice, staticStableT0Supply, 1, staticStableT1Supply * priceStableMultiplier
    )

    const chargeLpPrice = _computeLpPrice(
        totalChargeStableSupply, chargePrice, chargeStableT0Supply, 1, chargeStableT1Supply * priceStableMultiplier
    )

    return {
        chargePrice: chargePrice.toFixed(3),
        staticPrice: staticPrice.toFixed(3),
        pulsePrice: staticLpPrice.toFixed(3),
        staticLp: staticLpPrice.toFixed(3),
        chargeLp: chargeLpPrice.toFixed(3),
        busd: 1
    }

}
