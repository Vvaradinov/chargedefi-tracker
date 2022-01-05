import React, {useState} from 'react';
import ProtocolStats from "./components/protocol-stats/ProtocolStats";
import ExpansionStats from "./components/protocol-stats/ExpansionStats/ExpansionStats";
import BeefyVaults from "./components/beefy-vaults/BeefyVaults";
import Farms from "./components/farms/Farms";
import Wallet from "./components/wallet/Wallet";
import UserStats from "./components/user-stats/UserStats";
import {default as BoardRoomMain} from "./components/boardroom/BoardRoom";
import {useWalletAddress} from "../../common/contexts/WalletAddressContext";
import ConnectDapp from "../../common/components/ConnectDapp/ConnectDapp";
import {Checkbox, Flex, HStack} from "@chakra-ui/react";
import {useIncludeTrackers} from "./hooks/useIncludeTrackers";

const Main = () => {
    const { walletAddress } = useWalletAddress()!
    const { includeWallet, setIncludeWallet, includeBeefy, setIncludeBeefy, includeFarms, setIncludeFarms,
            includeBoardroom, setIncludeBoardroom, includeBasic, setIncludeBasic,
            includeExpansionDebt, setIncludeExpansionDebt} = useIncludeTrackers()

    if(!walletAddress){
        return <ConnectDapp/>
    }

    return (
        <>
            <HStack spacing={5} px={5} pt={5}>
                <Checkbox isChecked={includeBasic} onChange={e => setIncludeBasic(e.target.checked)}>Basics</Checkbox>
                <Checkbox isChecked={includeExpansionDebt} onChange={e => setIncludeExpansionDebt(e.target.checked)}>Expansion/Debt</Checkbox>
                <Checkbox isChecked={includeWallet} onChange={e => setIncludeWallet(e.target.checked)}>Wallet</Checkbox>
                <Checkbox isChecked={includeBeefy} onChange={e => setIncludeBeefy(e.target.checked)}>Beefy</Checkbox>
                <Checkbox isChecked={includeFarms} onChange={e => setIncludeFarms(e.target.checked)}>Farms</Checkbox>
                <Checkbox isChecked={includeBoardroom} onChange={e => setIncludeBoardroom(e.target.checked)}>Boardroom</Checkbox>
            </HStack>
            {includeBasic && <ProtocolStats/> }
            {includeExpansionDebt && <ExpansionStats/> }
            {includeWallet && <Wallet/> }
            {includeBeefy && <BeefyVaults/> }
            {includeFarms && <Farms/> }
            {includeBoardroom && <BoardRoomMain/> }
            <UserStats includeBeefy={includeBeefy} includeBoardroom={includeBoardroom} includeFarms={includeFarms} includeWallet={includeWallet}/>
        </>
    );
};

export default Main;
