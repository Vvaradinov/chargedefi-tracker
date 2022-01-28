import axios, {AxiosRequestConfig} from "axios";

export const getFarmsEarnings = async(): Promise<any> => {
    const config: AxiosRequestConfig = {
        baseURL: process.env.REACT_APP_DEV_API_URL,
        method: "get",
        url: "protocol-history",
    }
    const response = await axios(config);
    return response.data;
}



