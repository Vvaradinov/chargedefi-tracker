import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import {useQuery} from "react-query";
import * as api from "../api";
import {useWeb3React} from "@web3-react/core";


export const useBoardroomChargeEarnings = () => {
    const {account} = useWeb3React()!
    const { walletAddress } = useWalletAddress()!


    const { data, isLoading, error, isError } = useQuery("getBoardroomChargeEarnings",
        () => api.getBoardroomEarnings(walletAddress! || account!, "True"))

    return {
        data, isLoading, error, isError
    }
}
