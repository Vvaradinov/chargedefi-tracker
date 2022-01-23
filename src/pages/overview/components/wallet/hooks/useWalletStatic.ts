import {useEffect, useState} from "react";
import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import chargeABI from "../../../contracts/charge.json";
import staticABI from "../../../contracts/static.json"
import {
    busdAddress,
    staticAddress,
} from "../../../../../common/helpers/consts";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";
import {useAggregateWallets} from "../../../../../common/contexts/AggregateWalletsContext";

const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');


export const useWalletStatic = () => {
    const {walletAddress} = useWalletAddress()!
    const { aggregateWallets } = useAggregateWallets()!
    const { tokens } = useTokenPrices()!
    const { staticPrice, chargePrice } = tokens

    const staticContract = new web3.eth.Contract(staticABI, staticAddress, ).methods

    const [staticStats, setStaticStats] = useState<any>({})

    const get = async() => {

        const balanceCalls = aggregateWallets.map(i => staticContract.balanceOf(i).call())
        const totalBalances = await Promise.all(balanceCalls)

        let tokens
        if(aggregateWallets.length > 1) {
            tokens = totalBalances.reduce((i: any, k: any) => i / 1e18 + k / 1e18)
        } else {
            tokens = await balanceCalls[0] / 1e18
        }

        const value =  tokens * staticPrice

        setStaticStats({
            tokens: tokens,
            value: value.toFixed(2),
        })

    }

    useEffect(() => {
        if(staticPrice && chargePrice > 0) get()
    },[staticPrice, chargePrice])

    return {
        staticStats,
    }
}
