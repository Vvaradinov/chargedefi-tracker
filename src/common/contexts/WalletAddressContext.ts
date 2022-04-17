import {createContext, useContext} from "react";


export type WalletAddress = {
    walletAddress: string
    setWalletAddress: (newWalletAddr: string|undefined) => void
}

export const WalletAddressContext = createContext<WalletAddress|undefined>(undefined);
export const useWalletAddress = () => useContext<WalletAddress|undefined>(WalletAddressContext);
