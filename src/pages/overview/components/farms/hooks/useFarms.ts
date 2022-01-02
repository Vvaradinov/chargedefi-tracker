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

    const [staticBusd, setStaticBusd] = useState<any>({})
    const [chargeBusd, setChargeBusd] = useState<any>({})

    const [stats, setStats] = useState<any>({})

    const get = async() => {
        const staticLpAmount = (await staticFarmContract.userInfo(0, walletAddress).call()).amount / 1e18
        const chargeLpAmount = (await chargeFarmContract.userInfo(0, walletAddress).call()).amount / 1e18
        const staticPoolReward = (await staticFarmContract.pendingReward(walletAddress, 0).call()) / 1e18
        const chargePoolReward = (await chargeFarmContract.pendingReward(walletAddress, 0).call()) / 1e18
        const staticDaily = (await staticFarmContract.APR(0).call() / 1e18) / 365 * 100
        const chargeDaily = (await chargeFarmContract.APR(0).call() / 1e18) / 365 * 100

        const staticTVL = ((await staticFarmContract.TVL(0).call()) / 1e18).toFixed(0)
        const chargeTVL = ((await chargeFarmContract.TVL(0).call()) / 1e18).toFixed(0)
        const chargeRewardValue = (chargePoolReward * chargePrice).toFixed(2)
        const staticRewardValue = (staticPoolReward * chargePrice).toFixed(2)
        const staticLpValue = (staticLpAmount * staticLp)
        const chargeLpValue = (chargeLpAmount * chargeLp)

        console.log((staticLpAmount * staticDaily / 100).toFixed(2))
        console.log((chargeLpAmount * chargeDaily / 100).toFixed(2))
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
        staticBusd, chargeBusd, stats
    }
}
