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

    const {walletAddress, setWalletAddress} = useWalletAddress()!;

    const { account, connect, reset, error, status, connector } = useWallet();
    const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
        connect,
        reset,
        walletAddress
    );
    const postWalletAddress = useMutation("postAddress", api.postWalletAddress)

    useDidUpdate(() => {
        if(walletAddress && cookies.get('isWallet') === "false"){
            connect('bsc')
        }
    },[walletAddress])


    useEffect(() => {
        if(account){
            setWalletAddress(account)
            postWalletAddress.mutate(account)
        } else {
            setWalletAddress(undefined)
        }
    }, [account])

    useEffect(() => {
        (window as any).ethereum.on('accountsChanged', (accounts: any) => {
            setWalletAddress(accounts[0])
            postWalletAddress.mutate(accounts[0])
        })
    }, [])


    return {
        walletAddress, onPresentConnectModal, onPresentAccountModal
    }
}
