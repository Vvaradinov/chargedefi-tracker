import {useEffect, useState} from "react";
import {useWalletAddress} from "../contexts/WalletAddressContext";
import {useMutation} from "react-query";
import * as api from "../api/api"
import {useWalletModal} from "@pancakeswap-libs/uikit";
import {useWallet} from "@binance-chain/bsc-use-wallet";
import {useDidUpdate} from "./useDidUpdate";
import {Cookies} from "react-cookie";


const cookies = new Cookies()
export const useWalletProvider = () => {
    const accessType = cookies.get("accessType")
    const {walletAddress, setWalletAddress} = useWalletAddress()!;
    const { account, connect, reset, error, status, connector } = useWallet();
    const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
        connect,
        reset,
        walletAddress
    );
    const postWalletAddress = useMutation("postAddress", api.postWalletAddress)

    const logoutWallet = () => {
        cookies.remove("walletAddress")
        setWalletAddress(undefined)
    }
    console.log(status)
    console.log(error)
    useEffect(() => {
        if(cookies.get('accessType') === "1" && cookies.get('walletAddress') !== undefined && status === "disconnected"){
            connect(cookies.get("walletType"))
        }
    }, [])

    useEffect(() => {
        if(account){
            setWalletAddress(account)
            postWalletAddress.mutate(account)
            cookies.set('walletAddress', account, {path: '/'})
            cookies.set('accessType', 1, { path: '/' })
            cookies.set('walletType', connector, {path: '/'})
        }
    }, [account])

    useDidUpdate(() => {
        switch (status){
            case "disconnected":
                logoutWallet()
                break;
        }
    }, [status])

    useEffect(() => {
        (window as any).ethereum.on('accountsChanged', (accounts: any) => {
            setWalletAddress(accounts[0])
            postWalletAddress.mutate(accounts[0])
        })
    }, [])


    return {
        accessType, logoutWallet, setWalletAddress, status,
        walletAddress, onPresentConnectModal, onPresentAccountModal
    }
}
