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
import InfoTooltip from "../../common/components/InfoTooltip/InfoTooltip";
import Footer from "../../common/components/Footer/Footer";

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
            <HStack spacing={5} px={5} pt={5} flexWrap="wrap" justifyContent="center">
                <Flex>
                    <Checkbox my="auto" isChecked={includeBasic} onChange={e => setIncludeBasic(e.target.checked)}>Basics</Checkbox>
                    <InfoTooltip iconSize={5} label={"Includes basic protocol information"}/>
                </Flex>
                <Flex>
                    <Checkbox my="auto" isChecked={includeExpansionDebt} onChange={e => setIncludeExpansionDebt(e.target.checked)}>Expansion/Debt</Checkbox>
                    <InfoTooltip iconSize={5} label={"Includes information about treasury expansion and debt updated each epoch"}/>
                </Flex>
                <Flex>
                    <Checkbox my="auto" isChecked={includeWallet} onChange={e => setIncludeWallet(e.target.checked)}>Wallet</Checkbox>
                    <InfoTooltip iconSize={5} label={"Includes your current wallet holdings for Static and Charge"}/>
                </Flex>
                <Flex>
                    <Checkbox my="auto" isChecked={includeBeefy} onChange={e => setIncludeBeefy(e.target.checked)}>Beefy</Checkbox>
                    <InfoTooltip iconSize={5} label={"Includes Beefy vaults and their earnings"}/>
                </Flex>
                <Flex>
                    <Checkbox my="auto" isChecked={includeFarms} onChange={e => setIncludeFarms(e.target.checked)}>Farms</Checkbox>
                    <InfoTooltip iconSize={5} label={"Includes ChargeDefi Farms from main website and tracks earnings" }/>
                </Flex>
                <Flex>
                    <Checkbox my="auto" isChecked={includeBoardroom} onChange={e => setIncludeBoardroom(e.target.checked)}>Boardroom</Checkbox>
                    <InfoTooltip iconSize={5} label={"Includes ChargeDefi Boardroom from main website and tracks earnings"}/>
                </Flex>
            </HStack>
            <UserStats includeBeefy={includeBeefy} includeBoardroom={includeBoardroom} includeFarms={includeFarms} includeWallet={includeWallet}/>
            {includeBasic && <ProtocolStats/> }
            {includeExpansionDebt && <ExpansionStats/> }
            {includeWallet && <Wallet/> }
            {includeBeefy && <BeefyVaults/> }
            {includeFarms && <Farms/> }
            {includeBoardroom && <BoardRoomMain/> }
            <Footer/>

        </>
    );
};

export default Main;
