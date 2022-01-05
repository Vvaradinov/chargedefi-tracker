import {formatUS} from "../../../../../common/helpers/formating";
import {useEffect, useState} from "react";
import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import chargeABI from "../../../contracts/charge.json";
import staticABI from "../../../contracts/static.json"
import {
    busdAddress,
    CHARGE_ADDRESS,
} from "../../../../../common/helpers/consts";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";

const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');


export const useWalletCharge = () => {
    const {walletAddress} = useWalletAddress()!
    const { tokens } = useTokenPrices()!
    const { staticPrice, chargePrice } = tokens

    const chargeContract = new web3.eth.Contract(chargeABI, CHARGE_ADDRESS, {from: walletAddress}).methods

    const [chargeStats, setChargeStats] = useState<any>({})

    const get = async() => {
        const balanceOfCharge = await chargeContract.balanceOf(walletAddress).call()
        const tvl = 0

        const tokens = formatUS(balanceOfCharge / 1e18)
        const value = ((balanceOfCharge / 1e18) * chargePrice)

        setChargeStats({
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
        chargeStats,
    }
}
