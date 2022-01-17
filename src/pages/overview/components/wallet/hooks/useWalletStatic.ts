import {useEffect, useState} from "react";
import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import chargeABI from "../../../contracts/charge.json";
import staticABI from "../../../contracts/static.json"
import {
    busdAddress,
    staticAddress,
} from "../../../../../common/helpers/consts";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";

const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');


export const useWalletStatic = () => {
    const {walletAddress} = useWalletAddress()!
    const { tokens } = useTokenPrices()!
    const { staticPrice, chargePrice } = tokens

    const staticContract = new web3.eth.Contract(staticABI, staticAddress, {from: walletAddress}).methods

    const [staticStats, setStaticStats] = useState<any>({})

    const get = async() => {
        const balanceOfStatic = await staticContract.balanceOf(walletAddress).call()
        const tvl = 0

        const tokens = (balanceOfStatic / 1e18)
        const value = ((balanceOfStatic / 1e18) * staticPrice)

        setStaticStats({
            tvl: tvl.toFixed(0),
            tokens: tokens,
            value: value.toFixed(2),
            earnedTokens:0,
            earnedValue: 0,
            changeDaily: {
                percent: 0,
                value: (value * (0 / 100)).toFixed(2)
            }
        })
        // console.log(new Date(await boardroomC.methods.nextEpochPoint().call() * 1e3))
    }

    useEffect(() => {
        if(staticPrice && chargePrice > 0) get()
    },[staticPrice, chargePrice])

    return {
        staticStats,
    }
}
