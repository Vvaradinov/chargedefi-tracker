import {useEffect, useState} from "react";
import {useWalletAddress} from "../contexts/WalletAddressContext";
import {useMutation} from "react-query";
import * as api from "../api/api"
import {useWalletModal} from "@pancakeswap-libs/uikit";
import {useWallet} from "@binance-chain/bsc-use-wallet";
import {useDidUpdate} from "./useDidUpdate";
import {Cookies} from "react-cookie";
import {useAggregateWallets} from "../contexts/AggregateWalletsContext";


const cookies = new Cookies()
const cookiesOptions = { path: '/', maxAge: 2592000 };

export const useWalletProvider = () => {
    const accessType = cookies.get("accessType")
    const {walletAddress, setWalletAddress} = useWalletAddress()!;
    const { aggregateWallets, setAggregateWallets} = useAggregateWallets()!
    const { account, connect, reset, error, status, connector } = useWallet();
    const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
        connect,
        reset,
        walletAddress
    );
    const postWalletAddress = useMutation("postAddress", api.postWalletAddress)

    const logoutWallet = () => {
        cookies.remove("aggregateWallets")
        setAggregateWallets(undefined)
    }

    useEffect(() => {
        if(accessType === "1" && cookies.get('aggregateWallets') !== undefined && status === "disconnected"){
            connect(cookies.get("walletType"))
        }
    }, [])

    useEffect(() => {
        if(account){
            setAggregateWallets([account])
            postWalletAddress.mutate(account)
            cookies.set('aggregateWallets', [account], cookiesOptions)
            cookies.set('accessType', 1, cookiesOptions)
            cookies.set('walletType', connector, cookiesOptions)
        }
    }, [account])

    useDidUpdate(() => {
        switch (status){
            case "disconnected":
                logoutWallet()
                break;
        }
    }, [status])


    return {
        accessType, logoutWallet, setWalletAddress, status, aggregateWallets,
        walletAddress, onPresentConnectModal, onPresentAccountModal
    }
}
