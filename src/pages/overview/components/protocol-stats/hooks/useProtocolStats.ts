import {useEffect, useState} from "react";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";
import {getProtocolStats} from "../service/protocol.service";
import useWeb3 from "../../../../../common/hooks/useWeb3";


export const useProtocolStats = () => {
    const web3 = useWeb3()
    const {tokens} = useTokenPrices()!
    const { staticPrice, } = tokens

    const [stats, setStats] = useState<any>({
        epoch: null,
        epochsUnderOne: null,
        nextEpochPoint: null,
        twap: null
    })
    const [timer, setTimer] = useState<any>(null)

    const get = async() => {
        const response = await getProtocolStats(web3)
        setStats(response)
    }

    // Epoch Timer countdown
    const countdown = () => {
        setInterval(() => {
            if (stats.nextEpochPoint !== null) {
                let now = new Date().getTime()
                let distance = stats.nextEpochPoint - now
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimer(`0${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}`: seconds}`)
                if(distance < 0){
                   document.location.reload()
                }
            }
        }, 1000)
    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         oracleC.twap(staticAddress, 1e9).call().then((i:any) => {
    //             dispatch({type: "updateState", name: "twap", value: i / 1e9})
    //         })
    //     }, 10000)
    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [])

    useEffect(() => {
        if(stats.nextEpochPoint !== null) countdown()
    }, [stats.nextEpochPoint])

    useEffect(() => {get()}, [staticPrice])

    return {
        ...stats,
        timer
    }
}
