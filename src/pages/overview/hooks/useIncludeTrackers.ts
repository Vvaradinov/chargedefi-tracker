import {useEffect, useState} from "react";
import {Cookies} from "react-cookie";
import {stringToBoolean} from "../../../common/helpers/util";

const cookies = new Cookies();

export const useIncludeTrackers = () => {
    const [includeBasic, setIncludeBasic] = useState<boolean>();
    const [includeExpansionDebt, setIncludeExpansionDebt] = useState<boolean>()
    const [includeWallet, setIncludeWallet] = useState<boolean>();
    const [includeBeefy, setIncludeBeefy] = useState<boolean>();
    const [includeFarms, setIncludeFarms] = useState<boolean>();
    const [includeBoardroom, setIncludeBoardroom] = useState<boolean>();


    useEffect(() => {
        const address = cookies.get('walletAddress')
        if(!address){
            setIncludeBasic(true)
            setIncludeExpansionDebt(true)
            setIncludeWallet(true)
            setIncludeBoardroom(true)
            setIncludeBeefy(false)
            setIncludeFarms(false)
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
        cookies.set('includeBasic', includeBasic)
        cookies.set('includeExpansionDebt', includeExpansionDebt)
        cookies.set('includeWallet', includeWallet)
        cookies.set('includeBeefy', includeBeefy)
        cookies.set('includeFarms', includeFarms)
        cookies.set('includeBoardroom', includeBoardroom)
    }, [includeBasic, includeWallet, includeExpansionDebt, includeBeefy, includeFarms, includeBoardroom])

    return {
        includeBasic, includeExpansionDebt, includeBeefy, includeFarms, includeBoardroom, includeWallet,
        setIncludeBasic, setIncludeExpansionDebt, setIncludeBeefy, setIncludeFarms, setIncludeBoardroom, setIncludeWallet
    }
}
