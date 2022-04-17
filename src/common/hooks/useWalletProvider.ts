import {useEffect, useState} from "react";
import {useWalletAddress} from "../contexts/WalletAddressContext";
import {useMutation} from "react-query";
import * as api from "../api/api"
import {ConnectorNames, useWalletModal} from "@pancakeswap-libs/uikit";
import {useDidUpdate} from "./useDidUpdate";
import {useWeb3React} from "@web3-react/core";
import useAuth from "./useAuth";
import {isAddress} from "../helpers/web3-helpers";
import {useToast} from "@chakra-ui/react";
import {getSavedChain, getWalletCookie, removeWalletCookie, setWalletCookie} from "../../service/chain_cookie.service";
import {connectorsByName} from "../utils/web3React";
import {cookies} from "../helpers/util";

export const useWalletProvider = () => {
    const toast = useToast()
    const { walletAddress, setWalletAddress} = useWalletAddress()!
    const {account: wallet, active, activate} = useWeb3React()
    const {login, logout} = useAuth()
    const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, wallet!)

    const postWalletAddress = useMutation("postAddress", api.postWalletAddress)

    const isEmpty = Object.keys(walletAddress).length === 0;
    const [accessType, setAccessType] = useState("1")
    const [addr, setAddr] = useState<string>()


    useEffect(() => {
        setAccessType(cookies.get("access_type"))
        if(getWalletCookie() !== undefined) {
            setWalletAddress(getWalletCookie())
        }
    },[])


    const logoutWallet = () => {
        removeWalletCookie()
        setWalletAddress({} as any)
    }
    const onSubmit = () => {
        if(isAddress(addr!)){
            postWalletAddress.mutate(addr!)
            setWalletCookie(addr!)
            setWalletAddress(addr!)
            cookies.set('access_type', 2);
            setAccessType("2")
        } else {
            toast({
                title: "Invalid address",
                description: "Please provide a wallet BSC address",
                status: "error",
                duration: 6000,
                isClosable: true
            })
        }
    }


    // useEffect(() => {
    //     if(cookies.get('accessType') === "1" && cookies.get('walletAddress') !== undefined && status === "disconnected"){
    //         connect(cookies.get("walletType"))
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     if(account){
    //         postWalletAddress.mutate(account)
    //         cookies.set('walletAddress', account, cookiesOptions)
    //         cookies.set('accessType', 1, cookiesOptions)
    //         cookies.set('walletType', connector, cookiesOptions)
    //     }
    // }, [account])

    useDidUpdate(() => {
        if(active){
            setWalletAddress(wallet!)
            setWalletCookie(wallet!)
        } else {
            if(getSavedChain() === undefined || getSavedChain() === "bsc") {
                setWalletAddress({} as any)
                console.log("HERE")
                cookies.remove("bsc_wallet")
            }
        }
    }, [active])


    // TODO: Consider if this really is needed
    useEffect(() => {
        (window as any).ethereum.on('accountsChanged', (accounts: any) => {
            setWalletCookie(accounts[0])
            setWalletAddress(accounts[0])
            postWalletAddress.mutate(accounts[0])
        })
    }, [])


    return {
        addr, setAddr, accessType, setAccessType, onSubmit,
        logoutWallet, wallet, isEmpty, walletAddress, onPresentConnectModal, onPresentAccountModal
    }
}
