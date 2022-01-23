import {useWalletAddress} from "../contexts/WalletAddressContext";
import {useEffect, useState} from "react";
import {useToast} from "@chakra-ui/react";
import {useMutation} from "react-query";
import * as api from "../api/api";
import {isAddress} from "../helpers/web3-helpers";
import Cookies from "universal-cookie";
import {useAggregateWallets} from "../contexts/AggregateWalletsContext";

const cookies = new Cookies();
const cookiesOptions = { path: '/', maxAge: 2592000 };

export const useConnectDapp = () => {
    const { setWalletAddress } = useWalletAddress()!
    const { setAggregateWallets } = useAggregateWallets()!
    const toast = useToast()
    const postWalletAddress = useMutation("postAddress", api.postWalletAddress)

    const [wallets, setWallets] = useState<Array<string>>([""])

    useEffect(() => {
        console.log(cookies.get("aggregateWallets"))
        if (cookies.get('aggregateWallets') !== undefined) {
            setAggregateWallets(cookies.get("aggregateWallets"))
            // setWalletAddress(cookies.get('walletAddress'));
        }
    },[])

    const onSubmit = () => {
        let areValid = true
        wallets.forEach(wallet => {
            if(!isAddress(wallet)){
                toast({
                    title: "One or more invalid addresses",
                    description: "Please provide a wallet BSC address",
                    status: "error",
                    duration: 6000,
                    isClosable: true
                })
                areValid = false
            }
        })
        if(areValid){
            setAggregateWallets(wallets)
            cookies.set('accessType', 2, cookiesOptions);
            cookies.set('aggregateWallets', wallets, cookiesOptions)
        }
    }

    const onAddNewWallet = () => {
        setWallets(wallets => [...wallets, ""])
    }

    const onRemoveWallet = (key: number) => {
        console.log(key)
        const walletsCopy = [...wallets]
        walletsCopy.splice(key, 1)
        console.log(walletsCopy)
        setWallets(walletsCopy)
    }

    const onUpdateWallets = (walletAddress: string, key: number) => {
        const walletsCopy = [...wallets]
        walletsCopy[key] = walletAddress
        setWallets(walletsCopy)
    }


    return {
        onAddNewWallet, onUpdateWallets, onRemoveWallet, onSubmit,
        wallets, areWallets: !wallets.includes("")
    }
}
