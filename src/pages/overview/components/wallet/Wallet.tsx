import { Flex, Heading, Stat, Text, Box,  useColorModeValue as mode, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import {InvestedCard} from "../boardroom/cards/InvestedCard";
import {useWalletTokens} from "./hooks/useWalletTokens";


const Wallet = () => {

    const { staticAmount, staticValue, chargeAmount, chargeValue } = useWalletTokens()
    return (
        <Flex px={5} py={5} flexDir="column">
            <Heading>Wallet</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" pt={5}>
                <InvestedCard
                    token="charge"
                    data={{
                        symbol: "Charge",
                        value: chargeValue,
                        topValue: chargeAmount,

                    }}
                />
                <InvestedCard
                    token="static"
                    data={{
                        symbol: "static",
                        value: chargeValue,
                        topValue: chargeAmount,

                    }}
                />
            </SimpleGrid>
        </Flex>
    );
};

export default Wallet;
