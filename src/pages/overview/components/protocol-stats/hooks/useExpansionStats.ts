import {CHARGE_ADDRESS, pulseAddress, staticAddress, treasuryAddress} from "../../../../../common/helpers/consts";
import treasuryContract from "../../../contracts/treasury.json";
import staticContract from "../../../../../common/contracts/static_abi.json";
import chargeContract from "../../../../../common/contracts/charge_abi.json";
import pulseContract from "../../../../../common/contracts/pulse_abi.json";

import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import {useEffect, useState} from "react";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";


const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

export const useExpansionStats = () => {
    const {walletAddress} = useWalletAddress()!
    const { tokens } = useTokenPrices()!
    const { staticPrice, pulsePrice, chargePrice } = tokens

    const treasuryC = new web3.eth.Contract(treasuryContract, treasuryAddress, {from: walletAddress}).methods
    const staticC = new web3.eth.Contract(staticContract, staticAddress, {from: walletAddress}).methods
    const chargeC = new web3.eth.Contract(chargeContract, CHARGE_ADDRESS, {from: walletAddress}).methods
    const pulseC = new web3.eth.Contract(pulseContract, pulseAddress, {from: walletAddress}).methods


    const [staticDollarAmount, setStaticDollarAmount] = useState<number>()
    const [staticAmount, setStaticAmount] = useState<any>()
    const [chargeDollarAmount, setChargeDollarAmount] = useState<number>()
    const [chargeAmount, setChargeAmount] = useState<any>()
    const [pulseRepay, setPulseRepay] = useState<any>()
    const [pulseRepayAmount, setPulseRepayAmount] = useState<any>()

    const get = async () => {
        const stats = await Promise.all([
            staticC.totalSupply().call(),
            chargeC.mintLimitOf(treasuryAddress).call(),
            chargeC.mintedAmountOf(treasuryAddress).call(),
            treasuryC.sharesMintedPerEpoch.call().call(),
            pulseC.totalSupply().call(),
            treasuryC.bondDepletionFloorPercent.call().call(),

        ])

        setStaticDollarAmount((staticPrice - 1.01) * 0.1 * stats[0] / 1e18 * staticPrice)
        let amount = (staticPrice - 1.01) * 0.1 * stats[0] / 1e18
        setStaticAmount((amount))

        let mintLimit = stats[1] / 1e18
        let mintedAmount = stats[2] / 1e18
        let amountMintable = mintLimit > mintedAmount ? mintLimit - mintedAmount : 0

        const chargePerEpoch = stats[3] / 1e18
        const finalMintCharge = Math.min(amountMintable, chargePerEpoch)
        setChargeAmount((finalMintCharge))
        setChargeDollarAmount(chargePrice * finalMintCharge)

        const totalBondsToRepay = (stats[4] * stats[5]) / 10000 / 1e18
        setPulseRepay(totalBondsToRepay)
        setPulseRepayAmount(totalBondsToRepay * pulsePrice)

        // const bondRepayPercent = await treasuryC.bondRepayPercent.call().call()
        // console.log(bondRepayPercent / 10000)
    }

    useEffect(() => {
        if(staticPrice && chargePrice > 0) get()
    } ,[staticPrice, chargePrice])

    return {
        staticDollarAmount, staticAmount, chargeDollarAmount, chargeAmount,
        pulseRepay, pulseRepayAmount
    }
}
