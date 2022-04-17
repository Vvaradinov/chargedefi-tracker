import {useEffect, useState} from "react";
import {cookies, cookiesOptions, stringToBoolean} from "../../../common/helpers/util";
import {defaultChain} from "../../../config";


export const useIncludeTrackers = () => {
    const [includeBasic, setIncludeBasic] = useState<boolean>(false);
    const [includeExpansionDebt, setIncludeExpansionDebt] = useState<boolean>(false)
    const [includeWallet, setIncludeWallet] = useState<boolean>(false);
    const [includeBeefy, setIncludeBeefy] = useState<boolean>(false);
    const [includeFarms, setIncludeFarms] = useState<boolean>(false);
    const [includeBoardroom, setIncludeBoardroom] = useState<boolean>(false);

    const isBsc = defaultChain.shortName === "BSC"

    useEffect(() => {
        const address = cookies.get('walletAddress')
        if(!address){
            if(isBsc) {
                setIncludeBasic(true)
                setIncludeExpansionDebt(true)
                setIncludeWallet(true)
                setIncludeBoardroom(true)
                setIncludeBeefy(false)
                setIncludeFarms(false)
            } else {
                setIncludeFarms(true)
                setIncludeWallet(true)
            }
        } else {
            setIncludeBasic(stringToBoolean(cookies.get('includeBasic')))
            setIncludeExpansionDebt(stringToBoolean(cookies.get('includeExpansionDebt')))
            setIncludeWallet(stringToBoolean(cookies.get('includeWallet')))
            setIncludeBeefy(stringToBoolean(cookies.get('includeBeefy')))
            setIncludeFarms(stringToBoolean(cookies.get('includeFarms')))
            setIncludeBoardroom(stringToBoolean(cookies.get('includeBoardroom')))
        }
    }, [])

    useEffect(() => {
        cookies.set('includeBasic', includeBasic, cookiesOptions)
        cookies.set('includeExpansionDebt', includeExpansionDebt, cookiesOptions)
        cookies.set('includeWallet', includeWallet, cookiesOptions)
        cookies.set('includeBeefy', includeBeefy, cookiesOptions)
        cookies.set('includeFarms', includeFarms, cookiesOptions)
        cookies.set('includeBoardroom', includeBoardroom, cookiesOptions)
    }, [includeBasic, includeWallet, includeExpansionDebt, includeBeefy, includeFarms, includeBoardroom])

    return {
        isBsc,
        includeBasic, includeExpansionDebt, includeBeefy, includeFarms, includeBoardroom, includeWallet,
        setIncludeBasic, setIncludeExpansionDebt, setIncludeBeefy, setIncludeFarms, setIncludeBoardroom, setIncludeWallet
    }
}
