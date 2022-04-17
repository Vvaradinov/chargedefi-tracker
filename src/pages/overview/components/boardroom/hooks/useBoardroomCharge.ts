import {useEffect, useState} from "react";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";
import {useWeb3React} from "@web3-react/core";
import {getBoardroomEarnings} from "../service/boardroom.service";
import useWeb3 from "../../../../../common/hooks/useWeb3";
import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";



export const useBoardRoomCharge = () => {
    const web3 = useWeb3()
    const {account} = useWeb3React()!
    const { walletAddress } = useWalletAddress()!
    const { tokens } = useTokenPrices()!
    const { staticPrice, chargePrice } = tokens

    const [stats, setStats] = useState<any>({})

    const get = async() => {
        const response = await getBoardroomEarnings(web3, account! || walletAddress!, staticPrice, chargePrice)
        setStats(response)
    }

    useEffect(() => {
        if(staticPrice && chargePrice > 0) get()
    },[staticPrice, chargePrice])

    return {
        ...stats
    }
}
