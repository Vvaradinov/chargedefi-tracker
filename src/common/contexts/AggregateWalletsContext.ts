import {createContext, useContext} from "react";


export type AggregateWallets = {
    aggregateWallets: Array<string>
    setAggregateWallets: (newWallets: Array<string>|undefined) => void
}

export const AggregateWalletsContext = createContext<AggregateWallets|null>(null);
export const useAggregateWallets = () => useContext<AggregateWallets|null>(AggregateWalletsContext);
