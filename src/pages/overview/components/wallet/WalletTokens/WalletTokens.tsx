import React from 'react';
import {Flex, Heading, SimpleGrid} from "@chakra-ui/react";
import {useWalletCharge} from "../hooks/useWalletCharge";
import {useWalletStatic} from "../hooks/useWalletStatic";
import { InvestedCard } from '../../boardroom/cards/InvestedCard';

const WalletTokens = () => {
    const { chargeStats } = useWalletCharge()
    const { staticStats } = useWalletStatic()
    return (
        <>
            <Heading>Wallet</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" pt={5}>
                <InvestedCard
                    token="charge"
                    data={{
                        symbol: "Charge",
                        value: chargeStats.value,
                        topValue: chargeStats.tokens,

                    }}
                />
                <InvestedCard
                    token="static"
                    data={{
                        symbol: "Static",
                        value: staticStats.value,
                        topValue: staticStats.tokens,
                    }}
                />
            </SimpleGrid>
        </>
    );
};

export default WalletTokens;
