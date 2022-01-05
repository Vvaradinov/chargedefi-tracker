import {CHARGE_ADDRESS, pulseAddress, staticAddress, treasuryAddress} from "../../../../../common/helpers/consts";
import treasuryContract from "../../../contracts/treasury.json";
import staticContract from "../../../../../common/contracts/static_abi.json";
import chargeContract from "../../../../../common/contracts/charge_abi.json";
import pulseContract from "../../../../../common/contracts/pulse_abi.json";

import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import {fromWei, toBN} from "../../../../../common/helpers/web3-helpers";
import {formatUS} from "../../../../../common/helpers/formating";
import {useEffect, useState} from "react";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";


const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

export const useExpansionStats = () => {
    const {walletAddress} = useWalletAddress()!
    const { tokens } = useTokenPrices()!
    const { staticPrice, pulsePrice, chargePrice } = tokens

    const treasuryC = new web3.eth.Contract(treasuryContract, treasuryAddress, {from: walletAddress})
    const staticC = new web3.eth.Contract(staticContract, staticAddress, {from: walletAddress})
    const chargeC = new web3.eth.Contract(chargeContract, CHARGE_ADDRESS, {from: walletAddress})
    const pulseC = new web3.eth.Contract(pulseContract, pulseAddress, {from: walletAddress})


    const [staticDollarAmount, setStaticDollarAmount] = useState<number>()
    const [staticAmount, setStaticAmount] = useState<any>()
    const [chargeDollarAmount, setChargeDollarAmount] = useState<number>()
    const [chargeAmount, setChargeAmount] = useState<any>()
    const [pulseRepay, setPulseRepay] = useState<any>()
    const [pulseRepayAmount, setPulseRepayAmount] = useState<any>()

    const get = async () => {
        staticC.methods.totalSupply().call().then((i:any) => {
            setStaticDollarAmount((staticPrice - 1.01) * 0.1 * parseInt(fromWei(i)) * staticPrice)
            let amount = (staticPrice - 1.01) * 0.1 * parseInt(fromWei(i))
            setStaticAmount(formatUS(amount))

        })
        let mintLimit = toBN(await chargeC.methods.mintLimitOf(treasuryAddress).call())
        let mintedAmount = toBN(await chargeC.methods.mintedAmountOf(treasuryAddress).call())
        let amountMintable = mintLimit > mintedAmount ? mintLimit.sub(mintedAmount) : 0
        const chargePerEpoch = fromWei(await treasuryC.methods.sharesMintedPerEpoch.call().call())
        const finalMintCharge = Math.min(amountMintable, chargePerEpoch)
        setChargeAmount(formatUS(finalMintCharge))
        setChargeDollarAmount(chargePrice * finalMintCharge)

        const totalBondsToRepay = toBN(await pulseC.methods.totalSupply().call())
            .mul(toBN(await treasuryC.methods.bondDepletionFloorPercent.call().call()))
            .div(toBN(10000))
        setPulseRepay(parseInt(fromWei(totalBondsToRepay)))
        setPulseRepayAmount(fromWei(totalBondsToRepay) * pulsePrice)

    }

    useEffect(() => {
        if(staticPrice && chargePrice > 0) get()
    } ,[staticPrice, chargePrice])

    return {
        staticDollarAmount, staticAmount, chargeDollarAmount, chargeAmount,
        pulseRepay, pulseRepayAmount
    }
}
