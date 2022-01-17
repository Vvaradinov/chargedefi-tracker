import {useEffect, useState} from "react";
import {Cookies} from "react-cookie";
import {stringToBoolean} from "../../../common/helpers/util";

const cookies = new Cookies();

export const useIncludeTrackers = () => {
    const [includeBasic, setIncludeBasic] = useState<boolean>(true);
    const [includeExpansionDebt, setIncludeExpansionDebt] = useState<boolean>(true)
    const [includeWallet, setIncludeWallet] = useState<boolean>(true);
    const [includeBeefy, setIncludeBeefy] = useState<boolean>(true);
    const [includeFarms, setIncludeFarms] = useState<boolean>(true);
    const [includeBoardroom, setIncludeBoardroom] = useState<boolean>(true);


    useEffect(() => {

        setIncludeBasic(stringToBoolean(cookies.get('includeBasic')))
        setIncludeExpansionDebt(stringToBoolean(cookies.get('includeExpansionDebt')))
        setIncludeWallet(stringToBoolean(cookies.get('includeWallet')))
        setIncludeBeefy(stringToBoolean(cookies.get('includeBeefy')))
        setIncludeFarms(stringToBoolean(cookies.get('includeFarms')))
        setIncludeBoardroom(stringToBoolean(cookies.get('includeBoardroom')))

        cookies.set('includeBasic', true)
        cookies.set('includeExpansionDebt', true)
        cookies.set('includeWallet', true)
        cookies.set('includeBeefy', true)
        cookies.set('includeFarms', true)
        cookies.set('includeBoardroom', true)

    }, [])

    useEffect(() => {
        cookies.set('includeBasic', includeBasic)
        cookies.set('includeExpansionDebt', includeExpansionDebt)
        cookies.set('includeWallet', includeWallet)
        cookies.set('includeBeefy', includeBeefy)
        cookies.set('includeFarms', includeFarms)
        cookies.set('includeBoardroom', includeBoardroom)

    }, [includeBasic, includeExpansionDebt, includeBeefy, includeFarms, includeBoardroom])

    return {
        includeBasic, includeExpansionDebt, includeBeefy, includeFarms, includeBoardroom, includeWallet,
        setIncludeBasic, setIncludeExpansionDebt, setIncludeBeefy, setIncludeFarms, setIncludeBoardroom, setIncludeWallet
    }
}
