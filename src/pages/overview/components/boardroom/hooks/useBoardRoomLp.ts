import {useEffect, useState} from "react";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";
import {useWeb3React} from "@web3-react/core";
import {getLpBoardroomStats} from "../service/lpBoardroom.service";
import useWeb3 from "../../../../../common/hooks/useWeb3";
import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";


export const useBoardRoomLp = () => {
    const web3 = useWeb3()
    const {account} = useWeb3React()!
    const { walletAddress } = useWalletAddress()!
    const { tokens } = useTokenPrices()!
    const { staticPrice, chargePrice, staticLp } = tokens

    const [stats, setStats] = useState<any>({})

    const get = async() => {
        const response = await getLpBoardroomStats(web3, account! || walletAddress!, staticPrice, chargePrice, staticLp)
        setStats(response)
    }

    useEffect(() => {
        if(staticPrice && chargePrice > 0) get()
    },[staticPrice, chargePrice])

    return {
        ...stats
    }
}
