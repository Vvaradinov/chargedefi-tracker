import axios, {AxiosRequestConfig} from "axios";
import {defaultChain} from "../../config";

export const getFarmsEarnings = async(): Promise<any> => {
    const config: AxiosRequestConfig = {
        baseURL: process.env.REACT_APP_DEV_API_URL,
        method: "get",
        url: defaultChain.shortName === "BSC" ? "protocol-history" : "protocol-history-ftm",
    }
    const response = await axios(config);
    return response.data;
}



