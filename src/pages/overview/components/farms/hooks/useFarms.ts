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

const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

export const useFarms = () => {
    const {walletAddress} = useWalletAddress()!
    const { tokens } = useTokenPrices()!
    const { chargePrice, staticPrice, staticLp, chargeLp } = tokens

    const mainFarmContract = new web3.eth.Contract(masterChargeABI, MASTER_FARM_ADDRESS, {from: walletAddress}).methods
    const staticFarmContract = new web3.eth.Contract(masterChargeABI, STATIC_FARM_ADDRESS, {from: walletAddress}).methods
    const chargeFarmContract = new web3.eth.Contract(masterChargeABI, CHARGE_FARM_ADDRESS, {from: walletAddress}).methods

    const staticBusdLpC = new web3.eth.Contract(staticBusdLpContract as any, staticBusdLpAddress, {from: walletAddress})


    const [stats, setStats] = useState<any>({})

    const get = async() => {

        const stats = await Promise.all([
            staticFarmContract.userInfo(0, walletAddress).call(),
            chargeFarmContract.userInfo(0, walletAddress).call(),
            staticFarmContract.pendingReward(walletAddress, 0).call(),
            chargeFarmContract.pendingReward(walletAddress, 0).call(),
            staticFarmContract.APR(0).call(),
            chargeFarmContract.APR(0).call(),
            staticFarmContract.TVL(0).call(),
            chargeFarmContract.TVL(0).call(),
        ])

        const staticLpAmount = stats[0].amount / 1e18
        const chargeLpAmount = stats[1].amount / 1e18
        const staticPoolReward = stats[2] / 1e18
        const chargePoolReward = stats[3] / 1e18
        const staticDaily = (stats[4] / 1e18) / 365 * 100
        const chargeDaily = (stats[5] / 1e18) / 365 * 100

        const staticTVL = (stats[6] / 1e18).toFixed(0)
        const chargeTVL = (stats[7] / 1e18).toFixed(0)
        const chargeRewardValue = (chargePoolReward * chargePrice).toFixed(2)
        const staticRewardValue = (staticPoolReward * chargePrice).toFixed(2)
        const staticLpValue = (staticLpAmount * staticLp).toFixed(2)
        const chargeLpValue = (chargeLpAmount * chargeLp).toFixed(2)


        setStats({
            // LPs
            staticLpAmount,
            chargeLpAmount,
            staticLpValue,
            chargeLpValue,
            // Rewards
            staticPoolReward: staticPoolReward.toFixed(3),
            staticRewardValue,
            chargePoolReward: chargePoolReward.toFixed(3),
            chargeRewardValue,
            // Stats
            chargeTVL,
            staticTVL,
            staticChangeDaily: {percent: staticDaily.toFixed(2), value: (staticLpAmount * staticDaily / 100).toFixed(2)},
            chargeChangeDaily: {percent: chargeDaily.toFixed(2), value: (chargeLpAmount * chargeDaily / 100).toFixed(2)},

        })
    }


    useEffect(() => {
        get()
    },[staticPrice, chargePrice])

    return {
        stats
    }
}
