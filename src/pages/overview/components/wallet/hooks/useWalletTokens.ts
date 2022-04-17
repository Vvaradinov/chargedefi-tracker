import {useEffect, useState} from "react";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";
import {useWeb3React} from "@web3-react/core";
import {getTokenBalances} from "../../../../../service/token_balances.service";
import useWeb3 from "../../../../../common/hooks/useWeb3";
import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";




export const useWalletTokens = () => {
    const web3 = useWeb3()!
    const { account } = useWeb3React()!
    const { walletAddress} = useWalletAddress()!
    const { tokens } = useTokenPrices()!
    const { staticPrice, chargePrice } = tokens
    const [walletTokens, setWalletTokens] = useState<any>()


    const get = async() => {
        const response = await getTokenBalances(web3, account! || walletAddress!, staticPrice, chargePrice)
        setWalletTokens(response)
    }

    useEffect(() => {
        if(staticPrice && chargePrice > 0) get()
    },[staticPrice, chargePrice])

    return {
        ...walletTokens
    }
}
