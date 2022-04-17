import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import {defaultChain} from "../../config";
import {Cookies} from "react-cookie";


export const cookies = new Cookies()
export const cookiesOptions = { path: '/', maxAge: 2592000 };

dayjs.extend(utc)
dayjs.extend(tz)
export const timeZone = dayjs.tz.guess()


export const stringToBoolean = (string: string) => string === 'false' ? false : !!string

export const interval30 = (fn: any) => {
    setInterval(() => fn(), 5000)
}

export const getTokenUrl = (token: string) => {
    const chain = defaultChain.shortName
    switch (chain){
        case "BSC":
            switch (token){
                case "charge":
                    return require("../assets/tokens/charge-bsc.svg").default
                case "static":
                    return require("../assets/tokens/static-bsc.svg").default
                case "pulse":
                    return "https://www.chargedefi.fi/static/media/pulse.d06a42ec.png"
                case "static-busd":
                    return require("../assets/tokens/static-busd.svg").default
                case "charge-busd":
                    return require("../assets/tokens/charge-busd.svg").default
            }
        break;
        case "FTM":
            switch (token){
                case "charge":
                    return require("../assets/tokens/charge-ftm.svg").default
                case "static":
                    return require("../assets/tokens/static-ftm.svg").default
                case "static-busd":
                    return require("../assets/tokens/static-usdc.svg").default
                case "charge-busd":
                    return require("../assets/tokens/charge-usdc.svg").default
            }
        break
    }


}
