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
        cookies.remove("addr")
        setWalletAddress(undefined)
    }

    useEffect(() => {
        if(cookies.get('accessType') === "1" && cookies.get('addr') !== undefined){
            connect(cookies.get("connector"))
        }
    }, [])

    useEffect(() => {
        if(account){
            setWalletAddress(account)
            postWalletAddress.mutate(account)
            cookies.set('addr', account, {path: '/'})
            cookies.set('accessType', 1, { path: '/' })
            cookies.set('connector', connector, {path: '/'})
        }
    }, [account])

    useDidUpdate(() => {
        if(status === "disconnected"){
            logoutWallet()
        }
    }, [status])

    useEffect(() => {
        (window as any).ethereum.on('accountsChanged', (accounts: any) => {
            setWalletAddress(accounts[0])
            postWalletAddress.mutate(accounts[0])
        })
    }, [])

    return {
        accessType, logoutWallet, setWalletAddress,
        walletAddress, onPresentConnectModal, onPresentAccountModal
    }
}
