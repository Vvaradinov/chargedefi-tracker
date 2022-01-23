import {useEffect, useState} from "react";
import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import boarRoomABI from "../../../contracts/charge-boardroom.json";
import treasuryABI from "../../../contracts/treasury.json"
import {
    chargeBoardroomAddress,
    treasuryAddress
} from "../../../../../common/helpers/consts";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";
import {useAggregateWallets} from "../../../../../common/contexts/AggregateWalletsContext";

const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');


export const useBoardRoomCharge = () => {
    const {walletAddress} = useWalletAddress()!
    const { aggregateWallets } = useAggregateWallets()!
    const { tokens } = useTokenPrices()!
    const { staticPrice, chargePrice } = tokens

    const boardRoomContract = new web3.eth.Contract(boarRoomABI, chargeBoardroomAddress, ).methods
    const treasuryContract = new web3.eth.Contract(treasuryABI,treasuryAddress, ).methods

    const [stats, setStats] = useState<any>({})

    const get = async() => {

        const earnings = aggregateWallets.map(i => boardRoomContract.earned(i).call())
        const balances = aggregateWallets.map(i => boardRoomContract.balanceOf(i).call())
        const chainCalls = await Promise.all(([
            await Promise.all(earnings),
            await Promise.all(balances),
            boardRoomContract.totalSupply().call(),
            treasuryContract.PERIOD().call(),
            boardRoomContract.latestSnapshotIndex().call()

        ]))

        let earned
        let balanceOfCharge
        if(aggregateWallets.length > 1) {
            earned = chainCalls[0].reduce((prev: any, curr: any) => prev[0] / 1e18 + curr[0] / 1e18)
            balanceOfCharge = chainCalls[1].reduce((prev: any, curr: any) => prev / 1e18 + curr / 1e18)
        } else {
            earned = chainCalls[0][0][0] / 1e18
            balanceOfCharge = chainCalls[1][0] / 1e18
        }
        const tokens = balanceOfCharge
        const value = balanceOfCharge * chargePrice
        const earnedTokens = earned
        const earnedValue = (earned) * staticPrice

        const tvl = (chainCalls[2] / 1e18) * chargePrice
        const period = chainCalls[3] / 3600
        const latestSnapshotIndex = chainCalls[4]
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
        const daily = apr / 365
        //
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
