import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import {useQuery} from "react-query";
import * as api from "../api"


export const useBoardroomLpEarnings = () => {
    const { walletAddress } = useWalletAddress()!

    const { data, isLoading, error, isError } = useQuery("getBoardroomLpEarnings",
        () => api.getBoardroomEarnings(walletAddress, "False"))

    return {
        data, isLoading, error, isError
    }
}
