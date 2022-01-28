import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import {useEffect, useReducer} from "react";
import boardRoomContract from "../../../contracts/charge-boardroom.json";
import {
    chargeBoardroomAddress,
    oracleAddress,
    staticAddress,
    treasuryAddress
} from "../../../../../common/helpers/consts";
import treasuryContract from "../../../contracts/treasury.json";
import staticContract from "../../../../../common/contracts/static_abi.json";
import {fromWei} from "../../../../../common/helpers/web3-helpers";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";
import oracleContract from "../../../contracts/oracle.json";


const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');


const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "updateState":
            return {...state, [action.name]: action.value}
        default:
            return {...state}
    }
}

function format(value: number) {
    return new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD' }).format(value)
}

export const useProtocolStats = () => {
    const {walletAddress} = useWalletAddress()!
    const {tokens} = useTokenPrices()!
    const { staticPrice, } = tokens

    const initialState ={
        epoch: null,
        epochUnderOne: null,
        nextEpochDate: null,
        timer: null,
        twap: null
    }
    const initState = () => { return initialState}

    const [state, dispatch] = useReducer(reducer, initialState, initState)

    // Contract objects
    const boardroomC = new web3.eth.Contract(boardRoomContract, chargeBoardroomAddress, {from: walletAddress}).methods
    const treasuryC = new web3.eth.Contract(treasuryContract, treasuryAddress, {from: walletAddress}).methods
    const oracleC = new web3.eth.Contract(oracleContract, oracleAddress, {from: walletAddress}).methods


    const get = async() => {
        boardroomC.epoch().call().then((epoch:number) =>
            dispatch({type:"updateState", name:"epoch", value: epoch}))
        boardroomC.nextEpochPoint().call().then((nextEpoch:number) =>
            dispatch({type:"updateState", name:"nextEpochDate", value:new Date(nextEpoch * 1e3)}))
        treasuryC.epochsUnderOne.call().call().then((i:any) =>
            dispatch({type: "updateState", name: "epochUnderOne", value: i}))
        oracleC.twap(staticAddress, 1e9).call().then((i:any) => {
            dispatch({type: "updateState", name: "twap", value: i / 1e9})
        })
    }

    const countdown = () => {
        setInterval(() => {
            if (state.nextEpochDate !== null) {
                let now = new Date().getTime()
                let distance = state.nextEpochDate.getTime() - now
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                dispatch({
                    type:"updateState",
                    name:"timer",
                    value:`0${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}`: seconds}`
                })

                if(distance < 0){
                   document.location.reload()
                }
            }
        }, 1000)

    }

    useEffect(() => {
        const interval = setInterval(() => {
            oracleC.twap(staticAddress, 1e9).call().then((i:any) => {
                dispatch({type: "updateState", name: "twap", value: i / 1e9})
            })
        }, 10000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        if(state.nextEpochDate !== null){
            countdown()
        }
    }, [state.nextEpochDate])

    useEffect(() => {
        get()
    }, [staticPrice])

    return {
        ...state
    }
}
