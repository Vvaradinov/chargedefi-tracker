import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import {useQuery} from "react-query";
import * as api from "../api";


export const useBoardroomChargeEarnings = () => {
    const { walletAddress } = useWalletAddress()!

    const { data, isLoading, error, isError } = useQuery("getBoardroomChargeEarnings",
        () => api.getBoardroomEarnings(walletAddress, "True"))

    return {
        data, isLoading, error, isError
    }
}
