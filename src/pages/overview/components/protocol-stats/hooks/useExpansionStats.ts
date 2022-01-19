import {
    CHARGE_ADDRESS,
    oracleAddress,
    pulseAddress,
    staticAddress,
    treasuryAddress
} from "../../../../../common/helpers/consts";
import treasuryContract from "../../../contracts/treasury.json";
import staticContract from "../../../../../common/contracts/static_abi.json";
import chargeContract from "../../../../../common/contracts/charge_abi.json";
import pulseContract from "../../../../../common/contracts/pulse_abi.json";
import oracleContract from "../../../contracts/oracle.json"
import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import {useEffect, useState} from "react";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";
import {toBN} from "../../../../../common/helpers/web3-helpers";


const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

export const useExpansionStats = () => {
    const {walletAddress} = useWalletAddress()!
    const { tokens } = useTokenPrices()!
    const { staticPrice, pulsePrice, chargePrice } = tokens

    const oracleC = new web3.eth.Contract(oracleContract, oracleAddress, {from: walletAddress}).methods
    const treasuryC = new web3.eth.Contract(treasuryContract, treasuryAddress, {from: walletAddress}).methods
    const staticC = new web3.eth.Contract(staticContract, staticAddress, {from: walletAddress}).methods
    const chargeC = new web3.eth.Contract(chargeContract, CHARGE_ADDRESS, {from: walletAddress}).methods
    const pulseC = new web3.eth.Contract(pulseContract, pulseAddress, {from: walletAddress}).methods


    const [stats, setStats] = useState<any>({})

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
            oracleC.twap(staticAddress, 1e9).call(),
        ])


        let balancesPromises: Promise<any>[] = [];
        balancesPromises.push(staticC.totalSupply().call());
        balancesPromises.push(staticC.balanceOf(treasuryAddress).call());

        balancesPromises = balancesPromises.concat(
            ["0x53D55291c12EF31b3f986102933177815DB72b3A", "0x7692bCB5F646abcdFA436658dC02d075856ac33C"].map((boardroom) =>
                staticC.balanceOf(boardroom).call())
        );

        const circulatingSupply = (await Promise.all(balancesPromises)).reduce(
            (a, b, i) => (i == 0 ? toBN(a).add(toBN(b)) : toBN(a).sub(toBN(b))),
            toBN("0")
        ) / 1e18;


        const twap = stats[6] / 1e9
        setStaticDollarAmount((twap - 1.01) * 0.1 * stats[0] / 1e18 * twap)
        let amount = (twap - 1.01) * 0.1 * circulatingSupply
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
