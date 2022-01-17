import {useEffect, useState} from "react";
import {useWalletAddress} from "../contexts/WalletAddressContext";
import {useMutation} from "react-query";
import * as api from "../api/api"



export const useWalletProvider = (account: string|null) => {

    // const {isOpen, onOpen, onClose} = useDisclosure()
    const {walletAddress, setWalletAddress} = useWalletAddress()!;

    // const wallet = localStorage.getItem("wallet")

    const postWalletAddress = useMutation("postAddress", api.postWalletAddress)

    const recordWalletAddress = async (walletAddress: string) => {
        await postWalletAddress.mutateAsync(walletAddress)
    }

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

    // useEffect(() => {

    //     // invoke method on bsc e.g.
    //     checkIfWalletConnected()
    // }, [wallet])
    //
    // const checkIfWalletConnected = async() => {
    //     if(wallet) {
    //         const {BinanceChain} = window as any
    //         const {ethereum} = window as any
    //         if(ethereum || BinanceChain) {
    //             switch (wallet) {
    //                 case "metamask":
    //                     await reconnectWallet(ethereum)
    //                     break;
    //                 case "binance":
    //                     await reconnectWallet(BinanceChain)
    //                     break;
    //             }
    //         }
    //     } else {}
    // }
    //
    // const reconnectWallet = async(walletProvider: any) => {
    //     if (!walletProvider) {
    //         console.log("Make sure you to have a wallet provider!")
    //         return;
    //     }
    //     // Check if we're authorized to access the user's wallet
    //     const accounts = await walletProvider.request({ method: 'eth_accounts' });
    //     if (accounts.length !== 0) {
    //         const account = accounts[0];
    //         console.log("Found an authorized account:", account);
    //         setWalletAddress(account)
    //     } else {
    //         console.log("nothing found")
    //     }
    // }
    //
    // const onConnectWallet = async (walletProvider: string) => {
    //     switch (walletProvider){
    //         case "Binance Chain Wallet":
    //             await _connectBinanceWallet()
    //             break;
    //         case "Metamask":
    //             await _connectMetamaskWallet()
    //             break;
    //         default:
    //             break;
    //     }
    // }
    //
    // const _connectMetamaskWallet = async() => {
    //     const { ethereum  } = window as any
    //     try {
    //         if (!ethereum) {
    //             return;
    //         }
    //         const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    //         setWalletAddress(accounts[0]);
    //         postWalletAddress.mutate(accounts[0])
    //         localStorage.setItem("wallet", "metamask")
    //         onClose()
    //     } catch (error) {
    //         // console.log(error)
    //         alert("An error occurred connecting your wallet");
    //     }
    // }
    //
    // const _connectBinanceWallet = async() => {
    //     const { BinanceChain  } = window as any
    //     try {
    //         if (!BinanceChain) {
    //             return;
    //         }
    //         const accounts = await BinanceChain.request({ method: "eth_requestAccounts" });
    //         setWalletAddress(accounts[0]);
    //         postWalletAddress.mutate(accounts[0])
    //         localStorage.setItem("wallet", "binance")
    //         onClose()
    //     } catch (error) {
    //         // console.log(error)
    //         alert("An error occurred connecting your wallet");
    //     }
    // }

    return {
        recordWalletAddress, setWalletAddress
    }
}
