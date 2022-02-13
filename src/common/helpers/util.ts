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
            return "https://www.chargedefi.fi/static/media/charge-wb.2725bf56.png"
        case "static":
            return "https://www.chargedefi.fi/static/media/static-wb.110b300e.png"
        case "pulse":
            return "https://www.chargedefi.fi/static/media/pulse.d06a42ec.png"
        case "static-busd":
            return "https://www.chargedefi.fi/static/media/static-busd-wb.68f012c0.png"
        case "charge-busd":
            return "https://www.chargedefi.fi/static/media/charge-busd-wb.c7aa4cac.png"
    }
}
