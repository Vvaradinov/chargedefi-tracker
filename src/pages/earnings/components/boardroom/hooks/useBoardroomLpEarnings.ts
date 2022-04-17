import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import {useQuery} from "react-query";
import * as api from "../api"
import {useWeb3React} from "@web3-react/core";


export const useBoardroomLpEarnings = () => {
    const {account} = useWeb3React()!
    const { walletAddress } = useWalletAddress()!

    const { data, isLoading, error, isError } = useQuery("getBoardroomLpEarnings",
        () => api.getBoardroomEarnings(walletAddress! || account!, "False"))

    return {
        data, isLoading, error, isError
    }
}
