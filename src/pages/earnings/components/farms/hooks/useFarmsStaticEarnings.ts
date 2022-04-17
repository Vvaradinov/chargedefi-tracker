import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import {useQuery} from "react-query";
import * as api from "../api";
import {useWeb3React} from "@web3-react/core";


export const useFarmsStaticEarnings = () => {
    const {account: walletAddress} = useWeb3React()!

    const { data, isLoading, error, isError } = useQuery("getFarmsStaticEarnings",
        () => api.getFarmsEarnings(walletAddress!, "static"))

    return {
        data, isLoading, error, isError
    }
}
