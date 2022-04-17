import {useEffect, useState} from "react";
import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import beefyStaticABI from "../contracts/beefy-static-abi.json"
import beefyChargeABI from "../contracts/beefy-charge-abi.json"
import {BEEFY_CHARGE_ADDRESS, BEEFY_STATIC_ADDRESS} from "../../../../../common/helpers/consts";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";
import {useWeb3React} from "@web3-react/core";


const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');


export const useBeefyVault = () => {

    const {account} = useWeb3React()!
    const {walletAddress} = useWalletAddress()!
    const { tokens } = useTokenPrices()!
    const [staticVault, setStaticVault] = useState<any>({})
    const [chargeVault, setChargeVault] = useState<any>({})


    const getBeefyVaults = async() => {
        const staticContract = new web3.eth.Contract(beefyStaticABI, BEEFY_STATIC_ADDRESS, {from: walletAddress || account})
        const chargeContract = new web3.eth.Contract(beefyChargeABI, BEEFY_CHARGE_ADDRESS, {from:  walletAddress || account})

        const stats = await Promise.all([
            staticContract.methods.getPricePerFullShare().call(),
            staticContract.methods.balanceOf( walletAddress || account).call(),
            chargeContract.methods.getPricePerFullShare().call(),
            chargeContract.methods.balanceOf( walletAddress || account).call()

        ])

        const staticLPBalance = stats[0] / 1e18 * stats[1] / 1e18
        const chargeLPBalance = stats[2] / 1e18 * stats[3] / 1e18

        const beefy = await fetch("https://api.beefy.finance/apy/breakdown").then(r => {
            try {return r.json()} catch (e){return undefined}
        })


        const staticDaily = beefy["charge-static-busd"].vaultApr * 100 / 365
        const chargeDaily = beefy["charge-charge-busd"].vaultApr * 100 / 365
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
    }, [tokens, walletAddress, account])

    return {
        chargeVault, staticVault
    }
}
