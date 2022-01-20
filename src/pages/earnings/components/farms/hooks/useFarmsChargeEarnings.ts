import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import {useQuery} from "react-query";
import * as api from "../api";


export const useFarmsChargeEarnings = () => {
    const { walletAddress } = useWalletAddress()!

    const { data, isLoading, error, isError } = useQuery("getFarmsChargeEarnings",
        () => api.getFarmsEarnings(walletAddress, "charge"))

    return {
        data, isLoading, error, isError
    }
}
