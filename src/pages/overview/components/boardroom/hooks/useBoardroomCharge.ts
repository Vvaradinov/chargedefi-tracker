import {useEffect, useState} from "react";
import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import boarRoomABI from "../../../contracts/charge-boardroom.json";
import treasuryABI from "../../../contracts/treasury.json"
import {
    busdAddress,
    CHARGE_ADDRESS,
    chargeBoardroomAddress,
    staticAddress,
    treasuryAddress
} from "../../../../../common/helpers/consts";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";

const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');


export const useBoardRoomCharge = () => {
    const {walletAddress} = useWalletAddress()!
    const { tokens } = useTokenPrices()!
    const { staticPrice, chargePrice } = tokens

    const boardRoomContract = new web3.eth.Contract(boarRoomABI, chargeBoardroomAddress, {from: walletAddress}).methods
    const treasuryContract = new web3.eth.Contract(treasuryABI,treasuryAddress, {from: walletAddress}).methods

    const [stats, setStats] = useState<any>({})

    const get = async() => {

        const stats = await Promise.all([
            boardRoomContract.earned(walletAddress).call(),
            boardRoomContract.balanceOf(walletAddress).call(),
            boardRoomContract.totalSupply().call(),
            treasuryContract.PERIOD().call(),
            boardRoomContract.latestSnapshotIndex().call()

        ])

        const earned = stats[0]
        const balanceOfCharge = stats[1]
        const tvl = (stats[2] / 1e18) * chargePrice

        const period = stats[3] / 3600
        const latestSnapshotIndex = stats[4]
        const lastHistory = await boardRoomContract.boardHistory(latestSnapshotIndex).call()
        const lastRewards0PerShare = lastHistory[2];
        const lastRewards1PerShare = lastHistory[4];

        const prevHistory = (await boardRoomContract.boardHistory(latestSnapshotIndex-1).call());
        const prevRewards0PerShare = prevHistory[2];
        const prevRewards1PerShare = prevHistory[4];
        const epochRewards0PerShare = (lastRewards0PerShare - prevRewards0PerShare) / 1e18;
        const epochRewards1PerShare = (lastRewards1PerShare - prevRewards1PerShare) / 1e18;

        const rewards0PerYear = epochRewards0PerShare*(24/period)*365*staticPrice;
        const rewards1PerYear = epochRewards1PerShare*(24/period)*365*chargePrice;
        const apr = (rewards0PerYear + rewards1PerYear) *100 / chargePrice;

        const tokens = (balanceOfCharge / 1e18)
        const value = ((balanceOfCharge / 1e18) * chargePrice)
        const earnedTokens = (earned[0] / 1e18)
        const earnedValue = ((earned[0] / 1e18) * staticPrice)
        const daily = apr / 365

        setStats({
            tvl: tvl.toFixed(0),
            tokens: tokens,
            value: value.toFixed(2),
            earnedTokens:earnedTokens,
            earnedValue: earnedValue,
            changeDaily: {
                percent: daily.toFixed(2),
                value: (value * (daily / 100)).toFixed(2)
            }
        })
        // console.log(new Date(await boardroomC.methods.nextEpochPoint().call() * 1e3))
    }

    useEffect(() => {
        if(staticPrice && chargePrice > 0) get()
    },[staticPrice, chargePrice])

    return {
        stats,
    }
}
