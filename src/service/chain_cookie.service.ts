import {cookies} from "../common/helpers/util";


export const getSavedChain = () => {
    return cookies.get("currentChain")
}

export const removeWalletCookie = () => {
    if(getSavedChain() === "BSC" || getSavedChain() === undefined){
        cookies.remove("bsc_wallet")
    } else {
        cookies.remove("ftm_wallet")
    }
}

export const setWalletCookie = (addr: string) => {
    if(getSavedChain() === "BSC" || getSavedChain() === undefined){
        cookies.set("bsc_wallet", addr)
    } else {
        cookies.set("ftm_wallet", addr)
    }
}

export const getWalletCookie = () => {
    if(getSavedChain() === "BSC" || getSavedChain() === undefined){
        return cookies.get("bsc_wallet")
    } else {
        return cookies.get("ftm_wallet")
    }
}


export const setChain = (chain: string) => {
    cookies.set("currentChain", chain)
    document.location.reload()
}
