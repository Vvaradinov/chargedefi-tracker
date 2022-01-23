import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import staticBusdLpContract from "../../../contracts/static-busd-lp.json"
import {
    CHARGE_FARM_ADDRESS,
    MASTER_FARM_ADDRESS,
    STATIC_FARM_ADDRESS,
    staticBusdLpAddress
} from "../../../../../common/helpers/consts";

import {useEffect, useState} from "react";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";
import masterChargeABI from "../contracts/master_charge_abi.json"
import {Web3Singleton} from "../../../../../common/providers/Web3Singleton";
import {useAggregateWallets} from "../../../../../common/contexts/AggregateWalletsContext";

const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

export const useFarms = () => {
    const {walletAddress} = useWalletAddress()!
    const { aggregateWallets } = useAggregateWallets()!
    const { tokens } = useTokenPrices()!
    const { chargePrice, staticPrice, staticLp, chargeLp } = tokens

    // const mainFarmContract = new web3.eth.Contract(masterChargeABI, MASTER_FARM_ADDRESS, ).methods
    const staticFarmContract = new web3.eth.Contract(masterChargeABI, STATIC_FARM_ADDRESS, ).methods
    const chargeFarmContract = new web3.eth.Contract(masterChargeABI, CHARGE_FARM_ADDRESS, ).methods

    // const staticBusdLpC = new web3.eth.Contract(staticBusdLpContract as any, staticBusdLpAddress, )
    const [stats, setStats] = useState<any>({})

    const get = async() => {

        const staticFarmInfo = aggregateWallets.map((i:string) => staticFarmContract.userInfo(0, i).call())
        const chargeFarmInfo = aggregateWallets.map((i:string) => chargeFarmContract.userInfo(0, i).call())
        const staticFarmReward = aggregateWallets.map((i:string) => staticFarmContract.pendingReward(i, 0).call())
        const chargeFarmReward = aggregateWallets.map((i:string) => chargeFarmContract.pendingReward(i, 0).call())

        const chainCalls = await Promise.all([
            await Promise.all(staticFarmInfo),
            await Promise.all(chargeFarmInfo),
            await Promise.all(staticFarmReward),
            await Promise.all(chargeFarmReward),
            // staticFarmContract.userInfo(0, walletAddress).call(),
            // chargeFarmContract.userInfo(0, walletAddress).call(),
            // staticFarmContract.pendingReward(walletAddress, 0).call(),
            // chargeFarmContract.pendingReward(walletAddress, 0).call(),
            staticFarmContract.APR(0).call(),
            chargeFarmContract.APR(0).call(),
            staticFarmContract.TVL(0).call(),
            chargeFarmContract.TVL(0).call(),
        ])



        let staticLpAmount
        let chargeLpAmount
        let staticPoolReward
        let chargePoolReward
        if(aggregateWallets.length > 1){
            staticLpAmount = chainCalls[0].reduce((prev:any, curr:any) => prev.amount / 1e18 + curr.amount / 1e18)
            chargeLpAmount = chainCalls[1].reduce((prev:any, curr:any) => prev.amount / 1e18 + curr.amount / 1e18)
            staticPoolReward = chainCalls[2].reduce((prev:any, curr:any) => prev / 1e18 + curr / 1e18)
            chargePoolReward = chainCalls[3].reduce((prev:any, curr:any) => prev / 1e18 + curr / 1e18)
        } else {
            staticLpAmount = chainCalls[0][0].amount / 1e18
            chargeLpAmount = chainCalls[1][0].amount / 1e18
            staticPoolReward = chainCalls[2][0] / 1e18
            chargePoolReward = chainCalls[3][0] / 1e18
        }


        const staticDaily = (chainCalls[4] / 1e18) / 365 * 100
        const chargeDaily = (chainCalls[5] / 1e18) / 365 * 100

        const staticTVL = (chainCalls[6] / 1e18).toFixed(0)
        const chargeTVL = (chainCalls[7] / 1e18).toFixed(0)
        const chargeRewardValue = (chargePoolReward * chargePrice).toFixed(2)
        const staticRewardValue = (staticPoolReward * chargePrice).toFixed(2)
        const staticLpValue = (staticLpAmount * staticLp)
        const chargeLpValue = (chargeLpAmount * chargeLp)

        // console.log((staticLpAmount * staticDaily / 100).toFixed(2))
        // console.log((chargeLpAmount * chargeDaily / 100).toFixed(2))
        setStats({
            // LPs
            staticLpAmount,
            chargeLpAmount,
            staticLpValue: staticLpValue.toFixed(2),
            chargeLpValue: chargeLpValue.toFixed(2),
            // Rewards
            staticPoolReward: staticPoolReward.toFixed(3),
            staticRewardValue,
            chargePoolReward: chargePoolReward.toFixed(3),
            chargeRewardValue,
            // Stats
            chargeTVL,
            staticTVL,
            staticChangeDaily: {percent: staticDaily.toFixed(2), value: (staticLpValue * staticDaily / 100).toFixed(2)},
            chargeChangeDaily: {percent: chargeDaily.toFixed(2), value: (chargeLpValue * chargeDaily / 100).toFixed(2)},

        })
    }


    useEffect(() => {
        get()
    },[staticPrice, chargePrice])

    return {
        stats
    }
}
