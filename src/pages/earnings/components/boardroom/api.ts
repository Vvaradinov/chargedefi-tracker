import axios, {AxiosRequestConfig} from "axios";

export const getBoardroomEarnings = async(walletAddress: string, isSingleToken: string): Promise<any> => {
    const config: AxiosRequestConfig = {
        baseURL: process.env.REACT_APP_DEV_API_URL,
        method: "get",
        url: "boardroom-earnings",
        params: {
            wallet_address: walletAddress,
            is_single_token: isSingleToken
        }
    }
    const response = await axios(config);
    return response.data;
}



