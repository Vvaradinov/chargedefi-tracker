import axios, {AxiosRequestConfig} from "axios";

export const getFarmsEarnings = async(walletAddress: string, farmType: string): Promise<any> => {
    const config: AxiosRequestConfig = {
        baseURL: process.env.REACT_APP_DEV_API_URL,
        method: "get",
        url: "farms-earnings",
        params: {
            wallet_address: walletAddress,
            farm_type: farmType
        }
    }
    const response = await axios(config);
    return response.data;
}



