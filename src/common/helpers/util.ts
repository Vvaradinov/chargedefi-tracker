import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";



dayjs.extend(utc)
dayjs.extend(tz)
export const timeZone = dayjs.tz.guess()


export const stringToBoolean = (string: string) => string === 'false' ? false : !!string

export const interval30 = (fn: any) => {
    setInterval(() => fn(), 5000)
}

export const getTokenUrl = (token: string) => {
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
}
