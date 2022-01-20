import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import {useQuery} from "react-query";
import * as api from "../api";


export const useFarmsStaticEarnings = () => {
    const { walletAddress } = useWalletAddress()!

    const { data, isLoading, error, isError } = useQuery("getFarmsStaticEarnings",
        () => api.getFarmsEarnings(walletAddress, "static"))

    return {
        data, isLoading, error, isError
    }
}
