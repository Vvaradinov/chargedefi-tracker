import {useEffect, useState} from "react";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";
import {getFarmData} from "../service/farms.service";
import {useWeb3React} from "@web3-react/core";
import useWeb3 from "../../../../../common/hooks/useWeb3";
import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";



export const useFarms = () => {
    const web3 = useWeb3()
    const {account} = useWeb3React()!
    const { walletAddress} = useWalletAddress()!
    const { tokens } = useTokenPrices()!
    const { chargePrice, staticPrice, staticLp, chargeLp } = tokens


    const [stats, setStats] = useState<any>({})

    const get = async() => {
        const result = await getFarmData(web3, account! || walletAddress!, chargePrice, staticLp, chargeLp)
        setStats(result)
    }

    useEffect(() => {get()},[staticPrice, chargePrice])

    return {
        stats
    }
}
