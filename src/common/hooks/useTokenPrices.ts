import {getTokenPricesMulticall} from "../../service/token_prices.service";
import {useEffect, useMemo, useState} from "react";
import useWeb3 from "./useWeb3";


export const useTokenPrices = () => {
    const web3 = useWeb3()

    const [tokens, setTokens] = useState<any>({})
    const providedTokens = useMemo<any>(() => ({tokens, setTokens}), [tokens, setTokens])

    const getTokenPrices = async () => {
        const response = await getTokenPricesMulticall(web3)
        setTokens(response)
    }

    useEffect(() => {
        getTokenPrices()
        setInterval(() => getTokenPrices(), 300000)
    }, [])


    return {
        tokens,
        providedTokens
    }

}
