import {useEffect, useState} from "react";
import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import beefyStaticABI from "../contracts/beefy-static-abi.json"
import beefyChargeABI from "../contracts/beefy-charge-abi.json"
import {BEEFY_CHARGE_ADDRESS, BEEFY_STATIC_ADDRESS} from "../../../../../common/helpers/consts";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";
import {useAggregateWallets} from "../../../../../common/contexts/AggregateWalletsContext";


const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');


export const useBeefyVault = () => {

    const { walletAddress } = useWalletAddress()!
    const { aggregateWallets } = useAggregateWallets()!
    const { tokens } = useTokenPrices()!
    const [staticVault, setStaticVault] = useState<any>({})
    const [chargeVault, setChargeVault] = useState<any>({})

    const staticContract = new web3.eth.Contract(beefyStaticABI, BEEFY_STATIC_ADDRESS, ).methods
    const chargeContract = new web3.eth.Contract(beefyChargeABI, BEEFY_CHARGE_ADDRESS, ).methods


    const getBeefyVaults = async() => {
        const staticBalances = aggregateWallets.map((i:string) => staticContract.balanceOf(i).call())
        const chargeBalances = aggregateWallets.map((i:string) => chargeContract.balanceOf(i).call())

        const chainCalls = await Promise.all([
            staticContract.getPricePerFullShare().call(),
            Promise.all(staticBalances),
            chargeContract.getPricePerFullShare().call(),
            Promise.all(chargeBalances)

        ])
        const beefy = await fetch("https://api.beefy.finance/apy/breakdown").then(r => {
            try {return r.json()} catch (e){return undefined}
        })
        const staticDaily = beefy["charge-static-busd"].vaultApr * 100 / 365
        const chargeDaily = beefy["charge-charge-busd"].vaultApr * 100 / 365

        console.log(chainCalls)


        let staticLPBalance
        let chargeLPBalance

        if(aggregateWallets.length > 1){
            staticLPBalance = chainCalls[1].reduce((prev:any, curr:any) => prev / 1e18 + curr / 1e18)
            chargeLPBalance = chainCalls[3].reduce((prev:any, curr:any) => prev / 1e18 + curr / 1e18)
        } else {
            staticLPBalance = chainCalls[1][0] / 1e18 * chainCalls[1][0] / 1e18
            chargeLPBalance = chainCalls[3][0] / 1e18 * chainCalls[3][0] / 1e18
        }

        const staticDollarValue = tokens.staticLp * staticLPBalance
        const chargeDollarValue = tokens.chargeLp * chargeLPBalance



        setStaticVault({
            lp: (staticLPBalance),
            toDollar: (staticDollarValue).toFixed(2),
            dailyApr: staticDaily.toFixed(2),
            dailyChange:( staticDollarValue * staticDaily / 100).toFixed(2)
        })

        setChargeVault({
            lp: (chargeLPBalance),
            toDollar:( chargeDollarValue.toFixed(2)),
            dailyApr: chargeDaily.toFixed(2),
            dailyChange: (chargeDollarValue * chargeDaily / 100).toFixed(2)
        })

    }

    useEffect(() => {
        getBeefyVaults()
    }, [tokens, walletAddress])

    return {
        chargeVault, staticVault
    }
}
