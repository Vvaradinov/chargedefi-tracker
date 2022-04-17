import {useEffect, useState} from "react";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";
import {getExpansionStats} from "../service/expansion.service";
import useWeb3 from "../../../../../common/hooks/useWeb3";



export const useExpansionStats = () => {
    const web3 = useWeb3()
    const { tokens } = useTokenPrices()!
    const { staticPrice, pulsePrice, chargePrice } = tokens

    const [stats, setStats] = useState<any>({})

    const get = async () => {
        const response = await getExpansionStats(web3, pulsePrice, chargePrice, staticPrice)
        setStats(response)
    }

    useEffect(() => {
        if(staticPrice && chargePrice > 0) get()
    } ,[staticPrice, chargePrice])

    return {
        ...stats
    }
}
